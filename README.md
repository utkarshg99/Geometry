# Geometry

## Current Features:

### Lines:

* Supply Coordinates without length
* Supply one coordinate and length (default direction m=0)
* Supply one of the coordinates, length and slope

### Circles:

* Supply radius with/without centre

### Polygons:

* Supply all coordinates
* Regular polygons when center and length of side is supplied
* Squares
* Rectangles

### Currently supports only 'cm' as unit of length.

### Can calculate Euclidean-Distance between two points.

### Commands for operating (Specials):
* 'clear stack' : removes all points from point stack, preserves all jobs generated.
* 'clear all' : resets the application to the default state
* 'status' : shows current state of the point stack as well as line, circle and polygon jobs
* 'pop [Point Name]' : removes the given point(s) from the point stack
* 'calculate distance <Points_or_coordinates -> Only  one of them>' : return distance between the first two points.

## To RUN : Execute geometry.exe on windows. Alternatively, use "python starter.py"
