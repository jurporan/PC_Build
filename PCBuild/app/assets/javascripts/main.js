/**
 * Created by jermo on 24.05.2016.
 */
jQuery.fn.dataTableExt.oSort['numeric-unit-asc']  = function(a,b) {
    x = parseFloat( a );
    y = parseFloat( b );
    return ((x < y) ? -1 : ((x > y) ?  1 : 0));
};

jQuery.fn.dataTableExt.oSort['numeric-unit-desc'] = function(a,b) {
    x = parseFloat( a );
    y = parseFloat( b );
    return ((x < y) ?  1 : ((x > y) ? -1 : 0));
};

$(document).ready(function () {

    function firstToUpperCase(str) {
        return str.substr(0, 1).toUpperCase() + str.substr(1);
    }

    function nextTab(elem) {
        $(elem).next().find('a[data-toggle="tab"]').click();
        $('tr.clickable-row').click(function () {
            $(this).addClass('active').siblings().removeClass('active');
            $('.nav-tabs li.active').nextAll().addClass('disabled');
            refreshRemainingBudget();
            $(this).closest('div.tab-pane').find('.remaining-budget').text(remainingBudget.toFixed(2));
        });
    }

    function prevTab(elem) {
        $(elem).prev().find('a[data-toggle="tab"]').click();
    }

    function isFloat(n){
        return Number(n) === n && n % 1 !== 0;
    }

    function refreshRemainingBudget() {
        var $lis = $('.nav-tabs li').not('.disabled').slice(1);
        var totalPrice = 0;
        $lis.each(function () {
            var tabConcerned = $(this).find('a').attr('href');
            totalPrice += parseFloat($('div' + tabConcerned).find('tr.active').find('td[data-field="price"]').text());
        });
        remainingBudget = customerBudget - totalPrice;
    }

    function formatValue(header, value) {
        var td = '<td data-field = "' + header + '">';

        if(isFloat(value)) {
            value = parseFloat(value).toFixed(2);
        }

        switch(header.toUpperCase()) {
            case "IMAGEURL":
                td += '<img src="'+ value +'" alt="image" height="60">';
                break;

            case "PRICE":
                if(remainingBudget - parseFloat(value) < 0) {
                    td = '<td class="out-of-budget" data-field = "' + header + '">';
                }
                td += value + '.-';
                break;

            case "FREQUENCY":
                td += value + ' GHz';
                break;

            case "CONSUMPTION":
                td += value + ' W';
                break;


            default:
                td += value;

        }

        td += '</td>';
        return td;
    }

    function createDataTable(id, url, callback) {
        refreshRemainingBudget();
        var content = '<h4 class="title-left">Remaining budget: </h4><span class="remaining-budget">' + remainingBudget.toFixed(2) + '</span>.-' +
            '<h1>' + firstToUpperCase(id) +  '</h1>';
        $.get(url, function(data) {
            if(data.length === 0) {
                content += '<p>No one would shit</p>';

            } else {

                content +=
                    '<form role="form">' +
                    '<table class="table components-table">' +
                    '<thead>' +
                    '<tr>';

                for (var i = 1; i < Object.keys(data[0]).length; ++i) {
                    if(Object.keys(data[0])[i].toUpperCase() === 'IMAGEURL') {
                        content += '<th>Image</th>'
                    } else {
                        content += '<th>' + firstToUpperCase(Object.keys(data[0])[i]) + '</th>'
                    }
                }

                content +=
                    '</tr>' +
                    '</thead>' +
                    '<tbody>';

                for(var i = 0; i < data.length; ++i) {
                    var tr = '<tr class="clickable-row" data-id=' + data[i].id + '>';
                    for(var j = 1; j < Object.keys(data[0]).length; ++j) {
                        var td = formatValue(Object.keys(data[0])[j], data[i][Object.keys(data[0])[j]]);
                        if($(td).hasClass('out-of-budget')) {
                            var $modifiedTr = $(tr);
                            $modifiedTr.removeClass('clickable-row');
                            $modifiedTr.addClass('out-of-budget');
                            var html = $modifiedTr.wrap('<div>').parent().html();
                            tr = html.substr(0, html.length - 5);
                        }
                        tr += td;
                    }
                    content += tr;
                }


                content +=
                    '</tbody>' +
                    '</table>' +
                    '<br>';
            }

            content +=
                '<ul class="list-inline pull-right">' +
                '<li><button type="button" class="btn btn-primary prev-step">Previous</button></li>' +
                '<li><button type="submit" class="btn btn-primary next-step">Save and continue</button></li>' +
                '</ul>' +
                '</form>';

            $('div#' + id).html(content);
            loadDataTable($('div#' + id).find('table'));


            $('div#' + id).find('form').submit(function (e) {
                e.preventDefault();
                checkConditions($(this).closest('div').attr('id'), function (Continue) {
                    if(Continue) {
                        var $active = $('.wizard .nav-tabs li.active');
                        $active.next().removeClass('disabled');
                        nextTab($active);
                    }
                })
            });

            $(".prev-step").click(function (e) {
                var $active = $('.wizard .nav-tabs li.active');
                prevTab($active);

            });

            $('tr.out-of-budget').hover(function () {
                $(this).popover({ content: "This component is not in your budget", placement: "bottom"}).popover('show');
            }, function () {
                $(this).popover('hide');
            });

            callback();
        });
    }

    function resetDataTable($table) {
        $table.dataTable().fnDestroy();
    }

    function loadDataTable($table) {
        var headerLength = $table.find('th').length;
        $table.DataTable({
            'columnDefs': [
                {
                    'targets': 0,
                    'searchable': false,
                    'orderable': false
                },
                {
                    'targets': headerLength - 1,
                    "type": "numeric-unit"
                }
            ],
            'order': [headerLength - 1, 'asc']
        });
    }

    function checkIfUserHasMadeChoice($form) {
        var $active_row = $form.find('tbody tr.active');
        if($active_row.length === 0) {
            var alert = '<div class="alert alert-danger">'+
                '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+
                '<strong>Danger!</strong> You must select a choice to continue.'+
                '</div>';
            $form.closest('div').prepend(alert);
            return undefined;
        }
        return $active_row;
    }

    var customerName;
    var customerBudget;
    var remainingBudget;
    var processorId;
    var motherBoardId;
    var memoryId;
    var storageId;
    var graphicCardId;
    var alimentationId;
    var caseId;

    //Initialize tooltips
    $('.nav-tabs > li a[title]').tooltip();


    //Wizard
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

        var $target = $(e.target);

        if ($target.parent().hasClass('disabled')) {
            return false;
        }
    });

    $("form").submit(function (e) {
        e.preventDefault();
        checkConditions($(this).closest('div').attr('id'), function (Continue) {
            if(Continue) {
                var $active = $('.wizard .nav-tabs li.active');
                $active.next().removeClass('disabled');
                nextTab($active);
            }
        })
    });

    $(".prev-step").click(function (e) {
        var $active = $('.wizard .nav-tabs li.active');
        prevTab($active);

    });

    function checkConditions(id, callback) {
        var $form = $('div#' + id + ' form');
        switch (id) {
            case "personal-informations":
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
                createDataTable("processor", "/processors", function () {
                    callback(true);
                });
                break;

            case "processor":
                var $active_row = checkIfUserHasMadeChoice($form);
                if($active_row === undefined) {
                    callback(false);
                }

                processorId = $active_row.data('id');
                var socket = $active_row.find('td[data-field="socket"]').text();
                socket = socket.replace('+', '%2B');

                createDataTable("motherboard", '/motherboards?socket=' + socket, function () {
                    callback(true);
                });

                break;

            case 'motherboard':
                var $active_row = checkIfUserHasMadeChoice($form);
                if($active_row === undefined) {
                    callback(false);
                }

                motherBoardId = $active_row.data('id');
                var memoryType = $active_row.find('td[data-field="memoryType"]').text();

                createDataTable("memory", '/memories?memoryType=' + memoryType, function () {
                    callback(true);
                });

                break;

            case 'memory':
                var $active_row = checkIfUserHasMadeChoice($form);
                if($active_row === undefined) {
                    callback(false);
                }

                memoryId = $active_row.data('id');
                createDataTable("storage", '/storages', function () {
                    callback(true);
                });

                break;

            case 'storage':
                var $active_row = checkIfUserHasMadeChoice($form);
                if($active_row === undefined) {
                    callback(false);
                }

                storageId = $active_row.data('id');
                createDataTable("graphic-card", '/graphic_cards', function () {
                    callback(true);
                });

                break;

            case 'graphic-card':
                var $active_row = checkIfUserHasMadeChoice($form);
                if($active_row === undefined) {
                    callback(false);
                }

                graphicCardId = $active_row.data('id');
                var consumptionGC = parseFloat($active_row.find('td[data-field="consumption"]').text());
                var consumptionCPU = parseFloat($('div#processor').find('tr.active td[data-field="consumption"]').text())

                createDataTable("alimentation", '/alimentations?power=' + (consumptionGC + consumptionCPU) * 1.8, function () {
                    callback(true);
                });

                break;

            case 'alimentation':
                var $active_row = checkIfUserHasMadeChoice($form);
                if($active_row === undefined) {
                    callback(false);
                }

                alimentationId = $active_row.data('id');
                var gcLength = parseFloat($('div#graphic-card').find('tr.active td[data-field="length"]').text());

                createDataTable("computer-case", '/computer_cases?gcLength=' + gcLength, function () {
                    callback(true);
                });

                break;

            case 'computer-case':
                callback(true);

                caseId = $active_row.data('id');
                // TODO Gérer les problèmes de budget et attention au retour en arrière, regarder une solution pour soit bloquer le passage en avant
                // TODO Passer tous les composants à la vue finale pour l'affichage
                break;
        }
    }

});