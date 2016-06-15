/**
 * Created by jermo on 24.05.2016.
 */
$(document).ready(function () {

    function firstToUpperCase(str) {
        return str.substr(0, 1).toUpperCase() + str.substr(1);
    }

    function nextTab(elem) {
        $(elem).next().find('a[data-toggle="tab"]').click();
        $('tr.clickable-row').click(function () {
            $(this).addClass('active').siblings().removeClass('active');
        });
    }

    function prevTab(elem) {
        $(elem).prev().find('a[data-toggle="tab"]').click();
    }

    function createDataTable(id, url, callback) {
        var content = '<h1>' + firstToUpperCase(id) +  '</h1>';
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
                    content += '<th>' + firstToUpperCase(Object.keys(data[0])[i]) + '</th>'
                }

                content +=
                    '</tr>' +
                    '</thead>' +
                    '<tbody>';

                for(var i = 0; i < data.length; ++i) {

                    content += '<tr class="clickable-row" data-id=' + data[i].id + '>';

                    for(var j = 1; j < Object.keys(data[0]).length; ++j) {
                        if(Object.keys(data[0])[j].toUpperCase() === 'IMAGEURL') {
                            content += '<td data-field = "' + Object.keys(data[0])[j] + '"><img src="'+ data[i][Object.keys(data[0])[j]] +'" alt="' + id + '_img" height="60"></td>';
                        } else {
                            content += '<td data-field = "' + Object.keys(data[0])[j] + '">' + data[i][Object.keys(data[0])[j]] + '</td>';
                        }
                    }
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

            callback();
        });
    }

    function resetDataTable($table) {
        $table.dataTable().fnDestroy();
    }

    function loadDataTable($table) {
        $table.DataTable({
            'columnDefs': [
                {
                    'targets': 0,
                    'searchable': false,
                    'orderable': false
                },
            ],
            'order': [$table.find('th').length - 1, 'asc']
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
                if(checkIfUserHasMadeChoice($form) === undefined) {
                    callback(false);
                }

                memoryId = $active_row.data('id');
                createDataTable("storage", '/storages', function () {
                    callback(true);
                });

                break;

            case 'storage':
                if(checkIfUserHasMadeChoice($form) === undefined) {
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