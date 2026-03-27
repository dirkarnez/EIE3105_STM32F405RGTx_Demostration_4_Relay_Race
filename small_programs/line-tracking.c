// Header file for input output functions
#include <stdio.h>

int is_crossroad() {

}

void follow_line() {

}

// Main function: entry point for execution
int main() {
    for (int i = 0; i < 3; i++) {
        // A
        if (is_crossroad()) {
            // walk straight until B

            do {
                follow_line();
                
            } while(!is_crossroad());
        }
        // B
        if (is_crossroad()) {
            // right 90 deg
            do {
                follow_line();
            } while(!is_crossroad());
        }
        // C
        if (is_crossroad()) {
            // left 90 deg
            do {
                follow_line();
            } while(!is_crossroad());
        }
        // E
        if (is_crossroad()) {
            // left 90 deg
            do {
                follow_line();
            } while(!is_crossroad());
        }
        // F
        if (is_crossroad()) {
            // right 90 deg
            do {
                follow_line();
            } while(!is_crossroad());
        }
    }

    return 0;
}