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

* Dictionary of Points : a statement with point-names in capitals and cordinates in form (x, y), dictionary is local to a particular question
* Circle : center (center:), radius (radius:), threshold (thresh:), diameter (diamet:)
* Line : threshold (thresh:), length (length:), end-points (name:)
* Tangent : center (center:), radius (radius:), threshold (thresh:), length (length:), intersection (int:)
* Chord : center (center:), radius (radius:), threshold (thresh:), length (length:), intersection (int:)

PS: (name:),(center:),(int:) fields have names of points mentioned already in dictionary.

#### Sample Script:
```
>>>>Question 1
##40
!desc: Yeah, A Description Here.
$dicti
#A (100,100) B (20,40) C (500,600) D (400,300) E (20,70)
$circle
*radius:40
*center:A
$tangent
*length:50
$chord
*length:60
*thresh:10
$line
*thresh:20
*name:DA
@end
>>>>Question 2
!desc: Single Line Descriptions.
##60
$dicti
#A (100,100) B (20,40) C (500,600) D (400,300)
$circle
*radius:40
*center:D
$tangent
*length:50
$chord
*length:60
*thresh:10
@end
&done&
```

TO ADD : polygons, regular polygons and general statements.