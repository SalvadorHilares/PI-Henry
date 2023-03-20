function merge(array,star_array,middle_array,end_array, form){
    var n1 = middle_array - star_array + 1;
    var n2 = end_array - middle_array;
    const L = new Array(n1);
    const R = new Array(n2);
    for (let i = 0; i < n1; i++)
        L[i] = array[star_array + i];
    for (let j = 0; j < n2; j++)
        R[j] = array[middle_array + 1 + j];
    var i = 0;
    var j = 0;
    var k = star_array;
    while (i < n1 && j < n2) {
        if(form === 'ascendente'){
            if (L[i] <= R[j]) {
                array[k] = L[i];
                i++;
            }
            else {
                array[k] = R[j];
                j++;
            }
            k++;
        }else if(form === 'descendente'){
            if (L[i] >= R[j]) {
                array[k] = L[i];
                i++;
            }
            else {
                array[k] = R[j];
                j++;
            }
            k++;
        }
    }
    while (i < n1) {
        array[k] = L[i];
        i++;
        k++;
    }
    while (j < n2) {
        array[k] = R[j];
        j++;
        k++;
    }    
}

function recursive_mergesort(array,star_array,end_array, form){
  if(star_array >= end_array) return;
  else{
    let q = star_array + parseInt((end_array-star_array)/2);
    recursive_mergesort(array,star_array,q, form);
    recursive_mergesort(array,q+1,end_array, form);
    merge(array,star_array,q,end_array, form);
  }
}

function mergeSort(array, form) {
  recursive_mergesort(array,0,array.length-1, form);
  return array;
}

module.exports = mergeSort;