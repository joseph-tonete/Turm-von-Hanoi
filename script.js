var n = 0    
var velocity = 0
var estacas = []
var aglomerado = []
var basesPar = [[0,1],[0,2],[1,2]]
var basesImpar = [[0,2],[0,1],[1,2]]
var bases = []
var troca = 0

const pilha1 = document.getElementById("tower-1")
const pilha2 = document.getElementById("tower-2")
const pilha3 = document.getElementById("tower-3")
var myloop

criar()
function criar(){
    clearTimeout(myloop)
    n = Number(document.getElementById("disk-input").value)
    velocity = Number(document.getElementById("velocity-input").value)
    estacas = []
    aglomerado = []
    bases = []
    troca = 0
    if(n % 2 == 0){
        bases = basesPar
    } else {
        bases = basesImpar
    }

    //criando estacas
    for(var x = 0; x < 3; x++){
        var linha = []
        for(var y = 0; y < n; y++){
            if(x ==0){
                linha.push(n-y)
            } else {
                linha.push(0)
            }
            
        }   
        estacas.push(linha)
    }
    
    //Configurações das divs
    //Limpando pilhas
    pilha1.innerHTML = ""
    pilha2.innerHTML = ""
    pilha3.innerHTML = ""
    //Criando divs-disco
    for(var disco = n; disco > 0; disco--){
        let newdisk = document.createElement("div")
        newdisk.className = "tower-disk"
        newdisk.id = "disk-" + (disco)
        newdisk.style.backgroundColor = "hsl(" + mapping(disco, 1, n, 0, 250 ) + ",90%,50%)"
        newdisk.style.width = mapping(disco, 1, n, 120, 300) + "px"
        if (500/n > 100) newdisk.style.height = "100px"
        else newdisk.style.height = (500/n) + "px"
        document.getElementById("tower-1").appendChild(newdisk)
    }
}

function startPause(elemento){
    if(elemento.innerText == "Começar"){
        elemento.innerText = "Pausar"
        elemento.className = "disk-input-button-pause"
        loop()
    } else {
        elemento.innerText = "Começar"
        elemento.className = "disk-input-button-start"
        clearTimeout(myloop)
    }
}

function forwardBackward(direction){
    if(troca + direction >= 0 && troca + direction < 2**n){
        if(direction == -1){
            troca += direction
            mover()
        } else {
            mover()
            troca += direction
        }
    }
}

function loop(){
    myloop = setTimeout(() => {
        mover()
        troca++
        if(troca < 2**n-1){
            loop()
        } else {
            startPause(document.getElementById("disk-control"))
        }
    }, velocity);
}

function mover(){
    var base = bases[troca % 3]
    var topo1 = menorNatural(estacas[base[0]])
    var topo2 = menorNatural(estacas[base[1]])
    if(topo1 == 0){
        topo1 = n + 1
    }
    if(topo2 == 0){
        topo2 = n + 1
    }
    if (topo1 < topo2){
        trocar(base[0], base[1])
    } else {
        trocar(base[1], base[0])
    }
    console.log(JSON.parse(JSON.stringify(estacas)))
}

function trocar(base1, base2){
    var topo = menorNatural(estacas[base1])
    var disco = document.getElementById("disk-" + topo).cloneNode(true)
    document.getElementById("disk-" + topo).remove()
    document.getElementById("tower-" + (base2 + 1)).appendChild(disco)
    if( topo != 0 ){
        estacas[base1][estacas[base1].indexOf(topo)] = 0
        for (var disco = 0; disco < n; disco++){
            if(estacas[base2][disco] == 0){
                estacas[base2][disco] = topo
                break
            }
        }
    }
}

function menorNatural(lista){
    for(var disco = n-1; disco > -1; disco--){
        if(lista[disco]){
            return lista[disco]
        }
    }
    return 0
}

function mapping(value, in_min, in_max, out_min, out_max) {
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}