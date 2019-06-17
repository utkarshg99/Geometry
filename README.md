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

### Architecture:
![alt text](https://firebasestorage.googleapis.com/v0/b/utkarshgx.appspot.com/o/images%2FGeometry.jpg?alt=media&token=6f660d61-6b06-4daf-865d-c3e624d034bd)

### To RUN : Execute geometry.exe on windows. Alternatively, use "python starter.py"

### Uploading Questions using UK-LANG:

#### Currently Supports :

* Circle : center (center:), radius (radius:), threshold (thresh:), diameter (diamet:)
* Line : threshold (thresh:), length (length:)
* Tangent : center (center:), radius (radius:), threshold (thresh:), length (length:)
* Chord : center (center:), radius (radius:), threshold (thresh:), length (length:)

#### Sample Script:
Remove Single Quotes
```
>>>>Question 1
##40
$circle
*radius:40
*center:(100,100)
$tangent
*length:50
$chord
*length:60
*thresh:10
@end
>>>>Question 2
!desc: Single Line Descriptions
##60
$circle
*radius:40
*center:(100,100)
$tangent
*length:50
$chord
*length:60
*thresh:10
@end
%done%

```