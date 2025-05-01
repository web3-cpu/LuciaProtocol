import 'package:flutter/material.dart';

import '../../Constants/colors.dart';
import '../../Constants/styles.dart';

class WhiteButton extends StatelessWidget {
  const WhiteButton({
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
          color: kWhite,
          borderRadius: BorderRadius.circular(30),
          border: Border.all(color: kLightOrange, width: 1),
        ),
        child: Center(
          child: Text(
            text,
            style: k16SemiBold.copyWith(color: kLightOrange),
          ),
        ),
      ),
    );
  }
}
