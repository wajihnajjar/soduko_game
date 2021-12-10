var mat = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],      // Mat is Varible for Storing what user did in soduko 
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
]        
// Now Add Random Numbers 
function random(x){
 return Math.floor(Math.random()*x) 
}
/////////////
$("#Won").hide() 
$("#Lose").hide() 
///////////////
var x = $("input")
for (let i = 0 ; i < 81 ; i ++){      // just wana add unique id to all input  
$(x[i]).attr("id",`a${i}`)
}
for (let i = 0 ; i<=random(10) ; i ++){ 
 var x =random(81)
var r = (random(8))+1
if(canWePlace(Math.min(Math.floor(x/9),8),x%9,r))
{
    console.log(Math.min(Math.floor(x/9),8))
    console.log(x%9)
    console.log(r)
console.log("****************")
    $(`#a${x}`).attr("value",`${r}`)
    $(`#a${x}`).attr('disabled','disabled');
}
}
/////////////
var x =document.getElementById("wow") 
x.addEventListener('click',function(){
k = 0 ; 
for (var i = 0 ; i< 9 ; i ++){ 
for (var j  = 0 ; j< 9 ; j ++){                                   ////event click When User is Done From Playing 
var x = parseInt(document.getElementById(`a${k++}`).value)// remplir the Mat with the value added by the user  ; 
if(isNaN(x))
mat[i][j]=0
else 
mat[i][j]=x
}
}
console.log(mat)
})
///////////////////////////
// Now Just Add Botton for Solution 
 // So I used Backtracking => Backtracking technique Most Of the Time Works with Recusion 
//  I will Iterate from 1 to 9  let call that number k if that we can put k inside the that position then when procede to the next 
// our stop condition is when i is reach 9 so we know we have a solution  so return true 
 // but if that k does not fit in that position then we return to the previous function and try to change the number
// so one 
 // Our Time Complaxity Kind Complicated but i assume its NP-compelete 
 // NP Complete its not solvable in polynominal time 
