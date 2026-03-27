#include <cstdint>
#include <iostream>

#define NORMAL_SPEED (40000)

uint32_t map(uint32_t x, uint32_t in_min, uint32_t in_max, uint32_t out_min, uint32_t out_max) {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

int main() {
    for( int a = 200; a >= 90; a = a - 1 )
    {
       std::cout << "map " << a << " " << map(a, 90, 200, 0, NORMAL_SPEED) << std::endl;
    }
}
