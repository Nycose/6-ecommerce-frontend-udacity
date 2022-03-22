import { AbstractControl, AsyncValidator, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { map } from "rxjs";
import { AuthService } from "src/app/services/auth.service";


export function usernameValidator(auth: AuthService): AsyncValidatorFn {

    return (control: AbstractControl) => {
        return auth.fetchAllUsers().pipe(
            map((users) => {
                const user = users.find(u => u.username.toLowerCase() === control.value.toLowerCase());
                return user ? {usernameExists: true} : null;
            })
        )
    }
    
}