function canWePlace(i,j,val){ 
var row = (Math.floor(i/3)*3)  ///    (i/3)*i  =>  To give us the postion of the postition of the start of square ex :  
        // 5/3 *3 = 1*3 = 3  its true because 5 belong to square begin from 3 to 5  
var col = (Math.floor(j/3)*3) 
for (let k = 0 ; k<9 ; k ++){
if(mat[i][k]==val || mat[k][j]==val)
return false 
}
for (let  k = 0 ; k<3 ; k ++){
for (let k1 =0 ; k1<3 ; k1++){
 if(mat[k+row][k1+col]==val)
 return false 
}
}
return true 
}
function soduko_solver(i , j){   // recursive solution for soduko   
 if(i==9){ // our Stop Condition 
    return true
 }
 if(j==9)  // if The we get our From the grid 
 return soduko_solver(i+1,0)
 if(mat[i][j]!=0){ 
     return soduko_solver(i,j+1) //if The number not 0 then do not modify it and wait the rezult from the next callls 
 }   
 for (var k = 1 ; k<=9 ; k++){  // iterate from 1 to 9 with k 
     if(canWePlace(i,j,k)){  // can we Place it its to check if we can place k (the number) in postion mat[i][j]
          mat[i][j]= k    // assign k to mat[i][j]
          if(soduko_solver(i,j+1)) {   // now if the call recusevly the next place and wait its rezult  
          return true 
          }   
          mat[i][j]=0 ;     // undo the number in case if the number fit but it makes the next position wrong  
     }
    }
return false // return false if you try all the number and does not fit                                       
}
function Complete_all(){ 
for (let i= 0 ; i<9 ; i ++){ 
for (let  j = 0 ; j<9 ; j ++)
{ 
    if(mat[i][j]==0)
    return false ;
}
}
return true ; 
}
function doesItTrue(){ 
    /***
     * Now Just Check If the soduko is True or Not 
     * 
     * 
     */
for (let i = 0 ;i< 9 ; i ++){
for (let j = 0 ; j< 9 ; j++){
var counter= 0 
var r=  mat[i][j]
for (let x = 0 ; x< 9  ;x ++)
{
    if(mat[i][x]==r )
     counter++ 
}
if(counter>1)
return false 
counter=0
for (let x = 0; x <9 ;x++){ 
    
if(mat[x][i]==r)
counter++ 
}
if(counter>1)
return false  ; 
counter=0 
var row = (Math.floor(i/3)*3) 
var col = (Math.floor(j/3)*3)
for (let x = 0 ; x<3 ; x++){ 
for (let x1=  0 ; x1<3 ;x1++){
    if(mat[x+row][x1+col]==r)
counter++ 
}
}
if(counter>1)
return false 
}
}

return true 
}
/////////:Button for The solution 
var y = document.getElementById("Solve") 
console.log(y)
y.addEventListener('click',function(){ 
    // Now Check if He complete all The soduko if it true then you must check if the sodukou is true else 
    if(Complete_all()){
       if(doesItTrue()){    
     $("a").hide()
     $("button").hide() 
    $("#Won").show() 
         
       }
       else 
       {
        $("a").hide()
        $("button").hide() 

        $("#Lose").show() 


       }
    }
    else {
    soduko_solver(0,0) 
    console.log(mat)
    $(".Table").hide()
    var Rezult = `<table class="Table"> 
    <tr>  
  <td  class='hola'>${mat[0][0]}</td>
  <td   class='hola'>${mat[0][1]}</td>
  <td class='r hola'>${mat[0][2]}</td>
  <td  class='hola'>${mat[0][3]}</td>
  <td  class='hola'>${mat[0][4]}</td>
  <td class="r hola">${mat[0][5]}</td>
  <td  class='hola'>${mat[0][6]}</td>
  <td  class='hola'>${mat[0][7]}</td>
  <td  class='hola'>${mat[0][8]}</td>
</tr>
    <tr>  // The Second row 
       <td  class='hola' >${mat[1][0]}</td>
       <td  class='hola' >${mat[1][1]}</td>
       <td class="r hola" >${mat[1][2]}</td>
       <td  class='hola'>${mat[1][3]}</td>
       <td   class='hola'>${mat[1][4]}</td>
       <td  class="r hola">${mat[1][5]}</td>
       <td  class='hola' >${mat[1][6]}</td>
       <td  class='hola'>${mat[1][7]}</td>
       <td  class='hola'>${mat[1][8]}</td>
   </tr> // closing of the second row 
          <tr> 
            <td class="f hola" >${mat[2][0]}</td>
            <td  class="f hola">${mat[2][1]}</td>
            <td class="r f hola" >${mat[2][2]}</td>
            <td  class="f hola">${mat[2][3]}</td>
            <td  class="f hola">${mat[2][4]}</td>
            <td class="r f hola" >${mat[2][5]}</td>
            <td  class="f hola">${mat[2][6]}</td>
            <td  class="f hola"> ${mat[2][7]}</td>
            <td class="f hola" >${mat[2][8]}</td>
        
            </tr> // closing of the second row 
     <tr >  // the third row
               <td  class='hola' >${mat[3][0]}</td>
               <td   class='hola' >${mat[3][1]}</td>
               <td class="r hola" >${mat[3][2]}</td>
               <td   class='hola'>${mat[3][3]}</td>
               <td   class='hola'>${mat[3][4]}</td>
               <td  class="r hola">${mat[3][5]}</td>
               <td  class='hola' >${mat[3][6]}</td>
               <td  class='hola'>${mat[3][7]}</td>
               <td  class='hola'>${mat[3][8]}</td>
            
   </tr>// closing of the third row 
               <tr> // the fourth row 
                   <td  class='hola'>${mat[4][0]}</td>
                   <td  class='hola'>${mat[4][1]}</td>
                   <td class="r hola" >${mat[4][2]}</td>
                   <td  class='hola' >${mat[4][3]}</td>
                   <td  class='hola'>${mat[4][4]}</td>
                   <td class="r hola" >${mat[4][5]}</td>
                   <td  class='hola'>${mat[4][6]}</td>
                   <td  class='hola'>${mat[4][7]}</td>
                   <td  class='hola'>${mat[4][8]}</td>
                
               </tr> // the closing of the forth row 
                     <tr>  //the 5 row 
                       <td class="f hola">${mat[5][0]}</td>
                       <td class="f hola">${mat[5][1]}</td>
                       <td class="r f hola">${mat[5][2]}</td>
                       <td class="f hola">${mat[5][3]}</td>
                       <td class="f hola">${mat[5][4]}</td>
                       <td class="r f hola">${mat[5][5]}</td>
                       <td class="f hola">${mat[5][6]}</td>
                       <td class="f hola">${mat[5][7]}</td>
                       <td class="f hola">${mat[5][8]}</td>
                   
                   </tr> // closing of the 5 row 
                         <tr>  // the 6 row 
                           <td  class='hola'>${mat[6][0]}</td>
                           <td  class='hola'>${mat[6][1]}</td>
                           <td class="r hola">${mat[6][2]}</td>
                           <td  class='hola'>${mat[6][3]}</td>
                           <td  class='hola'>${mat[6][4]}</td>
                           <td class="r hola">${mat[6][5]}</td>
                           <td  class='hola'>${mat[6][6]}</td>
                           <td  class='hola'>${mat[6][7]}</td>
                           <td  class='hola'>${mat[6][8]}</td>
                        
                        </tr> // closing of the 6 row 
                             <tr> // the  7 row 
                               <td  class='hola'>${mat[7][0]}</td>
                               <td  class='hola'>${mat[7][1]}</td>
                               <td class="r hola">${mat[7][2]}</td>
                               <td  class='hola'>${mat[7][3]}</td>
                               <td  class='hola'>${mat[7][4]}</td>
                               <td class="r hola">${mat[7][5]}</td>
                               <td  class='hola'>${mat[7][6]}</td>
                               <td  class='hola'>${mat[7][7]}</td>
                               <td  class='hola'>${mat[7][8]}</td>
                            
                       </tr>// closing the 7 row 
                                 <tr> // the 8 row 
                                   <td  class='hola'>${mat[8][0]}</td>
                                   <td  class='hola'>${mat[8][1]}</td>
                                   <td class="r hola">${mat[8][2]}</td>
                                   <td  class='hola'>${mat[8][3]}</td>
                                   <td  class='hola'>${mat[8][4]}</td>
                                   <td class="r hola">${mat[8][5]}</td>
                                   <td  class='hola'>${mat[8][6]}</td>
                                   <td  class='hola'>${mat[8][7]}</td>
                                   <td  class='hola'>${mat[8][8]}</td>
                                     </tr>// closing 8 row 
       </table>`
      $(Rezult).insertBefore("div")
    }
})
// When i Click on The Bottom its Changes The input to disable 
// and add the correct sodoku 
////////////////////////////















//// To Do 
//Make website generate a random number at random positions 
// and make the user try to solve it or click botton to said its unsolvable 
// 