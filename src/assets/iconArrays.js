var foo = [];
const N=29;


for (var i = 1; i <= N; i++) {
   foo.push(i);
}
export const Img_Src=foo.map(index=>{
  return{
    src:{uri:[].indexOf(index)!==-1? "http://jva-sql:8080/Assistance/Diagnostic/icons/"+index+".jpg":
                        "http://jva-sql:8080/Assistance/Diagnostic/icons/"+index+".png"
          },
    "IDSysScheme": index,
  }
})

