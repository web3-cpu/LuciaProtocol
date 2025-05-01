import 'package:flutter/foundation.dart';

class MainProvider extends ChangeNotifier {
  bool isLoading = false;
  changeIsLoading(bool b) {
    isLoading = b;
    notifyListeners();
  }
}
