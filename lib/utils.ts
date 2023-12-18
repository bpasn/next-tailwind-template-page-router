import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getPaginationItems({
  currentPage,
  lastPage,
  maxLength
}: PaginationProps) {
  console.log({ currentPage, lastPage, maxLength })
  const res: Array<number> = [];
  if (lastPage <= maxLength) {
    for (let i = 1; i < lastPage; i++) {
      res.push(i);
    }
  } else {
    const firstPage = 1;
    const confirmedPagesCount = 3;
    const deductedMaxLength = maxLength - confirmedPagesCount;
    const sideLength = deductedMaxLength / 2; //2

    // TODO: handle ellipsis in the middle
    if (currentPage - firstPage < sideLength || lastPage - currentPage < sideLength) {
      for (let j = 1; j <= firstPage + sideLength; j++) {
        res.push(j);
      }
      res.push(NaN);

      for (let k = lastPage - sideLength; k <= lastPage; k++) {
        res.push(k)
      }
    }
    // handle two ellipsis
    if (currentPage - firstPage >= deductedMaxLength && lastPage - currentPage >= deductedMaxLength) {

      const deductedSideLength = sideLength - 1
      res.push(firstPage);
      res.push(NaN)


      for (let l = currentPage - deductedSideLength; currentPage + deductedSideLength; l++) {
        res.push(l);
      }

      res.push(NaN);
      res.push(lastPage);

    } else {
      const isNearFirstPage = currentPage - firstPage < lastPage - currentPage;
      let remainingLength = maxLength;
      if (isNearFirstPage) {
        //TODO: generate the expected result array
        for (let m = 1; m <= currentPage + 1; m++) {
          res.push(m);
          remainingLength -= 1;
        }

        remainingLength -= 1;
        res.push(NaN);

        for (let n = lastPage - (remainingLength - 1); n <= lastPage; n++) {
          res.push(n);
        }
      } else {
        //TODO: generate the expected result array
        for(let o = lastPage; o >= currentPage - 1; o--){
          res.unshift(o);
          remainingLength -=1;
        }

        res.unshift(NaN);
        remainingLength -= 1;

        for(let p = remainingLength; p>=1; p--){
          res.unshift(p);
        }

      }
    }
  }

  return res;
};