import 'package:flutter/material.dart';

class CommonServices {
  ///Form Validator
  bool validateAndSave(GlobalKey<FormState> formKey) {
    final FormState? form = formKey.currentState;
    if (form != null) {
      if (form.validate()) {
        return true;
      }
    }
    return false;
  }
}
