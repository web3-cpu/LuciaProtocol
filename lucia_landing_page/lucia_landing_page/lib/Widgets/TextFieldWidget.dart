import 'package:flutter/material.dart';

import '../Constants/colors.dart';
import '../Constants/styles.dart';

class TextFieldWidget extends StatelessWidget {
  const TextFieldWidget({
    super.key,
    required this.controller,
    required this.hintText,
  });

  final TextEditingController controller;
  final String hintText;

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      style: k18Medium,
      controller: controller,
      decoration: InputDecoration(
        hintText: hintText,
        hintStyle: k16Medium.copyWith(color: kGrey),
        focusedBorder: const OutlineInputBorder(
          borderSide: BorderSide(
            width: 1,
            color: kWhite,
          ),
        ),
        focusedErrorBorder: const OutlineInputBorder(
          borderSide: BorderSide(
            width: 1,
            color: kWhite,
          ),
        ),
        enabledBorder: const OutlineInputBorder(
          borderSide: BorderSide(
            width: 1,
            color: kGrey,
          ),
        ),
        border: const OutlineInputBorder(
          borderSide: BorderSide(
            width: 1,
            color: kGrey,
          ),
        ),
        errorBorder: const OutlineInputBorder(
          borderSide: BorderSide(
            width: 1,
            color: kDarkOrange,
          ),
        ),
      ),
      validator: (value) => value!.trim().isEmpty ? "$hintText is empty" : null,
    );
  }
}
