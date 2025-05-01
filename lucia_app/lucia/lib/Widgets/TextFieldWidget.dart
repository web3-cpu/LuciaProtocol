import 'package:flutter/material.dart';

import '../Constants/colors.dart';
import '../Constants/styles.dart';

class TextFieldWidget extends StatelessWidget {
  const TextFieldWidget({
    Key? key,
    this.controller,
    required this.hintText,
    this.isPassword = false,
    this.keyboardType = TextInputType.text,
    this.isDisabled = false,
    this.showErrorMessage = true,
    this.onSubmit,
  }) : super(key: key);

  final TextEditingController? controller;
  final String hintText;
  final bool isPassword;
  final TextInputType keyboardType;
  final bool isDisabled;
  final bool showErrorMessage;
  final Function(String val)? onSubmit;

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      enabled: !isDisabled,
      //focusNode: focusNode,
      keyboardType: keyboardType,
      obscureText: isPassword,
      decoration: InputDecoration(
        focusColor: kWhite,

        ///Borders
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide: const BorderSide(color: kLightOrange, width: 0),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide: const BorderSide(color: kBlack, width: 0),
        ),
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(18)),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide: const BorderSide(color: kRed, width: 1.0),
        ),

        disabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide: const BorderSide(color: kLightGrey),
        ),
        focusedErrorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide: const BorderSide(color: kLightOrange),
        ),

        ///Styles
        hintText: hintText,
        hintStyle: k13Medium.copyWith(color: kGrey),
        //errorStyle: k0,
        errorStyle: showErrorMessage ? k13Medium.copyWith(color: kRed) : k0,
      ),
      onFieldSubmitted: onSubmit,
      controller: controller,
      style: k16Medium.copyWith(color: kBlack),
      cursorColor: kBlue,
      validator: (value) =>
          value!.trim().isEmpty ? '$hintText cannot be blank' : null,
    );
  }
}
