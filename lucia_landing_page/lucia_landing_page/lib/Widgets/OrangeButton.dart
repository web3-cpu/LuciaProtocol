import 'package:flutter/material.dart';

import '../../Constants/colors.dart';
import '../../Constants/styles.dart';

class OrangeButton extends StatelessWidget {
  const OrangeButton({
    Key? key,
    required this.text,
    required this.function,
  }) : super(key: key);

  final String text;
  final VoidCallback function;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: function,
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 16),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(8),
          color: kLightOrange,
        ),
        child: Center(
          child: Text(
            text,
            style: k16SemiBold.copyWith(color: kWhite),
            textAlign: TextAlign.center,
          ),
        ),
      ),
    );
  }
}
