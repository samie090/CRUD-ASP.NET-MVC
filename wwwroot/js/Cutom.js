
$(function () {
    //getdata();
    loadData();
});

function loadData() {
    $.ajax({
        url: '/Ajax/ClientsList/',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            $('#customers').DataTable({
                bProcessing: true,
                blengthChange: true,
                lengthMenu: [[5, 10, 25, -1], [5, 10, 25, "All"]],
                data: data,
                columns: [
                    { "sTitle": "ID", "data": "id" },
                    { "sTitle": "Name", "data": "name" },
                    { "sTitle": "City", "data": "city" },
                    { "sTitle": "Salary", "data": "salary" },
                    {
                        data: "id", render: function (data, type, row, meta) {
                            return type === 'display' ?
                                '<a class="btn btn-sm btn-danger" onclick="Delete(' + data + ');">Delete</a> <a class="btn btn-sm btn-warning" onclick="Edit(' + data + ');">Edit</a>' :
                                data;
                        }
                    },
                ],


            });
        }
    });

}
function getdata() {
    /*debugger*/
    $.ajax({
        url: '/Ajax/ClientsList/',
        type: 'get',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8;',
        success: function (result, status, xhr) {
            var obj = '';
            $.each(result, function (index, item) {
                obj += '<tr class="text-center">';
                obj += '<td>' + item.id + '</td>';
                obj += '<td>' + item.name + '</td>';
                obj += '<td>' + item.city + '</td>';
                obj += '<td>' + item.salary + '</td>';
                obj += '<td><a class="btn btn-sm btn-danger" onclick="Delete(' + item.id + ');" >Delete</a>   <a class="btn btn-sm btn-warning" onclick="Edit(' + item.id + ')";> Edit</a></td> ';
                obj += '</tr>';
            });
            $('#fillit').html(obj);
            console.log("Success");
            //button.parents("tr").remove();
        },
        error: function () {
            alert("Can't Get Data");
        }
    });
}
function AddClientThroughAjax() {
    var obj1 = {
        Name: $('#Name').val(),
        City: $('#City').val(),
        Salary: $('#Salary').val()
    }
    $.ajax({
        url: '/Ajax/AddClient/',
        type: 'Post',
        data: obj1,
        dataType: 'json',
        success: function (response) {
            $('#exampleModal').modal('hide');
            clearValues();
            getdata();
            alert('Data Saved through Json');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
}
function clearValues() {
    $('#Name').val('');
    $('#City').val('');
    $('#Salary').val('');
}
/* contentType: 'application/xxx-www-form-urlencoded;charset=utf-8;',*/
function Delete(id) {
    if (confirm("Are you sure To Delete it?")) {
        $.ajax({
            url: '/Ajax/DeleteRecord?id=' + id,
            success: function (response) {
                alert("Deleted");
                getdata();
                clearValues();
            },
            error: function () {
                alert("Could not be deleted");
            }
        });
    }
}
function Edit(id) {
    $.ajax({
        url: '/Ajax/EditRecord?id=' + id,
        type: 'get',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8;',
        success: function (response) {
            $('#exampleModal').modal('show');
            $('#Id').val(response.id);
            $('#Name').val(response.name);
            $('#City').val(response.city);
            $('#Salary').val(response.salary);
            $('#saveBtn').css('display', 'none'); /*or $('#saveBtn').hide();*/
            $('#updateBtn').css('display', 'block');
        },
        error: function () {
            alert("Sorry! An Error Occured");
        }
        //clearValues();
    });
}

function UpdateClientThroughAjax() {
    debugger
    var obj1 = {
        Id: $('#Id').val(),
        Name: $('#Name').val(),
        City: $('#City').val(),
        Salary: $('#Salary').val()
    }
    $.ajax({
        url: '/Ajax/UpdateRecord/',
        type: 'Post',
        data: obj1,
        dataType: 'json',
        success: function (response) {
            $('#exampleModal').modal('hide');
            clearValues();
            getdata();
            alert('Data Saved through Json');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
}