#include <stdio.h>
#include <string.h>

// Leftmost (L2): Track the extreme left line.
// Left-center (L1): Track the left-mid area.
// Center (M): Track the middle of the line.
// Right-center (R1): Track the right-mid area.
// Rightmost (R2): Tracks the extreme right line.

// 12-bit ADC: 0 - 4095
uint16_t ADC2Array[5];

char tracker_marking(uint16_t adc_value) {
	// mid-point of 12-bit ADC
	return adc_value < 2048 ? '-' : '*';
}

int is_leftmost_on() {
    return ADC2Array[0] >= 2048;
}

int is_left_center_on() {
    return ADC2Array[1] >= 2048;
}

int is_center_on() {
    return ADC2Array[2] >= 2048;
}

int is_right_center_on() {
    return ADC2Array[3] >= 2048;
}

int is_right_most_on() {
    return ADC2Array[4] >= 2048;
}

int all_on() {
    return 
    is_leftmost_on() && 
    is_left_center_on() && 
    is_center_on() && 
    is_right_center_on() && 
    is_right_most_on()
}

int is_center_on_only() {
    return 
    !is_leftmost_on() && 
    !is_left_center_on() && 
    is_center_on() && 
    !is_right_center_on() && 
    !is_right_most_on()
}

int main() {
	// see book page 10-13
    // from book should consider ICC, and we can calculate how much we turn left / right

	// for lab 3, see book page 10-32
}

void outer_loop() {
    while (1) {
        if (is_center_on_only()) {
            // move forward
        } else {
            if (is_left_center_on() || is_leftmost_on()) {
                // make left wheel slower
            } else if (is_right_center_on() || is_right_most_on()) {
                // make right wheel slower
            } else {
                // Stop for a while.
                // Search for the line by alternating turns (left, then right)
            }
        }

        if (all_on()) {
            // check point detected
            // stop detecting for a while
            // change state
        }
    }
}

// basic the same as outloop, just different travelling speed
void inner_line() {
    while (1) {
        if (is_center_on_only()) {
            // move forward slowly
        } else {
            if (is_left_center_on() || is_leftmost_on()) {
                // make left wheel slower
            } else if (is_right_center_on() || is_right_most_on()) {
                // make right wheel slower
            } else {
                // Stop for a while.
                // Search for the line by alternating turns (left, then right)
            }
        }

        if (all_on()) {
            // check point detected
            // stop detecting for a while
            // change state
        }
    }
}

void align_to_checkpoint() {
    // left and right until all_on()
}
