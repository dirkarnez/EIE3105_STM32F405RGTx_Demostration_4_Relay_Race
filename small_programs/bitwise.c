#include <stdio.h> // 引入標準輸入輸出頭文件
#include <stdint.h>

#define reverse_5_bits(value) ( \
		( (value & 0x01) << 4 ) | \
		( (value & 0x02) << 2 ) | \
		( (value & 0x04) ) 		| \
		( (value & 0x08) >> 2 ) | \
		( (value & 0x10) >> 4 ))
#define get_left() ((sensor_array_value) >> 3)
#define get_right() (reverse_5_bits((sensor_array_value | 0b11000)) >> 3)
 
uint8_t sensor_array_value = 0b11001;


int main() {
   

    printf("%d %d\n", get_left(), get_right()); 
    
    return 0; // 表示程式正常結束
}