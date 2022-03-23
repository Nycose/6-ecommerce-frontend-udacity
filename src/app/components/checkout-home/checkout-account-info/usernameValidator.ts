import { AbstractControl, AsyncValidator, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { map } from "rxjs";
import { AuthService } from "src/app/services/auth.service";


export function usernameValidator(auth: AuthService): AsyncValidatorFn {

    return (control: AbstractControl) => {
        return auth.fetchAllUsers().pipe(
            map((users) => {
                const controlValue = control.value;
                if (controlValue) {
                    const user = users.find(u => u.username.toLowerCase() === controlValue.toLowerCase());
                    return user ? {usernameExists: true} : null;
                } else {
                    return null;
                }
            })
        )
    }

}