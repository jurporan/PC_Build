/**
 * Created by jermo on 24.05.2016.
 */
$(document).ready(function () {
    var customerName;
    var customerBudget;
    //Initialize tooltips
    $('.nav-tabs > li a[title]').tooltip();
    var $tables = $('table');
    $tables.each(function () {
        $(this).DataTable({
            'columnDefs': [
                {
                    'targets': 0,
                    'searchable': false,
                    'orderable': false
                },
            ],
            'order': [$(this).find('th').length - 1, 'asc']
        });
    });

    //Wizard
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

        var $target = $(e.target);

        if ($target.parent().hasClass('disabled')) {
            return false;
        }
    });

    $("form").submit(function (e) {
        e.preventDefault();
        if(checkConditions($(this).attr('id'))) {
            var $active = $('.wizard .nav-tabs li.active');
            $active.next().removeClass('disabled');
            nextTab($active);
        }
    });

    $(".prev-step").click(function (e) {

        var $active = $('.wizard .nav-tabs li.active');
        prevTab($active);

    });

    $('tr.clickable-row').click(function(event) {
        $(this).addClass('active').siblings().removeClass('active');
    });


    function checkConditions(id) {
        var $form = $('form#' + id);
        switch (id) {
            case "personal-inf-save":
                var form = $form.serializeArray();
                customerName = form[0].value;
                customerBudget = form[1].value;
                /*var $processor_trs = $('form#processor-save tbody tr');
                $processor_trs.each(function () {
                    if(!$(this).hasClass("clickable-row")) $(this).addClass("clickable-row");
                    if($(this).hasClass("disabled")) $(this).removeClass("disabled");
                    if(parseFloat($(this).find('td:last').text()) > customerBudget) {
                        $(this).removeClass("clickable-row");
                        $(this).addClass("disabled");
                    }
                });*/
                return true;
                break;

            case "processor-save":
                var $active_row = $form.find('tbody tr.active');
                var $motherboard_tbody = $('form#motherboard-save tbody');
                if($active_row.length === 0) {
                    var alert = '<div class="alert alert-danger">'+
                        '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+
                        '<strong>Danger!</strong> You must select a processor to continue.'+
                        '</div>';
                    $form.closest('div').prepend(alert);
                    return false;
                }

                var socket = $($active_row.find('td')[3]).text();
                socket = socket.replace('+', '%2B');

                $.get('/motherboards?socket=' + socket, function (data) {
                    var trs;
                    for(var i = 0; i < data.length; ++i) {
                        trs += '<tr class="clickable-row">'+
                                '<td><img src="'+ data[i].imgUrl +'" alt="motherboard_img" height="60"></td>'+
                                '<td>'+data[i].manufacturer+'</td>'+
                                '<td>'+data[i].model+'</td>'+
                                '<td>'+data[i].socket+'</td>'+
                                '<td>'+data[i].popularity+'</td>'+
                                '<td>'+data[i].price+'</td></tr>';
                    }
                    $motherboard_tbody.html(trs);
                    // TODO Continuer à donner les infos selon le choix actuel, attention au retour en arrière qui fonctionne pas tjrs
                })

                return true;
                break;

            /*<tr class="clickable-row">
             <td><img src="@processor.imageURL" alt="processor_img" height="60"></td>
             <td>@processor.manufacturer</td>
             <td>@processor.model</td>
             <td>@processor.socket</td>
             <td>@processor.nbCores</td>
             <td>@processor.nbThreads</td>
             <td>@processor.frequency</td>
             <td>@processor.consumption</td>
             <td>@processor.popularity</td>
             <td>@processor.price</td>
             </tr>*/
        }
    }

});

function nextTab(elem) {
    $(elem).next().find('a[data-toggle="tab"]').click();
}

function prevTab(elem) {
    $(elem).prev().find('a[data-toggle="tab"]').click();
}