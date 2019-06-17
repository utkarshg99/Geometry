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

* Dictionary of Points  : ($dict)       : a statement with point-names in capitals and cordinates in form (x, y), dictionary is local to a particular question (#)
* Tangent               : ($tangent)    : center (center:),     radius (radius:), threshold (thresh:), length (length:), intersection (int:)
* Chord                 : ($chord)      : center (center:),     radius (radius:), threshold (thresh:), length (length:), intersection (int:)
* Circle                : ($circle)     : center (center:),     radius (radius:), threshold (thresh:), diameter (diamet:)
* Line                  : ($line)       : threshold (thresh:),  length (length:), end-points (name:)
* Statatement           : ($stat)       : stat (stat:),         trans (trans:)
* Polygon               : ($poly)       : vertices (name:)

##### Guide to Commands:

* (name:),(center:),(int:),(name:) fields have names of points mentioned already in dictionary.

* (trans:) refers to a particular co-ordinate (specified after (trans:)) to which all other co-ordinates are to be translated to. Use this whenever (stat:) has polygons or lines with undefined co-ordinates. REMEMBER all co-ordinates are auto-shifted and not just those which are undefined.

* (stat:) takes only one-line for processing, use multiple (stat:) for multiple lines, to get an idea of how (stat:) works use Auto-Draw. NOTE: Intteligent-Dictionary-Generation feature of Auto-Draw is partially turned off. Specify the points yourself beforehand in the dictionary, in case you are using them in the statments. However, for regular polygons if a name is given then, Dictionary is auto-updated.

* (center:) and (radius:) for tangent and chords refers to the tangent of the circle to which they belong.

#### Sample Script:
```
>>>>Question 1
##40
!desc: Yeah, A Description Here.
$dicti
#A (100,100) B (20,40) C (500,600) D (400,300) E (20,70) X (200,200)
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
$poly
*name:ADCB
$stat
*trans:X
*stat:make a square of side-length 100cm
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