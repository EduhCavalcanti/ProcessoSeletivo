
$(document).ready(function () {
    
    //Modal
    $('#btn-abri-modal').click(function () {
        $('#moda-beneficiario').modal();
    })

    //Botão excluir Beneficiário
    $('#tableModal').on("click", ".remover", function (e) {
        e.preventDefault();

        var $this = $(this);
        var id = this.id;

        $.ajax({
            url: urlDeleteBeneficiario,
            method: "DELETE",
            data: {
                "Id": id
            },
            error:
                function (r) {
                    if (r.status == 400)
                        ModalDialog("Ocorreu um erro", r.responseJSON);
                    else if (r.status == 500)
                        ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                },
            success:
                function (r) {
                    ModalDialog("Sucesso!", r)
                    $("#formBeneficiario")[0].reset();
                    $this.closest("tr").remove();
                }
        })
    })

    //Botão alterar Beneficiário
    $('#tableModal').on('click', '.alterar', function (e) {
        e.preventDefault();

        var $this = $(this);
        var id = this.id;

        $.ajax({
            url: urlAlterarBeneficiario,
            method: "DELETE",
            data: {
                "Id": id
            },
            error:
                function (r) {
                    if (r.status == 400)
                        ModalDialog("Ocorreu um erro", r.responseJSON);
                    else if (r.status == 500)
                        ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                },
            success:
                function (r) {
                    ModalDialog("Sucesso!", r)
                    $("#formBeneficiario")[0].reset();
                    $this.closest("tr").remove();
                }
        })
    })
});

$('#formBeneficiario').submit(function (e) {
    e.preventDefault();

    $.ajax({
        url: urlPostBeneficiario,
        method: "POST",
        data: {
            "NOME": $(this).find("#NomeModal").val(),
            "CPF": $(this).find("#CPFModal").val(),
            "IDCLIENTE": obj.Id
        },
        error:
            function (r) {
                if (r.state == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
        success:
            function (r) {
                ModalDialog("Sucesso!", r)
                var nome = $("#NomeModal").val();
                var cpf = $("#CPFModal").val();

                $("#formBeneficiario")[0].reset();

                if (r !== "Usuário já Cadastrado com esse CPF!") {
                    $("#tableModal>tbody").prepend("<tr><td>" + nome + "</td >" + "<td>" + cpf + "</td >" + "<td>" + '<button class="btn btn-primary btn-sm" style="margin-right:10px;">Alterar</button>' + '<button type="button" id=""  onclick="(this)"  class="btn btn-primary btn-sm remover">Excluir</button>' + "</td>" + "</tr >");
                }
            }
    })
})


function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}
