#include <stdio.h>
#include <math.h>

static char map[] = { 0, 0, 0, 0, 0 };

unsigned int get_current_checkpoint_index() {
    int i = sizeof(map) - 1;
	for (; i >= 0; i--) {
		if (map[i] > 0) {
			return (i + 1) % sizeof(map);
		}
	}
	return 0;
}

#define IS_NTH_BIT_ONE(TARGET, NTH) (((TARGET) & (1 << NTH)) == (1 << NTH))

double exp_like(unsigned char larger, unsigned char smaller) {
    return ((IS_NTH_BIT_ONE(larger, 1) * 0.3) + (IS_NTH_BIT_ONE(larger, 0) * 0.1)) - ((IS_NTH_BIT_ONE(smaller, 1) * 0.3) + (IS_NTH_BIT_ONE(smaller, 0) * 0.1));
    
	// return  (x + (x * x) + (x * x * x));
}



#define NORMAL_SPEED (40000)
int main() {
    unsigned char sensor_left = 0;
    unsigned char sensor_right = 0;

    {
        sensor_left = 3;
        sensor_right = 2;
        printf("L:%d > R:%d L adj. speed: %d\n",  sensor_left, sensor_right, NORMAL_SPEED + ((-1) * (int)(NORMAL_SPEED * exp_like(sensor_left, sensor_right))));

        sensor_right = 1;
        printf("L:%d > R:%d L adj. speed: %d\n",  sensor_left, sensor_right, NORMAL_SPEED + ((-1) * (int)(NORMAL_SPEED * exp_like(sensor_left, sensor_right))));

        sensor_right = 0;
        printf("L:%d > R:%d L adj. speed: %d\n",  sensor_left, sensor_right, NORMAL_SPEED + ((-1) * (int)(NORMAL_SPEED * exp_like(sensor_left, sensor_right))));
    }

    {
        sensor_left = 2;
        sensor_right = 1;
        printf("L:%d > R:%d L adj. speed: %d\n",  sensor_left, sensor_right, NORMAL_SPEED + ((-1) * (int)(NORMAL_SPEED * exp_like(sensor_left, sensor_right))));

        sensor_right = 0;
        printf("L:%d > R:%d L adj. speed: %d\n",  sensor_left, sensor_right, NORMAL_SPEED + ((-1) * (int)(NORMAL_SPEED * exp_like(sensor_left, sensor_right))));
    }

    {
        sensor_left = 1;
        sensor_right = 0;
        printf("L:%d > R:%d L adj. speed: %d\n",  sensor_left, sensor_right, NORMAL_SPEED + ((-1) * (int)(NORMAL_SPEED * exp_like(sensor_left, sensor_right))));
    }

   return 0;
}
