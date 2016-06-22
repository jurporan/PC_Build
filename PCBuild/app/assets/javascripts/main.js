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
        //refreshRemainingBudget($('div' + $(elem).next().find('a[data-toggle="tab"]').attr('href')));
        $('tr.clickable-row').click(function () {
            $(this).addClass('active').siblings().removeClass('active');
            $('.nav-tabs li.active').nextAll().addClass('disabled');
            refreshRemainingBudget($(this).closest('div.tab-pane'));
        });
    }

    function prevTab(elem) {
        $(elem).prev().find('a[data-toggle="tab"]').click();
    }

    function isFloat(n){
        return Number(n) === n && n % 1 !== 0;
    }

    function refreshRemainingBudget($tabPane) {
        var $lis = $('.nav-tabs li').not('.disabled').slice(1);
        var totalPrice = 0;
        $lis.each(function () {
            var tabConcerned = $(this).find('a').attr('href');
            var $ActiveTr = $('div' + tabConcerned).find('tr.active');
            if($ActiveTr.length != 0) {
                totalPrice += parseFloat($('div' + tabConcerned).find('tr.active').find('td[data-field="price"]').text());
            }
        });
        remainingBudget = customerBudget - totalPrice;
        if($tabPane != null)
            $tabPane.find('.remaining-budget').text(remainingBudget.toFixed(2))
    }

    function formatValue(header, value) {
        var td = '<td data-field = "' + header + '">';

        if(isFloat(value)) {
            value = parseFloat(value).toFixed(2);
        }

        var numeric = false;

        switch(header.toUpperCase()) {
            case "IMAGEURL":
                td += '<img src="'+ value +'" alt="image" height="60">';
                break;

            case "PRICE":
                if(remainingBudget - parseFloat(value) < 0) {
                    td = '<td class="out-of-budget" data-field = "' + header + '">';
                }
                td += value + '.-';
                numeric = true;
                break;

            case "FREQUENCY":
                td += value + ' GHz';
                numeric = true;
                break;

            case "CONSUMPTION":
            case "POWER":
                td += value + ' W';
                numeric = true;
                break;

            case "MEMORYSIZE":
            case "GIGABYTES":
                td += value + ' GB';
                numeric = true;
                break;

            case "ROTATIONSPEED":
                td += value + ' RPM';
                numeric = true;
                break;

            case "WIDTH":
            case "HEIGHT":
            case "LENGTH":
            case "GC_MAX_LENGTH":
                td += value + ' cm';
                numeric = true;
                break;

            default:
                td += value;

        }

        td += '</td>';
        return {td: td, numeric: numeric}
    };

    function createDataTable(id, url, callback) {
        refreshRemainingBudget(null);
        var numericTargets = new Set();
        var content = '<div class="alert alert-info" role="alert">You still have <span class="remaining-budget">' + remainingBudget.toFixed(2) + '</span> CHF.</div>' +
            //'<h4 class="title-left">Remaining budget: </h4><span class="remaining-budget">' + remainingBudget.toFixed(2) + '</span>.-' +
            '<h1>' + firstToUpperCase(id) +  '</h1>';
        $.get(url, function(data) {
            if(data.length === 0) {
                content += '<p>No compatible component.</p>';
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
                        var format = formatValue(Object.keys(data[0])[j], data[i][Object.keys(data[0])[j]]);
                        var td = format.td;
                        if(format.numeric) numericTargets.add(j - 1);
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
            loadDataTable($('div#' + id).find('table'), numericTargets);


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

            $("button#finish_button").click(function () {
                $.get("update_processor_popularity?popularity=" +  parseInt($processor.find("td[data-field='popularity']").text()) + "&manufacturer=" + $processor.find("td[data-field='manufacturer']").text() + "&model=" + $processor.find("td[data-field='model']").text(), function(data){});

                $.get("update_motherboard_popularity?popularity=" +  parseInt($motherboard.find("td[data-field='popularity']").text()) + "&manufacturer=" + $motherboard.find("td[data-field='manufacturer']").text() + "&model=" + $motherboard.find("td[data-field='model']").text(), function(data){});

                $.get("update_memory_popularity?popularity=" +  parseInt($memory.find("td[data-field='popularity']").text()) + "&manufacturer=" + $memory.find("td[data-field='manufacturer']").text() + "&model=" + $memory.find("td[data-field='model']").text(), function(data){});

                $.get("update_storage_popularity?popularity=" +  parseInt($storage.find("td[data-field='popularity']").text()) + "&manufacturer=" + $storage.find("td[data-field='manufacturer']").text() + "&model=" + $storage.find("td[data-field='model']").text(), function(data){});

                $.get("update_graphic_card_popularity?popularity=" +  parseInt($graphicCard.find("td[data-field='popularity']").text()) + "&manufacturer=" + $graphicCard.find("td[data-field='manufacturer']").text() + "&model=" + $graphicCard.find("td[data-field='model']").text(), function(data){});

                $.get("update_alimentation_popularity?popularity=" +  parseInt($alimentation.find("td[data-field='popularity']").text()) + "&manufacturer=" + $alimentation.find("td[data-field='manufacturer']").text() + "&model=" + $alimentation.find("td[data-field='model']").text(), function(data){});

                $.get("update_computer_case_popularity?popularity=" +  parseInt($computerCase.find("td[data-field='popularity']").text()) + "&manufacturer=" + $computerCase.find("td[data-field='manufacturer']").text() + "&model=" + $computerCase.find("td[data-field='model']").text(), function(data){});

                $("span#first_tab").click();
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

    function loadDataTable($table, numericTargets) {
        var headerLength = $table.find('th').length;
        $table.DataTable({
            "paging":   false,
            'columnDefs': [
                {
                    'targets': 0,
                    'searchable': false,
                    'orderable': false
                },
                {
                    'targets': Array.from(numericTargets),
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
    var $processor;
    var $motherboard;
    var $memory;
    var $storage;
    var $graphicCard;
    var $alimentation;
    var $computerCase;

    //Initialize tooltips
    $('.nav-tabs > li a[title]').tooltip();


    //Wizard
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

        var $target = $(e.target);

        if ($target.parent().hasClass('disabled')) {
            return false;
        }
    });

    $('li[role="presentation"]').click(function () {
       if(!$(this).hasClass('disabled')) {
           var idTab = $(this).find('a[data-toggle="tab"]').attr('href');
           refreshRemainingBudget($('div' + idTab));
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

    $('input#budget').on('input', function () {
        var $lis = $('.nav-tabs li').not('.disabled').slice(1);
        $lis.addClass('disabled');
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

                $processor = $active_row;
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

                $motherboard = $active_row;
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

                $memory = $active_row;
                createDataTable("storage", '/storages', function () {
                    callback(true);
                });

                break;

            case 'storage':
                var $active_row = checkIfUserHasMadeChoice($form);
                if($active_row === undefined) {
                    callback(false);
                }

                $storage = $active_row;
                createDataTable("graphic-card", '/graphic_cards', function () {
                    callback(true);
                });

                break;

            case 'graphic-card':
                var $active_row = checkIfUserHasMadeChoice($form);
                if($active_row === undefined) {
                    callback(false);
                }

                $graphicCard = $active_row;
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

                $alimentation = $active_row;
                var gcLength = parseFloat($('div#graphic-card').find('tr.active td[data-field="length"]').text());

                createDataTable("computer-case", '/computer_cases?gcLength=' + gcLength, function () {
                    callback(true);
                });

                break;

            case 'computer-case':
                var $active_row = checkIfUserHasMadeChoice($form);
                callback(true);
                $computerCase = $active_row;

                var totalPrice = 0;
                $("td#processor_name").html( "<b>" + $processor.find("td[data-field='manufacturer']").text() + "</b> " + $processor.find("td[data-field='model']").text())

                $("td#processor_price").html($processor.find("td[data-field='price']").text() + " CHF")

                $("td#processor_freq").html("Frequency : " + $processor.find("td[data-field='frequency']").text())

                $("td#processor_cores").html("Number of cores : " + $processor.find("td[data-field='nbCores']").text())

                $.get("/processors_frequency_range", function(data){
                    freq_range =  data[1] - data[0]
                    freq_step = freq_range / 10
                    freq = parseFloat($processor.find("td[data-field='frequency']").text())
                    nbCores = parseInt($processor.find("td[data-field='nbCores']").text())
                    $("td#processor_quality").html(Math.round((freq - data[0])/freq_step) + "/10")
                });

                $("td#processor_popularity").html($processor.find("td[data-field='popularity']").text())

                totalPrice += parseFloat($processor.find("td[data-field='price']").text())

                $("td#motherboard_name").html("<b>" + $motherboard.find("td[data-field='manufacturer']").text() + "</b>"  + $motherboard.find("td[data-field='model']").text())

                $("td#motherboard_price").html($motherboard.find("td[data-field='price']").text() + " CHF")

                totalPrice += parseFloat($motherboard.find("td[data-field='price']").text())

                $("td#memory_name").html("<b>" + $memory.find("td[data-field='manufacturer']").text() + "</b> " + $memory.find("td[data-field='model']").text())

                $("td#memory_price").html($memory.find("td[data-field='price']").text() + " CHF")

                $("td#memory_size").html("Memory size : " + $memory.find("td[data-field='memorySize']").text())

                $.get("/memories_size_range", function(data){
                    diff = 0
                    if(data[1] < 10) {
                        diff = 10 - data[1]
                    }
                    size = parseFloat($memory.find("td[data-field='memorySize']").text())
                    if (size > 10) {
                        size = 10
                    }
                    $("td#memory_quality").html(Math.round(size + diff) + "/10")
                });

                totalPrice += parseFloat($memory.find("td[data-field='price']").text())

                $("td#memory_popularity").html($memory.find("td[data-field='popularity']").text())


                $("td#storage_name").html("<b>" + $storage.find("td[data-field='manufacturer']").text() + "</b> " + $storage.find("td[data-field='model']").text())

                $("td#storage_price").html($storage.find("td[data-field='price']").text() + " CHF")

                $("td#storage_size").html("Size : " + $storage.find("td[data-field='gigabytes']").text())

                $("td#storage_rpm").html("RPM : " + $storage.find("td[data-field='rotationSpeed']").text())

                $.get("/storages_size_range", function(data){
                    $.get("/storages_rpm_range", function(data2){
                        size_range =  data[1] - data[0]
                        size_step = size_range / 5
                        size = parseFloat($storage.find("td[data-field='gigabytes']").text())
                        rpm_range =  data2[1] - data2[0]
                        rpm_step = rpm_range / 5
                        rpm = parseFloat($storage.find("td[data-field='rotationSpeed']").text())
                        $("td#storage_quality").html(Math.round((size - data[0])/size_step + ((rpm - data2[0])/rpm_step)) + "/10")
                    });
                });

                totalPrice += parseFloat($storage.find("td[data-field='price']").text())

                $("td#storage_popularity").html($storage.find("td[data-field='popularity']").text())


                $("td#graphic_card_name").html("<b>" + $graphicCard.find("td[data-field='manufacturer']").text() + "</b> " + $graphicCard.find("td[data-field='model']").text())

                $("td#graphic_card_price").html($graphicCard.find("td[data-field='price']").text() + " CHF")

                $("td#graphic_card_freq").html("Frequency : " + $graphicCard.find("td[data-field='frequency']").text())

                $("td#graphic_card_size").html("Memory size : " + $graphicCard.find("td[data-field='memory']").text()+ " GB")

                $.get("/graphic_cards_memory_range", function(data){
                    $.get("/graphic_cards_frequency_range", function(data2){
                        size_range =  data[1] - data[0]
                        size_step = size_range / 5
                        size = parseFloat($graphicCard.find("td[data-field='memory']").text())
                        freq_range =  data2[1] - data2[0]
                        freq_step = freq_range / 5
                        freq = parseFloat($graphicCard.find("td[data-field='frequency']").text())
                        $("td#graphic_card_quality").html(Math.round((size - data[0])/size_step + ((freq - data2[0])/freq_step)) + "/10")
                    });
                });

                totalPrice += parseFloat($graphicCard.find("td[data-field='price']").text())
                $("td#graphic_card_popularity").html($graphicCard.find("td[data-field='popularity']").text())


                $("td#alimentation_name").html("<b>" + $alimentation.find("td[data-field='manufacturer']").text() + "</b> " + $alimentation.find("td[data-field='model']").text())

                $("td#alimentation_price").html($alimentation.find("td[data-field='price']").text() + " CHF")

                totalPrice += parseFloat($alimentation.find("td[data-field='price']").text())

                $("td#case_name").html("<b>" + $computerCase.find("td[data-field='manufacturer']").text() + "</b> " + $computerCase.find("td[data-field='model']").text())

                $("td#case_price").html($computerCase.find("td[data-field='price']").text() + " CHF")

                totalPrice += parseFloat($computerCase.find("td[data-field='price']").text())

                $("td#total_price").html("<b>" + totalPrice + " CHF" + "</b>")

                $('img#case-img').attr('src', $computerCase.find("td[data-field='imageURL']").find('img').attr('src'));


                break;
        }
    }

});
