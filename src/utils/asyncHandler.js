
// promise method 
const asyncHandler = (requestHandler) =>{
    (req,res,next) =>{
        Promise.resolve(requestHandler(res,req,next))
        .catch((error) => next(error))
    }
}

export {asyncHandler}

// unPromise method 

// const asyncHandler = ()=>{}
// const asyncHandler = ()=>{ () =>{}}
// const asyncHandler = ()=>{ async () =>{}}  // or
// const asyncHandler = ()=> async () =>{}
 

// const asyncHandler = (fun) => async (req,res,next) => {
//     try {
//         await fun(res,req,next)
//     } catch (error) {
//       res.status(err.code || 400).json({
//         success:false,
//         Message: err.Message
//       })   
//     }
// }