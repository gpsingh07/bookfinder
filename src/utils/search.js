export const checkSubstirng = function(str, query){
	const index = str.indexOf(query);
	const endpoint = index + query.length;

	if(index === -1)
		return 3;
	if((index === 0 || str[index-1] === ' ') && (endpoint === str.length || str[endpoint] === ' '))
		return 0;
	if(index === 0 || str[index-1] === ' ' || endpoint === str.length || str[endpoint] === ' ')
		return 1;
	return 2;
}	

//Array.prototype.flat is not availabel for certain node versions.

const flat = function(x){
	let y = [];
	for(let i=0; i<x.length; i++){
		if(Array.isArray(x[i]))
				y= [...y, ...x[i]]
		else
				y.push(x[i])
	}
	return y;
}

/*
	Checking Full query intially, in case of perfect match it gets best score.
	Incase of absence of perfect match, partail search is applied and score is assigned based on that
*/

const search = function({list, query, count}){
	let searchIndexes = {};
	const searchString = query.trim(); 				//trimming to avoid whitespace issues
	for(let i=0; i<list.length; i++){
		const fullSearch = checkSubstirng(list[i].toLowerCase(), searchString);
		if(fullSearch < 3){
			searchIndexes[fullSearch] = searchIndexes[fullSearch] ? [...searchIndexes[fullSearch], i] : [i];
		}else{
			const words = searchString.split(' ').filter(word => word.length);
			let semiSearch = 0;
			for(let j=0; j<words.length; j++){
				const temp = checkSubstirng(list[i].toLowerCase(), words[j]);
					semiSearch += temp;
			}
			searchIndexes[semiSearch] = searchIndexes[semiSearch] ? [...searchIndexes[semiSearch], i] : [i];
		}
	}
	return flat(Object.values(searchIndexes)).slice(0,count);
}


//Keeping cache to avoid repeated search for queries
const memoizedSearch = (function(){
	let cache = {};
	function func({list, query, count}){
		if(cache.hasOwnProperty(query)){
			return cache[query].slice(0,count)
		}
		cache[query] = search({list, query, count: 8})
		return cache[query].slice(0,count);
	}
	return func;
})();

export default memoizedSearch;