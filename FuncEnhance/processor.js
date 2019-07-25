let dummy_trains=[
    {
        name: 'train2',
        length: 150,
        speed: 50,
        to: 'A',
        from: 'B'
    },
    {
        name: 'train1',
        length: 250,
        speed: 20,
        to: 'A',
        from: 'B'
    }
]
let platforms=[
    {
        length: 100,
        name: 'A'
    },
    {
        length: 200,
        name: 'B'
    }
]
var trains = dummy_trains;
var platforms = dummy_platforms;
let tvt= [];
let tvp= [];

function solvetvt(train1, train2){
    let obj= {
        status: true,
        train1: train1.name,
        train2: train2.name,
        length: train1.length+train2.length
    };
    if(train1.to == train2.to && train1.from == train2.from){
        obj.speed = Math.abs(train1.speed - train2.speed);
        obj.time = obj.length / obj.speed;
    }
    else if(train1.to == train2.from && train1.from == train2.to){
        obj.speed = train1.speed + train2.speed;
        obj.time = obj.length / obj.speed;
    }
    else
        return {status: false, partial_object: obj};
    return obj;
}

function solvetvp(platform, train){
    let obj= {
        status: true,
        train: train.name,
        platform: platform.name,
        length: platform.length+train.length,
        speed: train.speed
    };
    obj.time = obj.length / obj.speed;
    return obj;
}

function genTimeInteractiontvt(){
    for(var i=0; i<trains.length; i++){
        for(var j=0; j<trains.length; j++){
            if(trains[i] != trains[j]){
                let x = solvetvt(trains[i], trains[j])
                if(x.status){
                    tvt.append(x);
                }
            }
        }
    }
}

function genTimeInteractiontvp(){
    for(var i=0; i<platforms.length; i++){
        for(var j=0; j<trains.length; j++){
            let x = solvetvp(platforms[i], trains[j])
            if(x.status){
                tvp.append(x);
            }
        }
    }
}