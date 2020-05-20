import { FormControl } from '@angular/forms';

export class UsernameValidator {

  static validUsername(fc: FormControl) {
    //fc.value.toLowerCase()

    return {
      validUsername: true
    }
  }
}
