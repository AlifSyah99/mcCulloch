const container = document.querySelector('.container--hasil');
const isi = document.querySelector('.isi');
const btnLatih = document.querySelector('#latih');
const btnReset = document.querySelector('#reset');
let logika = document.querySelector('#select--logika');
let inputX1 = document.querySelectorAll('#tf-x1');
let inputX2= document.querySelectorAll('#tf-x2');
let bobot= document.querySelector('#textfield--bobot');
let threshold= document.querySelector('#textfield--threshold');

btnReset.addEventListener('click',function(){
  for(let i=0; i<4; i++){
    inputX1[i].value="";    
    inputX2[i].value="";    
  }
  bobot.value="";
  threshold.value="";
  container.classList.add("hidden");
});


btnLatih.addEventListener('click', function(){
  isi.innerHTML="";
  let logika = document.querySelector('#select--logika').value;
  let inputX1 = document.querySelectorAll('#tf-x1');
  let inputX2= document.querySelectorAll('#tf-x2');
  let bobot= document.querySelector('#textfield--bobot').value;
  let threshold= document.querySelector('#textfield--threshold').value;
  let x1 = inputan(inputX1[0].value,inputX1[1].value,inputX1[2].value,inputX1[3].value);
  let x2 = inputan(inputX2[0].value,inputX2[1].value,inputX2[2].value,inputX2[3].value);
  let latih = new Latih(x1,x2);
  latih.runY(logika);
  latih.runPelatihan(bobot);
  latih.runOutput(threshold);
  container.classList.remove("hidden");
    isi.innerHTML = showResult(latih);

});


function showResult(data){
  let y = data.getY();
  let pelatihan = data.getPelatihan();
  let output = data.getOutput();
  let hasil = data.getHasil();
  let isi="";
  for(let i=0; i<4; i++){
    isi += ` <tr> 
                <td>
                ${y[i]}
                </td>
                <td>
                 ${pelatihan[i]}
                </td>
                <td>
                 ${output[i]}
                </td>
                <td>
                 ${hasil[i]}
                </td>
          
              </tr>
          
    `;

  }
  return isi;
}
class Latih{
  constructor(x1,x2){
    this.x1 =x1;
    this.x2 =x2;
    this.y=[];
    this.pelatihan=[];
    this.hasil=[];
    this.output=[];
  }
  runY(logika){
    if(logika == "and"){
      for(let i=0; i<this.x1.length; i++){
          if(this.x1[i] == this.x2[i]){
            this.y[i] = 1;
          }else{
            this.y[i] = 0;
          }
      }
    }
      if(logika == "or"){
        for(let i=0; i<this.x1.length; i++){
            if( (this.x1[i]==1) || (this.x2[i]==1)){
              this.y[i] = 1;
            }else{
              this.y[i] = 0;
            }
        }
      }
      if(logika == "xor"){
        for(let i=0; i<this.x1.length; i++){
            if(this.x1[i] != this.x2[i]){
              this.y[i] = 1;
            }else{
              this.y[i] = 0;
            }
        }
      }
    
  }
  getY(){
    return this.y;
  }
  runPelatihan(bobot){
    bobot = parseFloat(bobot);
    for(let i=0; i<this.x1.length; i++){
      this.x1[i] = parseFloat(this.x1[i]);
      this.x2[i] = parseFloat(this.x2[i]);

      this.pelatihan[i] = (this.x1[i] * bobot) + (this.x2[i] * bobot);
    } 
    
    
  }

  getPelatihan(){
    return this.pelatihan;
  }
  runOutput(threshold){
    threshold = parseFloat(threshold);
    for(let i=0; i<this.x1.length; i++){
        if(this.pelatihan[i] >= threshold){
          this.output[i] ="1";
        }else{
          this.output[i] = "0";
        }
      }   
      
    }
    getOutput(){
      return this.output;
    }
    getHasil(){
      for(let i=0; i<this.x1.length; i++){
        if(this.output[i] == this.y[i]){
          this.hasil[i] ="OK";
        }else{
          this.hasil[i] = "Not OK";
        }
      } 
     return this.hasil;
    }
}
function inputan(x1,x2,x3,x4){
  let x= [x1,x2,x3,x4];
  return x;
}
