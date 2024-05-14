let debug = 0;
const pokreni = () =>{
    try{
    let funkcija = document.getElementById("funkcija").value;
    let rez = parseFloat(document.getElementById("guess").value);
    let preciznost = parseFloat(document.getElementById("prec").value);
    let odstupanje;
    for(let i=0; i<1000; i++){
        if(debug === 1)
         console.log(`
             X_0:${rez}\tf(x):${racunFunkcija(funkcija,rez)}\tf'(x):${derivacija(funkcija,rez)};
         `)
        rez = aproksimacija(funkcija, rez);
        odstupanje = racunFunkcija(funkcija, rez);
        
        if(Math.abs(odstupanje)<preciznost) break;
    }
    document.getElementById("ispis").innerText = `Nultočka :${rez}\n Odstupanje: ${odstupanje}`;
    }
    catch(error){
        document.getElementById("ispis").innerText = `ERROR`;
        console.log(error);
    }
}
const aproksimacija =(funkcija, x) =>{
    return x - (racunFunkcija(funkcija,x)/derivacija(funkcija,x));
}

const derivacija = (funkcija, x) =>{
    const deriv = document.getElementById("derivacija").value;
    if(deriv !== "") return racunFunkcija(deriv, x);
    let delta = 0.00001;
    //console.log(x+delta);
    let k = (racunFunkcija(funkcija, x + delta)- racunFunkcija(funkcija, x))/delta;
    return k;
}

const racunFunkcija = (funkcija, x) =>{
    if(typeof x === 'string')
    x = parseFloat(x);
    let vrijednost = evaluatex(funkcija,{e:Math.E, x:x});
    let rez = vrijednost();
    return(rez);
}

const renderLatex = (id,input) =>{
        let output = document.getElementById(id);
        output.innerHTML = "";
        try {
            katex.render(input, output);
        } catch (error) {
            output.innerHTML = '<span style="color: red;">Nevažeći LaTeX izraz</span>';
        }
}

document.getElementById("racun").addEventListener("click", pokreni);

const input_funkcija = document.getElementById("funkcija");
input_funkcija.addEventListener("input", ()=>{
    renderLatex("f_out", input_funkcija.value);
});
const deriv = document.getElementById("derivacija");
deriv.addEventListener("input", ()=>{
    renderLatex("d_out", deriv.value);
});
