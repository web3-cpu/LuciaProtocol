import 'package:flutter/material.dart';

import '../Constants/colors.dart';
import '../Constants/styles.dart';

class DropDownWidget extends StatelessWidget {
  const DropDownWidget({
    super.key,
    required this.hintText,
    required this.values,
    required this.onChanged,
    required this.selectedValue,
  });

  final String hintText;
  final List<String> values;
  final String? selectedValue;
  final Function(String?) onChanged;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 6),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(8),
        border: Border.all(width: 0, color: kBlack),
      ),
      child: DropdownButton<String>(
        hint: Text(
          hintText,
          style: k13Medium.copyWith(color: kGrey),
        ),
        value: selectedValue,
        isExpanded: true,
        icon: const Icon(Icons.keyboard_arrow_down_outlined),
        underline: const SizedBox(),
        items: values.map((String value) {
          return DropdownMenuItem<String>(
            value: value,
            child: Text(
              value,
              style: k16Medium.copyWith(color: kBlack),
            ),
          );
        }).toList(),
        onChanged: onChanged,
      ),
    );
  }
}
