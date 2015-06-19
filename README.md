## This repository includes both source and build versions of this application as well as other support files.

## To run the application:
1. copy the repository
2. start a web server in the build folder
3. use ngrok or similar to open a tunnel to the web server
4. using the generated url, open the index.html file with google chrome
5. also paste the url into https://developers.google.com/speed/pagespeed/insights/ to get the page score.
6. click the Cam's Pizzeria link to open pizza.html
7. using chrome dev tools timeline tool record the fps while scrolling the page
8. display the capture to verify 60fps was attained
9. with console open move the pizza size slider to see how long it takes to resize the pizzas  - target is under <5ms.



## Below are the main optimizations that were made for each section.

####Part 1: Optimize PageSpeed Insights score for index.html

1. used gulp build tool to produce the build files for this project.
    gulp was used to:
      optimize images
      minify files
      clean up previous build files
      move files to the correct folders
      measure the effectiveness of minification  - (before and after numbers)
      lint js

2. made print.css style sheet load async
3. replaced style.css with inline style in index.html
4. made scripts async
5. removed web font
6. moved print.css to end of index.html file
7. decided to further optimize images manually to obtain better results

####Part 2: Optimize Frames per Second in pizza.html

To optimize views/pizza.html, you will need to modify views/js/main.js until your frames per second rate is 60 fps or higher. You will find instructive comments in main.js.

8. added a viewport meta tag
9. changed moving pizzas from 200 to a number determined by the screen size
10. moved DOM calculation out of for loop that creates pizzas
11. In function updatePositions():

    A. broke the phase calculations into parts. moved the pre-phase(static part of the calculation) outside of the for loop
    B. changed style.left to style.transform
    C. replaced document.querySelectorAll with document.getElementsByClassName
    D. moved phase modulo calc outside the main loop  - calculations stored in phaseMod array
12. Created seperate makeSliders() function
13. hide backface Visibility to improve rendering


####Part 3: Optimize time to change pizza size with slider
14. In function changePizzaSizes(size), moved the size/ offset determination calculations outside the for loop.
15. changed document.querySelector... to document.getElementsBy...
