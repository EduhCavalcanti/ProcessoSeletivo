$(document).ready(function () {
    // Definições das Máscaras
    $(".mascara-cpf").mask("999.999.999-99");
    $(".mascara-telefone").mask("(99)9999-9999?9");
    $(".mascara-cep").mask("99.999-999");

    $('.mascara-telefone').focusout(function () {
        var phone, element;
        element = $(this);
        element.unmask();
        phone = element.val().replace(/\D/g, '');
        if (phone.length > 10) {
            element.mask("(99)99999-999?9");
        } else {
            element.mask("(99)9999-9999?9");
        }
    });
})

    //@return true, caso seja um CPF válido; false, caso seja um CPF inválido
function verificarCPF(cpf) {
    // Remove os pontos/traço da expressão regular, caso exista
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf == '') return false;

    // Elimina CPFs invalidos conhecidos    
    if (cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999")
        return false;

    // Valida 1o digito 
    add = 0;

    for (i = 0; i < 9; i++) {
        add += parseInt(cpf.charAt(i)) * (10 - i);
    }
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) {
        rev = 0;
    }

    if (rev != parseInt(cpf.charAt(9))) {
        return false;
    }

    // Valida 2o digito 
    add = 0;
    for (i = 0; i < 10; i++) {
        add += parseInt(cpf.charAt(i)) * (11 - i);
    }
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) {
        rev = 0;
    }
    if (rev != parseInt(cpf.charAt(10))) {
        return false;
    }
    return true;
}

function validaEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 

//@param funcaoValidacao a função de validação a ser usada
// @param mensagemErro a mensagem de erro a ser usada
       
verifica_validacao = function (campo, funcaoValidacao, mensagemErro) {
    if (campo.next().hasClass("label-error")) {
        campo.next().remove();
    }
    // Verifica se é um CPF
    if (campo.val() != '' && funcaoValidacao(campo.val()) == false) {
        // Se for um CPF, incluir a label do erro e marca o item com a classe de erro
        campo.after("<div class='label-error'>" + mensagemErro + "</div>");
        campo.addClass("item-error");
        campo.val("");
    } else {
        // Se não for um CPF, remove a classe item-error
        campo.removeClass("item-error");
    }
}

$(".mascara-cpf:not(.no-validation)").change(function () {
    verifica_validacao($(this), verificarCPF, "CPF inválido");
});

$(".mascara-email").change(function () { verifica_validacao($(this), validaEmail, "E-mail inválido"); });