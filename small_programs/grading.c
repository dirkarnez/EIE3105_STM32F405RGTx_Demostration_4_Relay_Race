#include <stdio.h>
#include <stdint.h>
#define pow_of_2(a) ((a) * (a))

int main() {
    uint8_t bit_width = 2;
    for (uint8_t i = 0; i < (1 << bit_width); i++) {
        printf("Hello, World! %d, %d\n", i, pow_of_2((2 * (((i & (1 << 1)) == (1 << 1)) ? 1 : 0)) + (-1 * (((i & 1) == 1) ? 1 : 0))));
    }
    
    return 0;
}
