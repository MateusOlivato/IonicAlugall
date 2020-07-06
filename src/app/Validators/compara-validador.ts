import { FormGroup } from '@angular/forms';

// Validador para comparar dois campos
export function ComparaValidator(controleNome: string, comparacaoNome: string) {
    return (formGroup: FormGroup) => {
        // Pega os campos conforme os nomes que foram passados
        const controle = formGroup.controls[controleNome];
        const comparacao = formGroup.controls[comparacaoNome];

        // verifica o 1º campo
        if (controle.errors) {
            return;
        }

        // Verifica a igualdade dos campos
        if (controle.value !== comparacao.value) {
            // Caso não, cria o erro "comparacao"
            comparacao.setErrors({ comparacao: true });
        } else {
            //Zera os erros caso não.
            comparacao.setErrors(null);
        }
    }
}