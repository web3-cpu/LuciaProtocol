#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <string.h>


char intToChar(int i) {
  char ls[]="0123456789abcdef";
  return ls[i];
}


// Precedence Category 3 * / %
// Precedence Category 4 + -
char* intToHex(int bTen) {
  int p = 0;
  int w = 0;
  int x = 0;
  int y = 0;
  int len;
  char whole[99];
  char sum[100];
  char* output = malloc(sizeof(char)*100);
  while (bTen > 0) {
    whole[x] = intToChar(bTen % 16); // 2, 3%16 is 3
    bTen = (bTen-bTen % 16)/16; // 50%16 is 2, 48/16 is 3
    x++;
  }
  // [[2],[ ]] <= whole
  // [[2],[3]] <= whole
  x--;

  //reverse it bc it got stored in reverse order in the conversion
  for(x=x; x>=0; x--){
    output[w] = whole[x];
    w++;
  }

  /* total lenghth of whole after while loop */
  len = strlen(whole);
  printf("strlen(whole):  %d\n", len);
  output[len] = '\0';
  // char stringPrefix[2] = "0x";

  return output;

  /* concatenates str1 and str2 */
  // strcat( output, stringTerminator);
  // printf("output as strcat( str1, str2):   %s\n", output);

  /* copy second param into first param */
  // strcpy(sum, output);
  // printf("strcpy( sum, output) :  %s\n", sum);

  // return sum;
}


/****************************************************************  
   * The statement char *s = somestring creates a string literal. 
   * The string literal is stored in the read-only part of memory by 
   * most of the compilers. The C and C++ standards say that string 
   * literals have static storage duration, any attempt at modifying 
   * them gives undefined behaviour. s is just a pointer and like any 
   * other pointer stores address of string literal.
  *****************************************************************/
int main(int argc, char** argv) {
  char s[] = "so";
  s[0] = '0';
  s[1] = 'x';

  char* myNum1 = intToHex(15);
  char* myNum2 = intToHex(500);
  printf("\n one %s", myNum1);
  printf("\n two %s", myNum2);
 
  return 0;
}




