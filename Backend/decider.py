import re
linelist=['connect', 'join', 'line', 'segment', 'line-segment']
circlelist=['circle', 'radius', 'diameter', 'centre', 'center']
polylist=['triangle', 'square', 'rectangle', 'quadrilateral', 'pentagon', 'hexagon', 'heptagon', 'octagon', 'nonagon', 'decagon']
mapped={'triangle':'3', 'quadrilateral':'4', 'pentagon':'5', 'hexagon':'6', 'heptagon':'7', 'octagon':'8', 'nonagon':'9', 'decagon':'10', 'square':'sq', 'rectangle':'rect'}
def decide(strn):
    regpoly=r'([A-Z])+?'
    plit=re.finditer(regpoly, strn)
    n=0
    for _ in plit:
        n+=1
    for ll in linelist:
        if(ll in strn):
            if(ll=='join' and n<=2):
                return ('line', ll)
            if(ll=='connect' and n<=2):
                return ('line', ll)
            elif(ll!='join' and ll!='connect'):
                return ('line', ll)
    for cl in circlelist:
        if(cl in strn):
            if(cl=='center' or cl=='centre'):
                for pl in polylist:
                    if(pl in strn):
                        if('regular' in strn):
                            return ('poly', mapped[pl]+'r')
            return ('circle', cl)
    for pl in polylist:
        if(pl in strn):
            if('regular' in strn):
                return ('poly', mapped[pl]+'r')
            if(pl=="square" and n==4):
                return ('poly', 'sq4')
            return ('poly', mapped[pl])
    if(n!=0 and n!=2):
        return ('poly', str(n))
    if(n==2):
        return('line', '')
    return ('poly', '')

# strn='draw a line AB'
# print(decide(strn))