goog.provide('cljs.core.async');
cljs.core.async.fn_handler = (function cljs$core$async$fn_handler(var_args){
var G__49126 = arguments.length;
switch (G__49126) {
case 1:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1 = (function (f){
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(f,true);
}));

(cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2 = (function (f,blockable){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async49153 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async49153 = (function (f,blockable,meta49154){
this.f = f;
this.blockable = blockable;
this.meta49154 = meta49154;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async49153.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_49155,meta49154__$1){
var self__ = this;
var _49155__$1 = this;
return (new cljs.core.async.t_cljs$core$async49153(self__.f,self__.blockable,meta49154__$1));
}));

(cljs.core.async.t_cljs$core$async49153.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_49155){
var self__ = this;
var _49155__$1 = this;
return self__.meta49154;
}));

(cljs.core.async.t_cljs$core$async49153.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async49153.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async49153.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.blockable;
}));

(cljs.core.async.t_cljs$core$async49153.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.f;
}));

(cljs.core.async.t_cljs$core$async49153.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"blockable","blockable",-28395259,null),new cljs.core.Symbol(null,"meta49154","meta49154",1230483093,null)], null);
}));

(cljs.core.async.t_cljs$core$async49153.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async49153.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async49153");

(cljs.core.async.t_cljs$core$async49153.cljs$lang$ctorPrWriter = (function (this__4450__auto__,writer__4451__auto__,opt__4452__auto__){
return cljs.core._write(writer__4451__auto__,"cljs.core.async/t_cljs$core$async49153");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async49153.
 */
cljs.core.async.__GT_t_cljs$core$async49153 = (function cljs$core$async$__GT_t_cljs$core$async49153(f__$1,blockable__$1,meta49154){
return (new cljs.core.async.t_cljs$core$async49153(f__$1,blockable__$1,meta49154));
});

}

return (new cljs.core.async.t_cljs$core$async49153(f,blockable,cljs.core.PersistentArrayMap.EMPTY));
}));

(cljs.core.async.fn_handler.cljs$lang$maxFixedArity = 2);

/**
 * Returns a fixed buffer of size n. When full, puts will block/park.
 */
cljs.core.async.buffer = (function cljs$core$async$buffer(n){
return cljs.core.async.impl.buffers.fixed_buffer(n);
});
/**
 * Returns a buffer of size n. When full, puts will complete but
 *   val will be dropped (no transfer).
 */
cljs.core.async.dropping_buffer = (function cljs$core$async$dropping_buffer(n){
return cljs.core.async.impl.buffers.dropping_buffer(n);
});
/**
 * Returns a buffer of size n. When full, puts will complete, and be
 *   buffered, but oldest elements in buffer will be dropped (not
 *   transferred).
 */
cljs.core.async.sliding_buffer = (function cljs$core$async$sliding_buffer(n){
return cljs.core.async.impl.buffers.sliding_buffer(n);
});
/**
 * Returns true if a channel created with buff will never block. That is to say,
 * puts into this buffer will never cause the buffer to be full. 
 */
cljs.core.async.unblocking_buffer_QMARK_ = (function cljs$core$async$unblocking_buffer_QMARK_(buff){
if((!((buff == null)))){
if(((false) || ((cljs.core.PROTOCOL_SENTINEL === buff.cljs$core$async$impl$protocols$UnblockingBuffer$)))){
return true;
} else {
if((!buff.cljs$lang$protocol_mask$partition$)){
return cljs.core.native_satisfies_QMARK_(cljs.core.async.impl.protocols.UnblockingBuffer,buff);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_(cljs.core.async.impl.protocols.UnblockingBuffer,buff);
}
});
/**
 * Creates a channel with an optional buffer, an optional transducer (like (map f),
 *   (filter p) etc or a composition thereof), and an optional exception handler.
 *   If buf-or-n is a number, will create and use a fixed buffer of that size. If a
 *   transducer is supplied a buffer must be specified. ex-handler must be a
 *   fn of one argument - if an exception occurs during transformation it will be called
 *   with the thrown value as an argument, and any non-nil return value will be placed
 *   in the channel.
 */
cljs.core.async.chan = (function cljs$core$async$chan(var_args){
var G__49218 = arguments.length;
switch (G__49218) {
case 0:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(null);
}));

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1 = (function (buf_or_n){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3(buf_or_n,null,null);
}));

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2 = (function (buf_or_n,xform){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3(buf_or_n,xform,null);
}));

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3 = (function (buf_or_n,xform,ex_handler){
var buf_or_n__$1 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(buf_or_n,(0)))?null:buf_or_n);
if(cljs.core.truth_(xform)){
if(cljs.core.truth_(buf_or_n__$1)){
} else {
throw (new Error(["Assert failed: ","buffer must be supplied when transducer is","\n","buf-or-n"].join('')));
}
} else {
}

return cljs.core.async.impl.channels.chan.cljs$core$IFn$_invoke$arity$3(((typeof buf_or_n__$1 === 'number')?cljs.core.async.buffer(buf_or_n__$1):buf_or_n__$1),xform,ex_handler);
}));

(cljs.core.async.chan.cljs$lang$maxFixedArity = 3);

/**
 * Creates a promise channel with an optional transducer, and an optional
 *   exception-handler. A promise channel can take exactly one value that consumers
 *   will receive. Once full, puts complete but val is dropped (no transfer).
 *   Consumers will block until either a value is placed in the channel or the
 *   channel is closed. See chan for the semantics of xform and ex-handler.
 */
cljs.core.async.promise_chan = (function cljs$core$async$promise_chan(var_args){
var G__49233 = arguments.length;
switch (G__49233) {
case 0:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1(null);
}));

(cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1 = (function (xform){
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2(xform,null);
}));

(cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2 = (function (xform,ex_handler){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3(cljs.core.async.impl.buffers.promise_buffer(),xform,ex_handler);
}));

(cljs.core.async.promise_chan.cljs$lang$maxFixedArity = 2);

/**
 * Returns a channel that will close after msecs
 */
cljs.core.async.timeout = (function cljs$core$async$timeout(msecs){
return cljs.core.async.impl.timers.timeout(msecs);
});
/**
 * takes a val from port. Must be called inside a (go ...) block. Will
 *   return nil if closed. Will park if nothing is available.
 *   Returns true unless port is already closed
 */
cljs.core.async._LT__BANG_ = (function cljs$core$async$_LT__BANG_(port){
throw (new Error("<! used not in (go ...) block"));
});
/**
 * Asynchronously takes a val from port, passing to fn1. Will pass nil
 * if closed. If on-caller? (default true) is true, and value is
 * immediately available, will call fn1 on calling thread.
 * Returns nil.
 */
cljs.core.async.take_BANG_ = (function cljs$core$async$take_BANG_(var_args){
var G__49242 = arguments.length;
switch (G__49242) {
case 2:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,fn1){
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3(port,fn1,true);
}));

(cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,fn1,on_caller_QMARK_){
var ret = cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(fn1));
if(cljs.core.truth_(ret)){
var val_51979 = cljs.core.deref(ret);
if(cljs.core.truth_(on_caller_QMARK_)){
(fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(val_51979) : fn1.call(null,val_51979));
} else {
cljs.core.async.impl.dispatch.run((function (){
return (fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(val_51979) : fn1.call(null,val_51979));
}));
}
} else {
}

return null;
}));

(cljs.core.async.take_BANG_.cljs$lang$maxFixedArity = 3);

cljs.core.async.nop = (function cljs$core$async$nop(_){
return null;
});
cljs.core.async.fhnop = cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(cljs.core.async.nop);
/**
 * puts a val into port. nil values are not allowed. Must be called
 *   inside a (go ...) block. Will park if no buffer space is available.
 *   Returns true unless port is already closed.
 */
cljs.core.async._GT__BANG_ = (function cljs$core$async$_GT__BANG_(port,val){
throw (new Error(">! used not in (go ...) block"));
});
/**
 * Asynchronously puts a val into port, calling fn1 (if supplied) when
 * complete. nil values are not allowed. Will throw if closed. If
 * on-caller? (default true) is true, and the put is immediately
 * accepted, will call fn1 on calling thread.  Returns nil.
 */
cljs.core.async.put_BANG_ = (function cljs$core$async$put_BANG_(var_args){
var G__49245 = arguments.length;
switch (G__49245) {
case 2:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,val){
var temp__5751__auto__ = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fhnop);
if(cljs.core.truth_(temp__5751__auto__)){
var ret = temp__5751__auto__;
return cljs.core.deref(ret);
} else {
return true;
}
}));

(cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,val,fn1){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4(port,val,fn1,true);
}));

(cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (port,val,fn1,on_caller_QMARK_){
var temp__5751__auto__ = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(fn1));
if(cljs.core.truth_(temp__5751__auto__)){
var retb = temp__5751__auto__;
var ret = cljs.core.deref(retb);
if(cljs.core.truth_(on_caller_QMARK_)){
(fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(ret) : fn1.call(null,ret));
} else {
cljs.core.async.impl.dispatch.run((function (){
return (fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(ret) : fn1.call(null,ret));
}));
}

return ret;
} else {
return true;
}
}));

(cljs.core.async.put_BANG_.cljs$lang$maxFixedArity = 4);

cljs.core.async.close_BANG_ = (function cljs$core$async$close_BANG_(port){
return cljs.core.async.impl.protocols.close_BANG_(port);
});
cljs.core.async.random_array = (function cljs$core$async$random_array(n){
var a = (new Array(n));
var n__4695__auto___51990 = n;
var x_51991 = (0);
while(true){
if((x_51991 < n__4695__auto___51990)){
(a[x_51991] = x_51991);

var G__51992 = (x_51991 + (1));
x_51991 = G__51992;
continue;
} else {
}
break;
}

goog.array.shuffle(a);

return a;
});
cljs.core.async.alt_flag = (function cljs$core$async$alt_flag(){
var flag = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(true);
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async49250 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async49250 = (function (flag,meta49251){
this.flag = flag;
this.meta49251 = meta49251;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async49250.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_49252,meta49251__$1){
var self__ = this;
var _49252__$1 = this;
return (new cljs.core.async.t_cljs$core$async49250(self__.flag,meta49251__$1));
}));

(cljs.core.async.t_cljs$core$async49250.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_49252){
var self__ = this;
var _49252__$1 = this;
return self__.meta49251;
}));

(cljs.core.async.t_cljs$core$async49250.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async49250.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.deref(self__.flag);
}));

(cljs.core.async.t_cljs$core$async49250.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async49250.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.flag,null);

return true;
}));

(cljs.core.async.t_cljs$core$async49250.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"meta49251","meta49251",1612383902,null)], null);
}));

(cljs.core.async.t_cljs$core$async49250.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async49250.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async49250");

(cljs.core.async.t_cljs$core$async49250.cljs$lang$ctorPrWriter = (function (this__4450__auto__,writer__4451__auto__,opt__4452__auto__){
return cljs.core._write(writer__4451__auto__,"cljs.core.async/t_cljs$core$async49250");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async49250.
 */
cljs.core.async.__GT_t_cljs$core$async49250 = (function cljs$core$async$alt_flag_$___GT_t_cljs$core$async49250(flag__$1,meta49251){
return (new cljs.core.async.t_cljs$core$async49250(flag__$1,meta49251));
});

}

return (new cljs.core.async.t_cljs$core$async49250(flag,cljs.core.PersistentArrayMap.EMPTY));
});
cljs.core.async.alt_handler = (function cljs$core$async$alt_handler(flag,cb){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async49259 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async49259 = (function (flag,cb,meta49260){
this.flag = flag;
this.cb = cb;
this.meta49260 = meta49260;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async49259.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_49261,meta49260__$1){
var self__ = this;
var _49261__$1 = this;
return (new cljs.core.async.t_cljs$core$async49259(self__.flag,self__.cb,meta49260__$1));
}));

(cljs.core.async.t_cljs$core$async49259.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_49261){
var self__ = this;
var _49261__$1 = this;
return self__.meta49260;
}));

(cljs.core.async.t_cljs$core$async49259.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async49259.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.active_QMARK_(self__.flag);
}));

(cljs.core.async.t_cljs$core$async49259.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async49259.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.async.impl.protocols.commit(self__.flag);

return self__.cb;
}));

(cljs.core.async.t_cljs$core$async49259.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null),new cljs.core.Symbol(null,"meta49260","meta49260",903751506,null)], null);
}));

(cljs.core.async.t_cljs$core$async49259.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async49259.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async49259");

(cljs.core.async.t_cljs$core$async49259.cljs$lang$ctorPrWriter = (function (this__4450__auto__,writer__4451__auto__,opt__4452__auto__){
return cljs.core._write(writer__4451__auto__,"cljs.core.async/t_cljs$core$async49259");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async49259.
 */
cljs.core.async.__GT_t_cljs$core$async49259 = (function cljs$core$async$alt_handler_$___GT_t_cljs$core$async49259(flag__$1,cb__$1,meta49260){
return (new cljs.core.async.t_cljs$core$async49259(flag__$1,cb__$1,meta49260));
});

}

return (new cljs.core.async.t_cljs$core$async49259(flag,cb,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * returns derefable [val port] if immediate, nil if enqueued
 */
cljs.core.async.do_alts = (function cljs$core$async$do_alts(fret,ports,opts){
if((cljs.core.count(ports) > (0))){
} else {
throw (new Error(["Assert failed: ","alts must have at least one channel operation","\n","(pos? (count ports))"].join('')));
}

var flag = cljs.core.async.alt_flag();
var n = cljs.core.count(ports);
var idxs = cljs.core.async.random_array(n);
var priority = new cljs.core.Keyword(null,"priority","priority",1431093715).cljs$core$IFn$_invoke$arity$1(opts);
var ret = (function (){var i = (0);
while(true){
if((i < n)){
var idx = (cljs.core.truth_(priority)?i:(idxs[i]));
var port = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(ports,idx);
var wport = ((cljs.core.vector_QMARK_(port))?(port.cljs$core$IFn$_invoke$arity$1 ? port.cljs$core$IFn$_invoke$arity$1((0)) : port.call(null,(0))):null);
var vbox = (cljs.core.truth_(wport)?(function (){var val = (port.cljs$core$IFn$_invoke$arity$1 ? port.cljs$core$IFn$_invoke$arity$1((1)) : port.call(null,(1)));
return cljs.core.async.impl.protocols.put_BANG_(wport,val,cljs.core.async.alt_handler(flag,((function (i,val,idx,port,wport,flag,n,idxs,priority){
return (function (p1__49284_SHARP_){
var G__49300 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__49284_SHARP_,wport], null);
return (fret.cljs$core$IFn$_invoke$arity$1 ? fret.cljs$core$IFn$_invoke$arity$1(G__49300) : fret.call(null,G__49300));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.alt_handler(flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__49285_SHARP_){
var G__49301 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__49285_SHARP_,port], null);
return (fret.cljs$core$IFn$_invoke$arity$1 ? fret.cljs$core$IFn$_invoke$arity$1(G__49301) : fret.call(null,G__49301));
});})(i,idx,port,wport,flag,n,idxs,priority))
)));
if(cljs.core.truth_(vbox)){
return cljs.core.async.impl.channels.box(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref(vbox),(function (){var or__4212__auto__ = wport;
if(cljs.core.truth_(or__4212__auto__)){
return or__4212__auto__;
} else {
return port;
}
})()], null));
} else {
var G__51994 = (i + (1));
i = G__51994;
continue;
}
} else {
return null;
}
break;
}
})();
var or__4212__auto__ = ret;
if(cljs.core.truth_(or__4212__auto__)){
return or__4212__auto__;
} else {
if(cljs.core.contains_QMARK_(opts,new cljs.core.Keyword(null,"default","default",-1987822328))){
var temp__5753__auto__ = (function (){var and__4210__auto__ = flag.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1(null);
if(cljs.core.truth_(and__4210__auto__)){
return flag.cljs$core$async$impl$protocols$Handler$commit$arity$1(null);
} else {
return and__4210__auto__;
}
})();
if(cljs.core.truth_(temp__5753__auto__)){
var got = temp__5753__auto__;
return cljs.core.async.impl.channels.box(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"default","default",-1987822328).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"default","default",-1987822328)], null));
} else {
return null;
}
} else {
return null;
}
}
});
/**
 * Completes at most one of several channel operations. Must be called
 * inside a (go ...) block. ports is a vector of channel endpoints,
 * which can be either a channel to take from or a vector of
 *   [channel-to-put-to val-to-put], in any combination. Takes will be
 *   made as if by <!, and puts will be made as if by >!. Unless
 *   the :priority option is true, if more than one port operation is
 *   ready a non-deterministic choice will be made. If no operation is
 *   ready and a :default value is supplied, [default-val :default] will
 *   be returned, otherwise alts! will park until the first operation to
 *   become ready completes. Returns [val port] of the completed
 *   operation, where val is the value taken for takes, and a
 *   boolean (true unless already closed, as per put!) for puts.
 * 
 *   opts are passed as :key val ... Supported options:
 * 
 *   :default val - the value to use if none of the operations are immediately ready
 *   :priority true - (default nil) when true, the operations will be tried in order.
 * 
 *   Note: there is no guarantee that the port exps or val exprs will be
 *   used, nor in what order should they be, so they should not be
 *   depended upon for side effects.
 */
cljs.core.async.alts_BANG_ = (function cljs$core$async$alts_BANG_(var_args){
var args__4824__auto__ = [];
var len__4818__auto___51998 = arguments.length;
var i__4819__auto___51999 = (0);
while(true){
if((i__4819__auto___51999 < len__4818__auto___51998)){
args__4824__auto__.push((arguments[i__4819__auto___51999]));

var G__52000 = (i__4819__auto___51999 + (1));
i__4819__auto___51999 = G__52000;
continue;
} else {
}
break;
}

var argseq__4825__auto__ = ((((1) < args__4824__auto__.length))?(new cljs.core.IndexedSeq(args__4824__auto__.slice((1)),(0),null)):null);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__4825__auto__);
});

(cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ports,p__49316){
var map__49317 = p__49316;
var map__49317__$1 = cljs.core.__destructure_map(map__49317);
var opts = map__49317__$1;
throw (new Error("alts! used not in (go ...) block"));
}));

(cljs.core.async.alts_BANG_.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(cljs.core.async.alts_BANG_.cljs$lang$applyTo = (function (seq49302){
var G__49303 = cljs.core.first(seq49302);
var seq49302__$1 = cljs.core.next(seq49302);
var self__4805__auto__ = this;
return self__4805__auto__.cljs$core$IFn$_invoke$arity$variadic(G__49303,seq49302__$1);
}));

/**
 * Puts a val into port if it's possible to do so immediately.
 *   nil values are not allowed. Never blocks. Returns true if offer succeeds.
 */
cljs.core.async.offer_BANG_ = (function cljs$core$async$offer_BANG_(port,val){
var ret = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return cljs.core.deref(ret);
} else {
return null;
}
});
/**
 * Takes a val from port if it's possible to do so immediately.
 *   Never blocks. Returns value if successful, nil otherwise.
 */
cljs.core.async.poll_BANG_ = (function cljs$core$async$poll_BANG_(port){
var ret = cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return cljs.core.deref(ret);
} else {
return null;
}
});
/**
 * Takes elements from the from channel and supplies them to the to
 * channel. By default, the to channel will be closed when the from
 * channel closes, but can be determined by the close?  parameter. Will
 * stop consuming the from channel if the to channel closes
 */
cljs.core.async.pipe = (function cljs$core$async$pipe(var_args){
var G__49337 = arguments.length;
switch (G__49337) {
case 2:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2 = (function (from,to){
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3(from,to,true);
}));

(cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3 = (function (from,to,close_QMARK_){
var c__49005__auto___52006 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__49006__auto__ = (function (){var switch__48629__auto__ = (function (state_49380){
var state_val_49381 = (state_49380[(1)]);
if((state_val_49381 === (7))){
var inst_49374 = (state_49380[(2)]);
var state_49380__$1 = state_49380;
var statearr_49385_52009 = state_49380__$1;
(statearr_49385_52009[(2)] = inst_49374);

(statearr_49385_52009[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49381 === (1))){
var state_49380__$1 = state_49380;
var statearr_49392_52010 = state_49380__$1;
(statearr_49392_52010[(2)] = null);

(statearr_49392_52010[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49381 === (4))){
var inst_49357 = (state_49380[(7)]);
var inst_49357__$1 = (state_49380[(2)]);
var inst_49358 = (inst_49357__$1 == null);
var state_49380__$1 = (function (){var statearr_49397 = state_49380;
(statearr_49397[(7)] = inst_49357__$1);

return statearr_49397;
})();
if(cljs.core.truth_(inst_49358)){
var statearr_49398_52011 = state_49380__$1;
(statearr_49398_52011[(1)] = (5));

} else {
var statearr_49399_52012 = state_49380__$1;
(statearr_49399_52012[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49381 === (13))){
var state_49380__$1 = state_49380;
var statearr_49408_52013 = state_49380__$1;
(statearr_49408_52013[(2)] = null);

(statearr_49408_52013[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49381 === (6))){
var inst_49357 = (state_49380[(7)]);
var state_49380__$1 = state_49380;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_49380__$1,(11),to,inst_49357);
} else {
if((state_val_49381 === (3))){
var inst_49376 = (state_49380[(2)]);
var state_49380__$1 = state_49380;
return cljs.core.async.impl.ioc_helpers.return_chan(state_49380__$1,inst_49376);
} else {
if((state_val_49381 === (12))){
var state_49380__$1 = state_49380;
var statearr_49418_52014 = state_49380__$1;
(statearr_49418_52014[(2)] = null);

(statearr_49418_52014[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49381 === (2))){
var state_49380__$1 = state_49380;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_49380__$1,(4),from);
} else {
if((state_val_49381 === (11))){
var inst_49367 = (state_49380[(2)]);
var state_49380__$1 = state_49380;
if(cljs.core.truth_(inst_49367)){
var statearr_49426_52015 = state_49380__$1;
(statearr_49426_52015[(1)] = (12));

} else {
var statearr_49427_52016 = state_49380__$1;
(statearr_49427_52016[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49381 === (9))){
var state_49380__$1 = state_49380;
var statearr_49429_52017 = state_49380__$1;
(statearr_49429_52017[(2)] = null);

(statearr_49429_52017[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49381 === (5))){
var state_49380__$1 = state_49380;
if(cljs.core.truth_(close_QMARK_)){
var statearr_49430_52018 = state_49380__$1;
(statearr_49430_52018[(1)] = (8));

} else {
var statearr_49432_52019 = state_49380__$1;
(statearr_49432_52019[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49381 === (14))){
var inst_49372 = (state_49380[(2)]);
var state_49380__$1 = state_49380;
var statearr_49433_52020 = state_49380__$1;
(statearr_49433_52020[(2)] = inst_49372);

(statearr_49433_52020[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49381 === (10))){
var inst_49364 = (state_49380[(2)]);
var state_49380__$1 = state_49380;
var statearr_49437_52022 = state_49380__$1;
(statearr_49437_52022[(2)] = inst_49364);

(statearr_49437_52022[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49381 === (8))){
var inst_49361 = cljs.core.async.close_BANG_(to);
var state_49380__$1 = state_49380;
var statearr_49439_52023 = state_49380__$1;
(statearr_49439_52023[(2)] = inst_49361);

(statearr_49439_52023[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__48630__auto__ = null;
var cljs$core$async$state_machine__48630__auto____0 = (function (){
var statearr_49442 = [null,null,null,null,null,null,null,null];
(statearr_49442[(0)] = cljs$core$async$state_machine__48630__auto__);

(statearr_49442[(1)] = (1));

return statearr_49442;
});
var cljs$core$async$state_machine__48630__auto____1 = (function (state_49380){
while(true){
var ret_value__48631__auto__ = (function (){try{while(true){
var result__48632__auto__ = switch__48629__auto__(state_49380);
if(cljs.core.keyword_identical_QMARK_(result__48632__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__48632__auto__;
}
break;
}
}catch (e49443){var ex__48633__auto__ = e49443;
var statearr_49444_52024 = state_49380;
(statearr_49444_52024[(2)] = ex__48633__auto__);


if(cljs.core.seq((state_49380[(4)]))){
var statearr_49446_52025 = state_49380;
(statearr_49446_52025[(1)] = cljs.core.first((state_49380[(4)])));

} else {
throw ex__48633__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__48631__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__52026 = state_49380;
state_49380 = G__52026;
continue;
} else {
return ret_value__48631__auto__;
}
break;
}
});
cljs$core$async$state_machine__48630__auto__ = function(state_49380){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__48630__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__48630__auto____1.call(this,state_49380);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__48630__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__48630__auto____0;
cljs$core$async$state_machine__48630__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__48630__auto____1;
return cljs$core$async$state_machine__48630__auto__;
})()
})();
var state__49007__auto__ = (function (){var statearr_49447 = f__49006__auto__();
(statearr_49447[(6)] = c__49005__auto___52006);

return statearr_49447;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__49007__auto__);
}));


return to;
}));

(cljs.core.async.pipe.cljs$lang$maxFixedArity = 3);

cljs.core.async.pipeline_STAR_ = (function cljs$core$async$pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,type){
if((n > (0))){
} else {
throw (new Error("Assert failed: (pos? n)"));
}

var jobs = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(n);
var results = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(n);
var process = (function (p__49475){
var vec__49476 = p__49475;
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__49476,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__49476,(1),null);
var job = vec__49476;
if((job == null)){
cljs.core.async.close_BANG_(results);

return null;
} else {
var res = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((1),xf,ex_handler);
var c__49005__auto___52030 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__49006__auto__ = (function (){var switch__48629__auto__ = (function (state_49488){
var state_val_49489 = (state_49488[(1)]);
if((state_val_49489 === (1))){
var state_49488__$1 = state_49488;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_49488__$1,(2),res,v);
} else {
if((state_val_49489 === (2))){
var inst_49481 = (state_49488[(2)]);
var inst_49482 = cljs.core.async.close_BANG_(res);
var state_49488__$1 = (function (){var statearr_49494 = state_49488;
(statearr_49494[(7)] = inst_49481);

return statearr_49494;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_49488__$1,inst_49482);
} else {
return null;
}
}
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__48630__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__48630__auto____0 = (function (){
var statearr_49503 = [null,null,null,null,null,null,null,null];
(statearr_49503[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__48630__auto__);

(statearr_49503[(1)] = (1));

return statearr_49503;
});
var cljs$core$async$pipeline_STAR__$_state_machine__48630__auto____1 = (function (state_49488){
while(true){
var ret_value__48631__auto__ = (function (){try{while(true){
var result__48632__auto__ = switch__48629__auto__(state_49488);
if(cljs.core.keyword_identical_QMARK_(result__48632__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__48632__auto__;
}
break;
}
}catch (e49510){var ex__48633__auto__ = e49510;
var statearr_49511_52033 = state_49488;
(statearr_49511_52033[(2)] = ex__48633__auto__);


if(cljs.core.seq((state_49488[(4)]))){
var statearr_49517_52034 = state_49488;
(statearr_49517_52034[(1)] = cljs.core.first((state_49488[(4)])));

} else {
throw ex__48633__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__48631__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__52035 = state_49488;
state_49488 = G__52035;
continue;
} else {
return ret_value__48631__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__48630__auto__ = function(state_49488){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__48630__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__48630__auto____1.call(this,state_49488);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__48630__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__48630__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__48630__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__48630__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__48630__auto__;
})()
})();
var state__49007__auto__ = (function (){var statearr_49527 = f__49006__auto__();
(statearr_49527[(6)] = c__49005__auto___52030);

return statearr_49527;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__49007__auto__);
}));


cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(p,res);

return true;
}
});
var async = (function (p__49529){
var vec__49530 = p__49529;
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__49530,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__49530,(1),null);
var job = vec__49530;
if((job == null)){
cljs.core.async.close_BANG_(results);

return null;
} else {
var res = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
(xf.cljs$core$IFn$_invoke$arity$2 ? xf.cljs$core$IFn$_invoke$arity$2(v,res) : xf.call(null,v,res));

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(p,res);

return true;
}
});
var n__4695__auto___52036 = n;
var __52037 = (0);
while(true){
if((__52037 < n__4695__auto___52036)){
var G__49538_52039 = type;
var G__49538_52040__$1 = (((G__49538_52039 instanceof cljs.core.Keyword))?G__49538_52039.fqn:null);
switch (G__49538_52040__$1) {
case "compute":
var c__49005__auto___52045 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (__52037,c__49005__auto___52045,G__49538_52039,G__49538_52040__$1,n__4695__auto___52036,jobs,results,process,async){
return (function (){
var f__49006__auto__ = (function (){var switch__48629__auto__ = ((function (__52037,c__49005__auto___52045,G__49538_52039,G__49538_52040__$1,n__4695__auto___52036,jobs,results,process,async){
return (function (state_49551){
var state_val_49552 = (state_49551[(1)]);
if((state_val_49552 === (1))){
var state_49551__$1 = state_49551;
var statearr_49561_52047 = state_49551__$1;
(statearr_49561_52047[(2)] = null);

(statearr_49561_52047[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49552 === (2))){
var state_49551__$1 = state_49551;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_49551__$1,(4),jobs);
} else {
if((state_val_49552 === (3))){
var inst_49549 = (state_49551[(2)]);
var state_49551__$1 = state_49551;
return cljs.core.async.impl.ioc_helpers.return_chan(state_49551__$1,inst_49549);
} else {
if((state_val_49552 === (4))){
var inst_49541 = (state_49551[(2)]);
var inst_49542 = process(inst_49541);
var state_49551__$1 = state_49551;
if(cljs.core.truth_(inst_49542)){
var statearr_49588_52054 = state_49551__$1;
(statearr_49588_52054[(1)] = (5));

} else {
var statearr_49591_52055 = state_49551__$1;
(statearr_49591_52055[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49552 === (5))){
var state_49551__$1 = state_49551;
var statearr_49597_52056 = state_49551__$1;
(statearr_49597_52056[(2)] = null);

(statearr_49597_52056[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49552 === (6))){
var state_49551__$1 = state_49551;
var statearr_49603_52057 = state_49551__$1;
(statearr_49603_52057[(2)] = null);

(statearr_49603_52057[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49552 === (7))){
var inst_49547 = (state_49551[(2)]);
var state_49551__$1 = state_49551;
var statearr_49604_52058 = state_49551__$1;
(statearr_49604_52058[(2)] = inst_49547);

(statearr_49604_52058[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});})(__52037,c__49005__auto___52045,G__49538_52039,G__49538_52040__$1,n__4695__auto___52036,jobs,results,process,async))
;
return ((function (__52037,switch__48629__auto__,c__49005__auto___52045,G__49538_52039,G__49538_52040__$1,n__4695__auto___52036,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__48630__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__48630__auto____0 = (function (){
var statearr_49609 = [null,null,null,null,null,null,null];
(statearr_49609[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__48630__auto__);

(statearr_49609[(1)] = (1));

return statearr_49609;
});
var cljs$core$async$pipeline_STAR__$_state_machine__48630__auto____1 = (function (state_49551){
while(true){
var ret_value__48631__auto__ = (function (){try{while(true){
var result__48632__auto__ = switch__48629__auto__(state_49551);
if(cljs.core.keyword_identical_QMARK_(result__48632__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__48632__auto__;
}
break;
}
}catch (e49616){var ex__48633__auto__ = e49616;
var statearr_49617_52062 = state_49551;
(statearr_49617_52062[(2)] = ex__48633__auto__);


if(cljs.core.seq((state_49551[(4)]))){
var statearr_49623_52063 = state_49551;
(statearr_49623_52063[(1)] = cljs.core.first((state_49551[(4)])));

} else {
throw ex__48633__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__48631__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__52064 = state_49551;
state_49551 = G__52064;
continue;
} else {
return ret_value__48631__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__48630__auto__ = function(state_49551){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__48630__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__48630__auto____1.call(this,state_49551);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__48630__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__48630__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__48630__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__48630__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__48630__auto__;
})()
;})(__52037,switch__48629__auto__,c__49005__auto___52045,G__49538_52039,G__49538_52040__$1,n__4695__auto___52036,jobs,results,process,async))
})();
var state__49007__auto__ = (function (){var statearr_49644 = f__49006__auto__();
(statearr_49644[(6)] = c__49005__auto___52045);

return statearr_49644;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__49007__auto__);
});})(__52037,c__49005__auto___52045,G__49538_52039,G__49538_52040__$1,n__4695__auto___52036,jobs,results,process,async))
);


break;
case "async":
var c__49005__auto___52065 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (__52037,c__49005__auto___52065,G__49538_52039,G__49538_52040__$1,n__4695__auto___52036,jobs,results,process,async){
return (function (){
var f__49006__auto__ = (function (){var switch__48629__auto__ = ((function (__52037,c__49005__auto___52065,G__49538_52039,G__49538_52040__$1,n__4695__auto___52036,jobs,results,process,async){
return (function (state_49676){
var state_val_49677 = (state_49676[(1)]);
if((state_val_49677 === (1))){
var state_49676__$1 = state_49676;
var statearr_49687_52066 = state_49676__$1;
(statearr_49687_52066[(2)] = null);

(statearr_49687_52066[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49677 === (2))){
var state_49676__$1 = state_49676;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_49676__$1,(4),jobs);
} else {
if((state_val_49677 === (3))){
var inst_49674 = (state_49676[(2)]);
var state_49676__$1 = state_49676;
return cljs.core.async.impl.ioc_helpers.return_chan(state_49676__$1,inst_49674);
} else {
if((state_val_49677 === (4))){
var inst_49656 = (state_49676[(2)]);
var inst_49657 = async(inst_49656);
var state_49676__$1 = state_49676;
if(cljs.core.truth_(inst_49657)){
var statearr_49691_52067 = state_49676__$1;
(statearr_49691_52067[(1)] = (5));

} else {
var statearr_49693_52068 = state_49676__$1;
(statearr_49693_52068[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49677 === (5))){
var state_49676__$1 = state_49676;
var statearr_49697_52069 = state_49676__$1;
(statearr_49697_52069[(2)] = null);

(statearr_49697_52069[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49677 === (6))){
var state_49676__$1 = state_49676;
var statearr_49698_52071 = state_49676__$1;
(statearr_49698_52071[(2)] = null);

(statearr_49698_52071[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49677 === (7))){
var inst_49668 = (state_49676[(2)]);
var state_49676__$1 = state_49676;
var statearr_49699_52073 = state_49676__$1;
(statearr_49699_52073[(2)] = inst_49668);

(statearr_49699_52073[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});})(__52037,c__49005__auto___52065,G__49538_52039,G__49538_52040__$1,n__4695__auto___52036,jobs,results,process,async))
;
return ((function (__52037,switch__48629__auto__,c__49005__auto___52065,G__49538_52039,G__49538_52040__$1,n__4695__auto___52036,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__48630__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__48630__auto____0 = (function (){
var statearr_49701 = [null,null,null,null,null,null,null];
(statearr_49701[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__48630__auto__);

(statearr_49701[(1)] = (1));

return statearr_49701;
});
var cljs$core$async$pipeline_STAR__$_state_machine__48630__auto____1 = (function (state_49676){
while(true){
var ret_value__48631__auto__ = (function (){try{while(true){
var result__48632__auto__ = switch__48629__auto__(state_49676);
if(cljs.core.keyword_identical_QMARK_(result__48632__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__48632__auto__;
}
break;
}
}catch (e49702){var ex__48633__auto__ = e49702;
var statearr_49703_52074 = state_49676;
(statearr_49703_52074[(2)] = ex__48633__auto__);


if(cljs.core.seq((state_49676[(4)]))){
var statearr_49704_52075 = state_49676;
(statearr_49704_52075[(1)] = cljs.core.first((state_49676[(4)])));

} else {
throw ex__48633__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__48631__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__52076 = state_49676;
state_49676 = G__52076;
continue;
} else {
return ret_value__48631__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__48630__auto__ = function(state_49676){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__48630__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__48630__auto____1.call(this,state_49676);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__48630__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__48630__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__48630__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__48630__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__48630__auto__;
})()
;})(__52037,switch__48629__auto__,c__49005__auto___52065,G__49538_52039,G__49538_52040__$1,n__4695__auto___52036,jobs,results,process,async))
})();
var state__49007__auto__ = (function (){var statearr_49705 = f__49006__auto__();
(statearr_49705[(6)] = c__49005__auto___52065);

return statearr_49705;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__49007__auto__);
});})(__52037,c__49005__auto___52065,G__49538_52039,G__49538_52040__$1,n__4695__auto___52036,jobs,results,process,async))
);


break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__49538_52040__$1)].join('')));

}

var G__52078 = (__52037 + (1));
__52037 = G__52078;
continue;
} else {
}
break;
}

var c__49005__auto___52079 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__49006__auto__ = (function (){var switch__48629__auto__ = (function (state_49733){
var state_val_49734 = (state_49733[(1)]);
if((state_val_49734 === (7))){
var inst_49729 = (state_49733[(2)]);
var state_49733__$1 = state_49733;
var statearr_49736_52080 = state_49733__$1;
(statearr_49736_52080[(2)] = inst_49729);

(statearr_49736_52080[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49734 === (1))){
var state_49733__$1 = state_49733;
var statearr_49740_52085 = state_49733__$1;
(statearr_49740_52085[(2)] = null);

(statearr_49740_52085[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49734 === (4))){
var inst_49714 = (state_49733[(7)]);
var inst_49714__$1 = (state_49733[(2)]);
var inst_49715 = (inst_49714__$1 == null);
var state_49733__$1 = (function (){var statearr_49747 = state_49733;
(statearr_49747[(7)] = inst_49714__$1);

return statearr_49747;
})();
if(cljs.core.truth_(inst_49715)){
var statearr_49748_52086 = state_49733__$1;
(statearr_49748_52086[(1)] = (5));

} else {
var statearr_49750_52087 = state_49733__$1;
(statearr_49750_52087[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49734 === (6))){
var inst_49714 = (state_49733[(7)]);
var inst_49719 = (state_49733[(8)]);
var inst_49719__$1 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var inst_49720 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_49721 = [inst_49714,inst_49719__$1];
var inst_49722 = (new cljs.core.PersistentVector(null,2,(5),inst_49720,inst_49721,null));
var state_49733__$1 = (function (){var statearr_49755 = state_49733;
(statearr_49755[(8)] = inst_49719__$1);

return statearr_49755;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_49733__$1,(8),jobs,inst_49722);
} else {
if((state_val_49734 === (3))){
var inst_49731 = (state_49733[(2)]);
var state_49733__$1 = state_49733;
return cljs.core.async.impl.ioc_helpers.return_chan(state_49733__$1,inst_49731);
} else {
if((state_val_49734 === (2))){
var state_49733__$1 = state_49733;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_49733__$1,(4),from);
} else {
if((state_val_49734 === (9))){
var inst_49726 = (state_49733[(2)]);
var state_49733__$1 = (function (){var statearr_49756 = state_49733;
(statearr_49756[(9)] = inst_49726);

return statearr_49756;
})();
var statearr_49757_52091 = state_49733__$1;
(statearr_49757_52091[(2)] = null);

(statearr_49757_52091[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49734 === (5))){
var inst_49717 = cljs.core.async.close_BANG_(jobs);
var state_49733__$1 = state_49733;
var statearr_49758_52093 = state_49733__$1;
(statearr_49758_52093[(2)] = inst_49717);

(statearr_49758_52093[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49734 === (8))){
var inst_49719 = (state_49733[(8)]);
var inst_49724 = (state_49733[(2)]);
var state_49733__$1 = (function (){var statearr_49763 = state_49733;
(statearr_49763[(10)] = inst_49724);

return statearr_49763;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_49733__$1,(9),results,inst_49719);
} else {
return null;
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__48630__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__48630__auto____0 = (function (){
var statearr_49768 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_49768[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__48630__auto__);

(statearr_49768[(1)] = (1));

return statearr_49768;
});
var cljs$core$async$pipeline_STAR__$_state_machine__48630__auto____1 = (function (state_49733){
while(true){
var ret_value__48631__auto__ = (function (){try{while(true){
var result__48632__auto__ = switch__48629__auto__(state_49733);
if(cljs.core.keyword_identical_QMARK_(result__48632__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__48632__auto__;
}
break;
}
}catch (e49769){var ex__48633__auto__ = e49769;
var statearr_49770_52100 = state_49733;
(statearr_49770_52100[(2)] = ex__48633__auto__);


if(cljs.core.seq((state_49733[(4)]))){
var statearr_49771_52102 = state_49733;
(statearr_49771_52102[(1)] = cljs.core.first((state_49733[(4)])));

} else {
throw ex__48633__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__48631__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__52103 = state_49733;
state_49733 = G__52103;
continue;
} else {
return ret_value__48631__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__48630__auto__ = function(state_49733){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__48630__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__48630__auto____1.call(this,state_49733);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__48630__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__48630__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__48630__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__48630__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__48630__auto__;
})()
})();
var state__49007__auto__ = (function (){var statearr_49775 = f__49006__auto__();
(statearr_49775[(6)] = c__49005__auto___52079);

return statearr_49775;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__49007__auto__);
}));


var c__49005__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__49006__auto__ = (function (){var switch__48629__auto__ = (function (state_49816){
var state_val_49817 = (state_49816[(1)]);
if((state_val_49817 === (7))){
var inst_49812 = (state_49816[(2)]);
var state_49816__$1 = state_49816;
var statearr_49821_52105 = state_49816__$1;
(statearr_49821_52105[(2)] = inst_49812);

(statearr_49821_52105[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49817 === (20))){
var state_49816__$1 = state_49816;
var statearr_49823_52106 = state_49816__$1;
(statearr_49823_52106[(2)] = null);

(statearr_49823_52106[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49817 === (1))){
var state_49816__$1 = state_49816;
var statearr_49824_52107 = state_49816__$1;
(statearr_49824_52107[(2)] = null);

(statearr_49824_52107[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49817 === (4))){
var inst_49778 = (state_49816[(7)]);
var inst_49778__$1 = (state_49816[(2)]);
var inst_49779 = (inst_49778__$1 == null);
var state_49816__$1 = (function (){var statearr_49827 = state_49816;
(statearr_49827[(7)] = inst_49778__$1);

return statearr_49827;
})();
if(cljs.core.truth_(inst_49779)){
var statearr_49828_52109 = state_49816__$1;
(statearr_49828_52109[(1)] = (5));

} else {
var statearr_49829_52110 = state_49816__$1;
(statearr_49829_52110[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49817 === (15))){
var inst_49791 = (state_49816[(8)]);
var state_49816__$1 = state_49816;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_49816__$1,(18),to,inst_49791);
} else {
if((state_val_49817 === (21))){
var inst_49807 = (state_49816[(2)]);
var state_49816__$1 = state_49816;
var statearr_49832_52114 = state_49816__$1;
(statearr_49832_52114[(2)] = inst_49807);

(statearr_49832_52114[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49817 === (13))){
var inst_49809 = (state_49816[(2)]);
var state_49816__$1 = (function (){var statearr_49833 = state_49816;
(statearr_49833[(9)] = inst_49809);

return statearr_49833;
})();
var statearr_49834_52116 = state_49816__$1;
(statearr_49834_52116[(2)] = null);

(statearr_49834_52116[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49817 === (6))){
var inst_49778 = (state_49816[(7)]);
var state_49816__$1 = state_49816;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_49816__$1,(11),inst_49778);
} else {
if((state_val_49817 === (17))){
var inst_49799 = (state_49816[(2)]);
var state_49816__$1 = state_49816;
if(cljs.core.truth_(inst_49799)){
var statearr_49837_52117 = state_49816__$1;
(statearr_49837_52117[(1)] = (19));

} else {
var statearr_49838_52118 = state_49816__$1;
(statearr_49838_52118[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49817 === (3))){
var inst_49814 = (state_49816[(2)]);
var state_49816__$1 = state_49816;
return cljs.core.async.impl.ioc_helpers.return_chan(state_49816__$1,inst_49814);
} else {
if((state_val_49817 === (12))){
var inst_49788 = (state_49816[(10)]);
var state_49816__$1 = state_49816;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_49816__$1,(14),inst_49788);
} else {
if((state_val_49817 === (2))){
var state_49816__$1 = state_49816;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_49816__$1,(4),results);
} else {
if((state_val_49817 === (19))){
var state_49816__$1 = state_49816;
var statearr_49847_52119 = state_49816__$1;
(statearr_49847_52119[(2)] = null);

(statearr_49847_52119[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49817 === (11))){
var inst_49788 = (state_49816[(2)]);
var state_49816__$1 = (function (){var statearr_49848 = state_49816;
(statearr_49848[(10)] = inst_49788);

return statearr_49848;
})();
var statearr_49849_52121 = state_49816__$1;
(statearr_49849_52121[(2)] = null);

(statearr_49849_52121[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49817 === (9))){
var state_49816__$1 = state_49816;
var statearr_49850_52125 = state_49816__$1;
(statearr_49850_52125[(2)] = null);

(statearr_49850_52125[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49817 === (5))){
var state_49816__$1 = state_49816;
if(cljs.core.truth_(close_QMARK_)){
var statearr_49851_52126 = state_49816__$1;
(statearr_49851_52126[(1)] = (8));

} else {
var statearr_49852_52127 = state_49816__$1;
(statearr_49852_52127[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49817 === (14))){
var inst_49793 = (state_49816[(11)]);
var inst_49791 = (state_49816[(8)]);
var inst_49791__$1 = (state_49816[(2)]);
var inst_49792 = (inst_49791__$1 == null);
var inst_49793__$1 = cljs.core.not(inst_49792);
var state_49816__$1 = (function (){var statearr_49854 = state_49816;
(statearr_49854[(11)] = inst_49793__$1);

(statearr_49854[(8)] = inst_49791__$1);

return statearr_49854;
})();
if(inst_49793__$1){
var statearr_49855_52128 = state_49816__$1;
(statearr_49855_52128[(1)] = (15));

} else {
var statearr_49856_52130 = state_49816__$1;
(statearr_49856_52130[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49817 === (16))){
var inst_49793 = (state_49816[(11)]);
var state_49816__$1 = state_49816;
var statearr_49857_52131 = state_49816__$1;
(statearr_49857_52131[(2)] = inst_49793);

(statearr_49857_52131[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49817 === (10))){
var inst_49785 = (state_49816[(2)]);
var state_49816__$1 = state_49816;
var statearr_49858_52133 = state_49816__$1;
(statearr_49858_52133[(2)] = inst_49785);

(statearr_49858_52133[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49817 === (18))){
var inst_49796 = (state_49816[(2)]);
var state_49816__$1 = state_49816;
var statearr_49861_52134 = state_49816__$1;
(statearr_49861_52134[(2)] = inst_49796);

(statearr_49861_52134[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49817 === (8))){
var inst_49782 = cljs.core.async.close_BANG_(to);
var state_49816__$1 = state_49816;
var statearr_49862_52136 = state_49816__$1;
(statearr_49862_52136[(2)] = inst_49782);

(statearr_49862_52136[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__48630__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__48630__auto____0 = (function (){
var statearr_49865 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_49865[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__48630__auto__);

(statearr_49865[(1)] = (1));

return statearr_49865;
});
var cljs$core$async$pipeline_STAR__$_state_machine__48630__auto____1 = (function (state_49816){
while(true){
var ret_value__48631__auto__ = (function (){try{while(true){
var result__48632__auto__ = switch__48629__auto__(state_49816);
if(cljs.core.keyword_identical_QMARK_(result__48632__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__48632__auto__;
}
break;
}
}catch (e49871){var ex__48633__auto__ = e49871;
var statearr_49872_52137 = state_49816;
(statearr_49872_52137[(2)] = ex__48633__auto__);


if(cljs.core.seq((state_49816[(4)]))){
var statearr_49873_52139 = state_49816;
(statearr_49873_52139[(1)] = cljs.core.first((state_49816[(4)])));

} else {
throw ex__48633__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__48631__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__52140 = state_49816;
state_49816 = G__52140;
continue;
} else {
return ret_value__48631__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__48630__auto__ = function(state_49816){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__48630__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__48630__auto____1.call(this,state_49816);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__48630__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__48630__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__48630__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__48630__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__48630__auto__;
})()
})();
var state__49007__auto__ = (function (){var statearr_49874 = f__49006__auto__();
(statearr_49874[(6)] = c__49005__auto__);

return statearr_49874;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__49007__auto__);
}));

return c__49005__auto__;
});
/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the async function af, with parallelism n. af
 *   must be a function of two arguments, the first an input value and
 *   the second a channel on which to place the result(s). af must close!
 *   the channel before returning.  The presumption is that af will
 *   return immediately, having launched some asynchronous operation
 *   whose completion/callback will manipulate the result channel. Outputs
 *   will be returned in order relative to  the inputs. By default, the to
 *   channel will be closed when the from channel closes, but can be
 *   determined by the close?  parameter. Will stop consuming the from
 *   channel if the to channel closes.
 */
cljs.core.async.pipeline_async = (function cljs$core$async$pipeline_async(var_args){
var G__49878 = arguments.length;
switch (G__49878) {
case 4:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4 = (function (n,to,af,from){
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5(n,to,af,from,true);
}));

(cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5 = (function (n,to,af,from,close_QMARK_){
return cljs.core.async.pipeline_STAR_(n,to,af,from,close_QMARK_,null,new cljs.core.Keyword(null,"async","async",1050769601));
}));

(cljs.core.async.pipeline_async.cljs$lang$maxFixedArity = 5);

/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the transducer xf, with parallelism n. Because
 *   it is parallel, the transducer will be applied independently to each
 *   element, not across elements, and may produce zero or more outputs
 *   per input.  Outputs will be returned in order relative to the
 *   inputs. By default, the to channel will be closed when the from
 *   channel closes, but can be determined by the close?  parameter. Will
 *   stop consuming the from channel if the to channel closes.
 * 
 *   Note this is supplied for API compatibility with the Clojure version.
 *   Values of N > 1 will not result in actual concurrency in a
 *   single-threaded runtime.
 */
cljs.core.async.pipeline = (function cljs$core$async$pipeline(var_args){
var G__49890 = arguments.length;
switch (G__49890) {
case 4:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4 = (function (n,to,xf,from){
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5(n,to,xf,from,true);
}));

(cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5 = (function (n,to,xf,from,close_QMARK_){
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6(n,to,xf,from,close_QMARK_,null);
}));

(cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6 = (function (n,to,xf,from,close_QMARK_,ex_handler){
return cljs.core.async.pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,new cljs.core.Keyword(null,"compute","compute",1555393130));
}));

(cljs.core.async.pipeline.cljs$lang$maxFixedArity = 6);

/**
 * Takes a predicate and a source channel and returns a vector of two
 *   channels, the first of which will contain the values for which the
 *   predicate returned true, the second those for which it returned
 *   false.
 * 
 *   The out channels will be unbuffered by default, or two buf-or-ns can
 *   be supplied. The channels will close after the source channel has
 *   closed.
 */
cljs.core.async.split = (function cljs$core$async$split(var_args){
var G__49907 = arguments.length;
switch (G__49907) {
case 2:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.split.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4(p,ch,null,null);
}));

(cljs.core.async.split.cljs$core$IFn$_invoke$arity$4 = (function (p,ch,t_buf_or_n,f_buf_or_n){
var tc = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(t_buf_or_n);
var fc = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(f_buf_or_n);
var c__49005__auto___52151 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__49006__auto__ = (function (){var switch__48629__auto__ = (function (state_49935){
var state_val_49936 = (state_49935[(1)]);
if((state_val_49936 === (7))){
var inst_49931 = (state_49935[(2)]);
var state_49935__$1 = state_49935;
var statearr_49941_52152 = state_49935__$1;
(statearr_49941_52152[(2)] = inst_49931);

(statearr_49941_52152[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49936 === (1))){
var state_49935__$1 = state_49935;
var statearr_49946_52153 = state_49935__$1;
(statearr_49946_52153[(2)] = null);

(statearr_49946_52153[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49936 === (4))){
var inst_49910 = (state_49935[(7)]);
var inst_49910__$1 = (state_49935[(2)]);
var inst_49912 = (inst_49910__$1 == null);
var state_49935__$1 = (function (){var statearr_49954 = state_49935;
(statearr_49954[(7)] = inst_49910__$1);

return statearr_49954;
})();
if(cljs.core.truth_(inst_49912)){
var statearr_49955_52157 = state_49935__$1;
(statearr_49955_52157[(1)] = (5));

} else {
var statearr_49956_52158 = state_49935__$1;
(statearr_49956_52158[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49936 === (13))){
var state_49935__$1 = state_49935;
var statearr_49957_52159 = state_49935__$1;
(statearr_49957_52159[(2)] = null);

(statearr_49957_52159[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49936 === (6))){
var inst_49910 = (state_49935[(7)]);
var inst_49918 = (p.cljs$core$IFn$_invoke$arity$1 ? p.cljs$core$IFn$_invoke$arity$1(inst_49910) : p.call(null,inst_49910));
var state_49935__$1 = state_49935;
if(cljs.core.truth_(inst_49918)){
var statearr_49958_52161 = state_49935__$1;
(statearr_49958_52161[(1)] = (9));

} else {
var statearr_49959_52162 = state_49935__$1;
(statearr_49959_52162[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49936 === (3))){
var inst_49933 = (state_49935[(2)]);
var state_49935__$1 = state_49935;
return cljs.core.async.impl.ioc_helpers.return_chan(state_49935__$1,inst_49933);
} else {
if((state_val_49936 === (12))){
var state_49935__$1 = state_49935;
var statearr_49960_52164 = state_49935__$1;
(statearr_49960_52164[(2)] = null);

(statearr_49960_52164[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49936 === (2))){
var state_49935__$1 = state_49935;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_49935__$1,(4),ch);
} else {
if((state_val_49936 === (11))){
var inst_49910 = (state_49935[(7)]);
var inst_49922 = (state_49935[(2)]);
var state_49935__$1 = state_49935;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_49935__$1,(8),inst_49922,inst_49910);
} else {
if((state_val_49936 === (9))){
var state_49935__$1 = state_49935;
var statearr_49961_52165 = state_49935__$1;
(statearr_49961_52165[(2)] = tc);

(statearr_49961_52165[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49936 === (5))){
var inst_49914 = cljs.core.async.close_BANG_(tc);
var inst_49916 = cljs.core.async.close_BANG_(fc);
var state_49935__$1 = (function (){var statearr_49968 = state_49935;
(statearr_49968[(8)] = inst_49914);

return statearr_49968;
})();
var statearr_49969_52167 = state_49935__$1;
(statearr_49969_52167[(2)] = inst_49916);

(statearr_49969_52167[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49936 === (14))){
var inst_49929 = (state_49935[(2)]);
var state_49935__$1 = state_49935;
var statearr_49972_52169 = state_49935__$1;
(statearr_49972_52169[(2)] = inst_49929);

(statearr_49972_52169[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49936 === (10))){
var state_49935__$1 = state_49935;
var statearr_49975_52170 = state_49935__$1;
(statearr_49975_52170[(2)] = fc);

(statearr_49975_52170[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49936 === (8))){
var inst_49924 = (state_49935[(2)]);
var state_49935__$1 = state_49935;
if(cljs.core.truth_(inst_49924)){
var statearr_49977_52171 = state_49935__$1;
(statearr_49977_52171[(1)] = (12));

} else {
var statearr_49978_52172 = state_49935__$1;
(statearr_49978_52172[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__48630__auto__ = null;
var cljs$core$async$state_machine__48630__auto____0 = (function (){
var statearr_49980 = [null,null,null,null,null,null,null,null,null];
(statearr_49980[(0)] = cljs$core$async$state_machine__48630__auto__);

(statearr_49980[(1)] = (1));

return statearr_49980;
});
var cljs$core$async$state_machine__48630__auto____1 = (function (state_49935){
while(true){
var ret_value__48631__auto__ = (function (){try{while(true){
var result__48632__auto__ = switch__48629__auto__(state_49935);
if(cljs.core.keyword_identical_QMARK_(result__48632__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__48632__auto__;
}
break;
}
}catch (e49981){var ex__48633__auto__ = e49981;
var statearr_49982_52173 = state_49935;
(statearr_49982_52173[(2)] = ex__48633__auto__);


if(cljs.core.seq((state_49935[(4)]))){
var statearr_49983_52174 = state_49935;
(statearr_49983_52174[(1)] = cljs.core.first((state_49935[(4)])));

} else {
throw ex__48633__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__48631__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__52175 = state_49935;
state_49935 = G__52175;
continue;
} else {
return ret_value__48631__auto__;
}
break;
}
});
cljs$core$async$state_machine__48630__auto__ = function(state_49935){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__48630__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__48630__auto____1.call(this,state_49935);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__48630__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__48630__auto____0;
cljs$core$async$state_machine__48630__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__48630__auto____1;
return cljs$core$async$state_machine__48630__auto__;
})()
})();
var state__49007__auto__ = (function (){var statearr_49987 = f__49006__auto__();
(statearr_49987[(6)] = c__49005__auto___52151);

return statearr_49987;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__49007__auto__);
}));


return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tc,fc], null);
}));

(cljs.core.async.split.cljs$lang$maxFixedArity = 4);

/**
 * f should be a function of 2 arguments. Returns a channel containing
 *   the single result of applying f to init and the first item from the
 *   channel, then applying f to that result and the 2nd item, etc. If
 *   the channel closes without yielding items, returns init and f is not
 *   called. ch must close before reduce produces a result.
 */
cljs.core.async.reduce = (function cljs$core$async$reduce(f,init,ch){
var c__49005__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__49006__auto__ = (function (){var switch__48629__auto__ = (function (state_50009){
var state_val_50010 = (state_50009[(1)]);
if((state_val_50010 === (7))){
var inst_50005 = (state_50009[(2)]);
var state_50009__$1 = state_50009;
var statearr_50013_52178 = state_50009__$1;
(statearr_50013_52178[(2)] = inst_50005);

(statearr_50013_52178[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50010 === (1))){
var inst_49988 = init;
var inst_49989 = inst_49988;
var state_50009__$1 = (function (){var statearr_50014 = state_50009;
(statearr_50014[(7)] = inst_49989);

return statearr_50014;
})();
var statearr_50018_52179 = state_50009__$1;
(statearr_50018_52179[(2)] = null);

(statearr_50018_52179[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50010 === (4))){
var inst_49992 = (state_50009[(8)]);
var inst_49992__$1 = (state_50009[(2)]);
var inst_49993 = (inst_49992__$1 == null);
var state_50009__$1 = (function (){var statearr_50024 = state_50009;
(statearr_50024[(8)] = inst_49992__$1);

return statearr_50024;
})();
if(cljs.core.truth_(inst_49993)){
var statearr_50025_52181 = state_50009__$1;
(statearr_50025_52181[(1)] = (5));

} else {
var statearr_50026_52182 = state_50009__$1;
(statearr_50026_52182[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50010 === (6))){
var inst_49992 = (state_50009[(8)]);
var inst_49996 = (state_50009[(9)]);
var inst_49989 = (state_50009[(7)]);
var inst_49996__$1 = (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(inst_49989,inst_49992) : f.call(null,inst_49989,inst_49992));
var inst_49997 = cljs.core.reduced_QMARK_(inst_49996__$1);
var state_50009__$1 = (function (){var statearr_50028 = state_50009;
(statearr_50028[(9)] = inst_49996__$1);

return statearr_50028;
})();
if(inst_49997){
var statearr_50029_52192 = state_50009__$1;
(statearr_50029_52192[(1)] = (8));

} else {
var statearr_50033_52193 = state_50009__$1;
(statearr_50033_52193[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50010 === (3))){
var inst_50007 = (state_50009[(2)]);
var state_50009__$1 = state_50009;
return cljs.core.async.impl.ioc_helpers.return_chan(state_50009__$1,inst_50007);
} else {
if((state_val_50010 === (2))){
var state_50009__$1 = state_50009;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_50009__$1,(4),ch);
} else {
if((state_val_50010 === (9))){
var inst_49996 = (state_50009[(9)]);
var inst_49989 = inst_49996;
var state_50009__$1 = (function (){var statearr_50034 = state_50009;
(statearr_50034[(7)] = inst_49989);

return statearr_50034;
})();
var statearr_50035_52194 = state_50009__$1;
(statearr_50035_52194[(2)] = null);

(statearr_50035_52194[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50010 === (5))){
var inst_49989 = (state_50009[(7)]);
var state_50009__$1 = state_50009;
var statearr_50036_52196 = state_50009__$1;
(statearr_50036_52196[(2)] = inst_49989);

(statearr_50036_52196[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50010 === (10))){
var inst_50003 = (state_50009[(2)]);
var state_50009__$1 = state_50009;
var statearr_50037_52197 = state_50009__$1;
(statearr_50037_52197[(2)] = inst_50003);

(statearr_50037_52197[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50010 === (8))){
var inst_49996 = (state_50009[(9)]);
var inst_49999 = cljs.core.deref(inst_49996);
var state_50009__$1 = state_50009;
var statearr_50040_52201 = state_50009__$1;
(statearr_50040_52201[(2)] = inst_49999);

(statearr_50040_52201[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$reduce_$_state_machine__48630__auto__ = null;
var cljs$core$async$reduce_$_state_machine__48630__auto____0 = (function (){
var statearr_50041 = [null,null,null,null,null,null,null,null,null,null];
(statearr_50041[(0)] = cljs$core$async$reduce_$_state_machine__48630__auto__);

(statearr_50041[(1)] = (1));

return statearr_50041;
});
var cljs$core$async$reduce_$_state_machine__48630__auto____1 = (function (state_50009){
while(true){
var ret_value__48631__auto__ = (function (){try{while(true){
var result__48632__auto__ = switch__48629__auto__(state_50009);
if(cljs.core.keyword_identical_QMARK_(result__48632__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__48632__auto__;
}
break;
}
}catch (e50044){var ex__48633__auto__ = e50044;
var statearr_50045_52209 = state_50009;
(statearr_50045_52209[(2)] = ex__48633__auto__);


if(cljs.core.seq((state_50009[(4)]))){
var statearr_50046_52210 = state_50009;
(statearr_50046_52210[(1)] = cljs.core.first((state_50009[(4)])));

} else {
throw ex__48633__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__48631__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__52212 = state_50009;
state_50009 = G__52212;
continue;
} else {
return ret_value__48631__auto__;
}
break;
}
});
cljs$core$async$reduce_$_state_machine__48630__auto__ = function(state_50009){
switch(arguments.length){
case 0:
return cljs$core$async$reduce_$_state_machine__48630__auto____0.call(this);
case 1:
return cljs$core$async$reduce_$_state_machine__48630__auto____1.call(this,state_50009);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$reduce_$_state_machine__48630__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$reduce_$_state_machine__48630__auto____0;
cljs$core$async$reduce_$_state_machine__48630__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$reduce_$_state_machine__48630__auto____1;
return cljs$core$async$reduce_$_state_machine__48630__auto__;
})()
})();
var state__49007__auto__ = (function (){var statearr_50049 = f__49006__auto__();
(statearr_50049[(6)] = c__49005__auto__);

return statearr_50049;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__49007__auto__);
}));

return c__49005__auto__;
});
/**
 * async/reduces a channel with a transformation (xform f).
 *   Returns a channel containing the result.  ch must close before
 *   transduce produces a result.
 */
cljs.core.async.transduce = (function cljs$core$async$transduce(xform,f,init,ch){
var f__$1 = (xform.cljs$core$IFn$_invoke$arity$1 ? xform.cljs$core$IFn$_invoke$arity$1(f) : xform.call(null,f));
var c__49005__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__49006__auto__ = (function (){var switch__48629__auto__ = (function (state_50067){
var state_val_50068 = (state_50067[(1)]);
if((state_val_50068 === (1))){
var inst_50060 = cljs.core.async.reduce(f__$1,init,ch);
var state_50067__$1 = state_50067;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_50067__$1,(2),inst_50060);
} else {
if((state_val_50068 === (2))){
var inst_50062 = (state_50067[(2)]);
var inst_50065 = (f__$1.cljs$core$IFn$_invoke$arity$1 ? f__$1.cljs$core$IFn$_invoke$arity$1(inst_50062) : f__$1.call(null,inst_50062));
var state_50067__$1 = state_50067;
return cljs.core.async.impl.ioc_helpers.return_chan(state_50067__$1,inst_50065);
} else {
return null;
}
}
});
return (function() {
var cljs$core$async$transduce_$_state_machine__48630__auto__ = null;
var cljs$core$async$transduce_$_state_machine__48630__auto____0 = (function (){
var statearr_50077 = [null,null,null,null,null,null,null];
(statearr_50077[(0)] = cljs$core$async$transduce_$_state_machine__48630__auto__);

(statearr_50077[(1)] = (1));

return statearr_50077;
});
var cljs$core$async$transduce_$_state_machine__48630__auto____1 = (function (state_50067){
while(true){
var ret_value__48631__auto__ = (function (){try{while(true){
var result__48632__auto__ = switch__48629__auto__(state_50067);
if(cljs.core.keyword_identical_QMARK_(result__48632__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__48632__auto__;
}
break;
}
}catch (e50082){var ex__48633__auto__ = e50082;
var statearr_50083_52217 = state_50067;
(statearr_50083_52217[(2)] = ex__48633__auto__);


if(cljs.core.seq((state_50067[(4)]))){
var statearr_50084_52218 = state_50067;
(statearr_50084_52218[(1)] = cljs.core.first((state_50067[(4)])));

} else {
throw ex__48633__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__48631__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__52220 = state_50067;
state_50067 = G__52220;
continue;
} else {
return ret_value__48631__auto__;
}
break;
}
});
cljs$core$async$transduce_$_state_machine__48630__auto__ = function(state_50067){
switch(arguments.length){
case 0:
return cljs$core$async$transduce_$_state_machine__48630__auto____0.call(this);
case 1:
return cljs$core$async$transduce_$_state_machine__48630__auto____1.call(this,state_50067);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$transduce_$_state_machine__48630__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$transduce_$_state_machine__48630__auto____0;
cljs$core$async$transduce_$_state_machine__48630__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$transduce_$_state_machine__48630__auto____1;
return cljs$core$async$transduce_$_state_machine__48630__auto__;
})()
})();
var state__49007__auto__ = (function (){var statearr_50086 = f__49006__auto__();
(statearr_50086[(6)] = c__49005__auto__);

return statearr_50086;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__49007__auto__);
}));

return c__49005__auto__;
});
/**
 * Puts the contents of coll into the supplied channel.
 * 
 *   By default the channel will be closed after the items are copied,
 *   but can be determined by the close? parameter.
 * 
 *   Returns a channel which will close after the items are copied.
 */
cljs.core.async.onto_chan_BANG_ = (function cljs$core$async$onto_chan_BANG_(var_args){
var G__50093 = arguments.length;
switch (G__50093) {
case 2:
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3(ch,coll,true);
}));

(cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
var c__49005__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__49006__auto__ = (function (){var switch__48629__auto__ = (function (state_50123){
var state_val_50124 = (state_50123[(1)]);
if((state_val_50124 === (7))){
var inst_50104 = (state_50123[(2)]);
var state_50123__$1 = state_50123;
var statearr_50126_52229 = state_50123__$1;
(statearr_50126_52229[(2)] = inst_50104);

(statearr_50126_52229[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50124 === (1))){
var inst_50098 = cljs.core.seq(coll);
var inst_50099 = inst_50098;
var state_50123__$1 = (function (){var statearr_50133 = state_50123;
(statearr_50133[(7)] = inst_50099);

return statearr_50133;
})();
var statearr_50134_52231 = state_50123__$1;
(statearr_50134_52231[(2)] = null);

(statearr_50134_52231[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50124 === (4))){
var inst_50099 = (state_50123[(7)]);
var inst_50102 = cljs.core.first(inst_50099);
var state_50123__$1 = state_50123;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_50123__$1,(7),ch,inst_50102);
} else {
if((state_val_50124 === (13))){
var inst_50116 = (state_50123[(2)]);
var state_50123__$1 = state_50123;
var statearr_50137_52235 = state_50123__$1;
(statearr_50137_52235[(2)] = inst_50116);

(statearr_50137_52235[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50124 === (6))){
var inst_50107 = (state_50123[(2)]);
var state_50123__$1 = state_50123;
if(cljs.core.truth_(inst_50107)){
var statearr_50138_52236 = state_50123__$1;
(statearr_50138_52236[(1)] = (8));

} else {
var statearr_50139_52237 = state_50123__$1;
(statearr_50139_52237[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50124 === (3))){
var inst_50120 = (state_50123[(2)]);
var state_50123__$1 = state_50123;
return cljs.core.async.impl.ioc_helpers.return_chan(state_50123__$1,inst_50120);
} else {
if((state_val_50124 === (12))){
var state_50123__$1 = state_50123;
var statearr_50140_52243 = state_50123__$1;
(statearr_50140_52243[(2)] = null);

(statearr_50140_52243[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50124 === (2))){
var inst_50099 = (state_50123[(7)]);
var state_50123__$1 = state_50123;
if(cljs.core.truth_(inst_50099)){
var statearr_50141_52244 = state_50123__$1;
(statearr_50141_52244[(1)] = (4));

} else {
var statearr_50143_52245 = state_50123__$1;
(statearr_50143_52245[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50124 === (11))){
var inst_50113 = cljs.core.async.close_BANG_(ch);
var state_50123__$1 = state_50123;
var statearr_50147_52246 = state_50123__$1;
(statearr_50147_52246[(2)] = inst_50113);

(statearr_50147_52246[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50124 === (9))){
var state_50123__$1 = state_50123;
if(cljs.core.truth_(close_QMARK_)){
var statearr_50148_52248 = state_50123__$1;
(statearr_50148_52248[(1)] = (11));

} else {
var statearr_50149_52249 = state_50123__$1;
(statearr_50149_52249[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50124 === (5))){
var inst_50099 = (state_50123[(7)]);
var state_50123__$1 = state_50123;
var statearr_50150_52250 = state_50123__$1;
(statearr_50150_52250[(2)] = inst_50099);

(statearr_50150_52250[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50124 === (10))){
var inst_50118 = (state_50123[(2)]);
var state_50123__$1 = state_50123;
var statearr_50151_52254 = state_50123__$1;
(statearr_50151_52254[(2)] = inst_50118);

(statearr_50151_52254[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50124 === (8))){
var inst_50099 = (state_50123[(7)]);
var inst_50109 = cljs.core.next(inst_50099);
var inst_50099__$1 = inst_50109;
var state_50123__$1 = (function (){var statearr_50154 = state_50123;
(statearr_50154[(7)] = inst_50099__$1);

return statearr_50154;
})();
var statearr_50155_52256 = state_50123__$1;
(statearr_50155_52256[(2)] = null);

(statearr_50155_52256[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__48630__auto__ = null;
var cljs$core$async$state_machine__48630__auto____0 = (function (){
var statearr_50156 = [null,null,null,null,null,null,null,null];
(statearr_50156[(0)] = cljs$core$async$state_machine__48630__auto__);

(statearr_50156[(1)] = (1));

return statearr_50156;
});
var cljs$core$async$state_machine__48630__auto____1 = (function (state_50123){
while(true){
var ret_value__48631__auto__ = (function (){try{while(true){
var result__48632__auto__ = switch__48629__auto__(state_50123);
if(cljs.core.keyword_identical_QMARK_(result__48632__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__48632__auto__;
}
break;
}
}catch (e50157){var ex__48633__auto__ = e50157;
var statearr_50158_52257 = state_50123;
(statearr_50158_52257[(2)] = ex__48633__auto__);


if(cljs.core.seq((state_50123[(4)]))){
var statearr_50159_52258 = state_50123;
(statearr_50159_52258[(1)] = cljs.core.first((state_50123[(4)])));

} else {
throw ex__48633__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__48631__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__52259 = state_50123;
state_50123 = G__52259;
continue;
} else {
return ret_value__48631__auto__;
}
break;
}
});
cljs$core$async$state_machine__48630__auto__ = function(state_50123){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__48630__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__48630__auto____1.call(this,state_50123);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__48630__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__48630__auto____0;
cljs$core$async$state_machine__48630__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__48630__auto____1;
return cljs$core$async$state_machine__48630__auto__;
})()
})();
var state__49007__auto__ = (function (){var statearr_50162 = f__49006__auto__();
(statearr_50162[(6)] = c__49005__auto__);

return statearr_50162;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__49007__auto__);
}));

return c__49005__auto__;
}));

(cljs.core.async.onto_chan_BANG_.cljs$lang$maxFixedArity = 3);

/**
 * Creates and returns a channel which contains the contents of coll,
 *   closing when exhausted.
 */
cljs.core.async.to_chan_BANG_ = (function cljs$core$async$to_chan_BANG_(coll){
var ch = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(cljs.core.bounded_count((100),coll));
cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$2(ch,coll);

return ch;
});
/**
 * Deprecated - use onto-chan!
 */
cljs.core.async.onto_chan = (function cljs$core$async$onto_chan(var_args){
var G__50166 = arguments.length;
switch (G__50166) {
case 2:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3(ch,coll,true);
}));

(cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3(ch,coll,close_QMARK_);
}));

(cljs.core.async.onto_chan.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - use to-chan!
 */
cljs.core.async.to_chan = (function cljs$core$async$to_chan(coll){
return cljs.core.async.to_chan_BANG_(coll);
});

/**
 * @interface
 */
cljs.core.async.Mux = function(){};

var cljs$core$async$Mux$muxch_STAR_$dyn_52263 = (function (_){
var x__4509__auto__ = (((_ == null))?null:_);
var m__4510__auto__ = (cljs.core.async.muxch_STAR_[goog.typeOf(x__4509__auto__)]);
if((!((m__4510__auto__ == null)))){
return (m__4510__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4510__auto__.cljs$core$IFn$_invoke$arity$1(_) : m__4510__auto__.call(null,_));
} else {
var m__4508__auto__ = (cljs.core.async.muxch_STAR_["_"]);
if((!((m__4508__auto__ == null)))){
return (m__4508__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4508__auto__.cljs$core$IFn$_invoke$arity$1(_) : m__4508__auto__.call(null,_));
} else {
throw cljs.core.missing_protocol("Mux.muxch*",_);
}
}
});
cljs.core.async.muxch_STAR_ = (function cljs$core$async$muxch_STAR_(_){
if((((!((_ == null)))) && ((!((_.cljs$core$async$Mux$muxch_STAR_$arity$1 == null)))))){
return _.cljs$core$async$Mux$muxch_STAR_$arity$1(_);
} else {
return cljs$core$async$Mux$muxch_STAR_$dyn_52263(_);
}
});


/**
 * @interface
 */
cljs.core.async.Mult = function(){};

var cljs$core$async$Mult$tap_STAR_$dyn_52267 = (function (m,ch,close_QMARK_){
var x__4509__auto__ = (((m == null))?null:m);
var m__4510__auto__ = (cljs.core.async.tap_STAR_[goog.typeOf(x__4509__auto__)]);
if((!((m__4510__auto__ == null)))){
return (m__4510__auto__.cljs$core$IFn$_invoke$arity$3 ? m__4510__auto__.cljs$core$IFn$_invoke$arity$3(m,ch,close_QMARK_) : m__4510__auto__.call(null,m,ch,close_QMARK_));
} else {
var m__4508__auto__ = (cljs.core.async.tap_STAR_["_"]);
if((!((m__4508__auto__ == null)))){
return (m__4508__auto__.cljs$core$IFn$_invoke$arity$3 ? m__4508__auto__.cljs$core$IFn$_invoke$arity$3(m,ch,close_QMARK_) : m__4508__auto__.call(null,m,ch,close_QMARK_));
} else {
throw cljs.core.missing_protocol("Mult.tap*",m);
}
}
});
cljs.core.async.tap_STAR_ = (function cljs$core$async$tap_STAR_(m,ch,close_QMARK_){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$tap_STAR_$arity$3 == null)))))){
return m.cljs$core$async$Mult$tap_STAR_$arity$3(m,ch,close_QMARK_);
} else {
return cljs$core$async$Mult$tap_STAR_$dyn_52267(m,ch,close_QMARK_);
}
});

var cljs$core$async$Mult$untap_STAR_$dyn_52268 = (function (m,ch){
var x__4509__auto__ = (((m == null))?null:m);
var m__4510__auto__ = (cljs.core.async.untap_STAR_[goog.typeOf(x__4509__auto__)]);
if((!((m__4510__auto__ == null)))){
return (m__4510__auto__.cljs$core$IFn$_invoke$arity$2 ? m__4510__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__4510__auto__.call(null,m,ch));
} else {
var m__4508__auto__ = (cljs.core.async.untap_STAR_["_"]);
if((!((m__4508__auto__ == null)))){
return (m__4508__auto__.cljs$core$IFn$_invoke$arity$2 ? m__4508__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__4508__auto__.call(null,m,ch));
} else {
throw cljs.core.missing_protocol("Mult.untap*",m);
}
}
});
cljs.core.async.untap_STAR_ = (function cljs$core$async$untap_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$untap_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mult$untap_STAR_$arity$2(m,ch);
} else {
return cljs$core$async$Mult$untap_STAR_$dyn_52268(m,ch);
}
});

var cljs$core$async$Mult$untap_all_STAR_$dyn_52269 = (function (m){
var x__4509__auto__ = (((m == null))?null:m);
var m__4510__auto__ = (cljs.core.async.untap_all_STAR_[goog.typeOf(x__4509__auto__)]);
if((!((m__4510__auto__ == null)))){
return (m__4510__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4510__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__4510__auto__.call(null,m));
} else {
var m__4508__auto__ = (cljs.core.async.untap_all_STAR_["_"]);
if((!((m__4508__auto__ == null)))){
return (m__4508__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4508__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__4508__auto__.call(null,m));
} else {
throw cljs.core.missing_protocol("Mult.untap-all*",m);
}
}
});
cljs.core.async.untap_all_STAR_ = (function cljs$core$async$untap_all_STAR_(m){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$untap_all_STAR_$arity$1 == null)))))){
return m.cljs$core$async$Mult$untap_all_STAR_$arity$1(m);
} else {
return cljs$core$async$Mult$untap_all_STAR_$dyn_52269(m);
}
});

/**
 * Creates and returns a mult(iple) of the supplied channel. Channels
 *   containing copies of the channel can be created with 'tap', and
 *   detached with 'untap'.
 * 
 *   Each item is distributed to all taps in parallel and synchronously,
 *   i.e. each tap must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow taps from holding up the mult.
 * 
 *   Items received when there are no taps get dropped.
 * 
 *   If a tap puts to a closed channel, it will be removed from the mult.
 */
cljs.core.async.mult = (function cljs$core$async$mult(ch){
var cs = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var m = (function (){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async50199 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Mult}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async50199 = (function (ch,cs,meta50200){
this.ch = ch;
this.cs = cs;
this.meta50200 = meta50200;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async50199.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_50201,meta50200__$1){
var self__ = this;
var _50201__$1 = this;
return (new cljs.core.async.t_cljs$core$async50199(self__.ch,self__.cs,meta50200__$1));
}));

(cljs.core.async.t_cljs$core$async50199.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_50201){
var self__ = this;
var _50201__$1 = this;
return self__.meta50200;
}));

(cljs.core.async.t_cljs$core$async50199.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async50199.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
}));

(cljs.core.async.t_cljs$core$async50199.prototype.cljs$core$async$Mult$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async50199.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = (function (_,ch__$1,close_QMARK_){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.cs,cljs.core.assoc,ch__$1,close_QMARK_);

return null;
}));

(cljs.core.async.t_cljs$core$async50199.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = (function (_,ch__$1){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.dissoc,ch__$1);

return null;
}));

(cljs.core.async.t_cljs$core$async50199.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return null;
}));

(cljs.core.async.t_cljs$core$async50199.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"meta50200","meta50200",1172617337,null)], null);
}));

(cljs.core.async.t_cljs$core$async50199.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async50199.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async50199");

(cljs.core.async.t_cljs$core$async50199.cljs$lang$ctorPrWriter = (function (this__4450__auto__,writer__4451__auto__,opt__4452__auto__){
return cljs.core._write(writer__4451__auto__,"cljs.core.async/t_cljs$core$async50199");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async50199.
 */
cljs.core.async.__GT_t_cljs$core$async50199 = (function cljs$core$async$mult_$___GT_t_cljs$core$async50199(ch__$1,cs__$1,meta50200){
return (new cljs.core.async.t_cljs$core$async50199(ch__$1,cs__$1,meta50200));
});

}

return (new cljs.core.async.t_cljs$core$async50199(ch,cs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var dchan = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var dctr = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var done = (function (_){
if((cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(dchan,true);
} else {
return null;
}
});
var c__49005__auto___52273 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__49006__auto__ = (function (){var switch__48629__auto__ = (function (state_50382){
var state_val_50386 = (state_50382[(1)]);
if((state_val_50386 === (7))){
var inst_50378 = (state_50382[(2)]);
var state_50382__$1 = state_50382;
var statearr_50388_52275 = state_50382__$1;
(statearr_50388_52275[(2)] = inst_50378);

(statearr_50388_52275[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50386 === (20))){
var inst_50265 = (state_50382[(7)]);
var inst_50282 = cljs.core.first(inst_50265);
var inst_50283 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_50282,(0),null);
var inst_50284 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_50282,(1),null);
var state_50382__$1 = (function (){var statearr_50393 = state_50382;
(statearr_50393[(8)] = inst_50283);

return statearr_50393;
})();
if(cljs.core.truth_(inst_50284)){
var statearr_50397_52276 = state_50382__$1;
(statearr_50397_52276[(1)] = (22));

} else {
var statearr_50398_52277 = state_50382__$1;
(statearr_50398_52277[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50386 === (27))){
var inst_50222 = (state_50382[(9)]);
var inst_50326 = (state_50382[(10)]);
var inst_50316 = (state_50382[(11)]);
var inst_50318 = (state_50382[(12)]);
var inst_50326__$1 = cljs.core._nth(inst_50316,inst_50318);
var inst_50327 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3(inst_50326__$1,inst_50222,done);
var state_50382__$1 = (function (){var statearr_50402 = state_50382;
(statearr_50402[(10)] = inst_50326__$1);

return statearr_50402;
})();
if(cljs.core.truth_(inst_50327)){
var statearr_50403_52278 = state_50382__$1;
(statearr_50403_52278[(1)] = (30));

} else {
var statearr_50404_52279 = state_50382__$1;
(statearr_50404_52279[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50386 === (1))){
var state_50382__$1 = state_50382;
var statearr_50405_52280 = state_50382__$1;
(statearr_50405_52280[(2)] = null);

(statearr_50405_52280[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50386 === (24))){
var inst_50265 = (state_50382[(7)]);
var inst_50289 = (state_50382[(2)]);
var inst_50290 = cljs.core.next(inst_50265);
var inst_50233 = inst_50290;
var inst_50234 = null;
var inst_50235 = (0);
var inst_50236 = (0);
var state_50382__$1 = (function (){var statearr_50408 = state_50382;
(statearr_50408[(13)] = inst_50236);

(statearr_50408[(14)] = inst_50234);

(statearr_50408[(15)] = inst_50289);

(statearr_50408[(16)] = inst_50233);

(statearr_50408[(17)] = inst_50235);

return statearr_50408;
})();
var statearr_50409_52284 = state_50382__$1;
(statearr_50409_52284[(2)] = null);

(statearr_50409_52284[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50386 === (39))){
var state_50382__$1 = state_50382;
var statearr_50413_52288 = state_50382__$1;
(statearr_50413_52288[(2)] = null);

(statearr_50413_52288[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50386 === (4))){
var inst_50222 = (state_50382[(9)]);
var inst_50222__$1 = (state_50382[(2)]);
var inst_50224 = (inst_50222__$1 == null);
var state_50382__$1 = (function (){var statearr_50416 = state_50382;
(statearr_50416[(9)] = inst_50222__$1);

return statearr_50416;
})();
if(cljs.core.truth_(inst_50224)){
var statearr_50418_52289 = state_50382__$1;
(statearr_50418_52289[(1)] = (5));

} else {
var statearr_50419_52290 = state_50382__$1;
(statearr_50419_52290[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50386 === (15))){
var inst_50236 = (state_50382[(13)]);
var inst_50234 = (state_50382[(14)]);
var inst_50233 = (state_50382[(16)]);
var inst_50235 = (state_50382[(17)]);
var inst_50259 = (state_50382[(2)]);
var inst_50260 = (inst_50236 + (1));
var tmp50410 = inst_50234;
var tmp50411 = inst_50233;
var tmp50412 = inst_50235;
var inst_50233__$1 = tmp50411;
var inst_50234__$1 = tmp50410;
var inst_50235__$1 = tmp50412;
var inst_50236__$1 = inst_50260;
var state_50382__$1 = (function (){var statearr_50420 = state_50382;
(statearr_50420[(18)] = inst_50259);

(statearr_50420[(13)] = inst_50236__$1);

(statearr_50420[(14)] = inst_50234__$1);

(statearr_50420[(16)] = inst_50233__$1);

(statearr_50420[(17)] = inst_50235__$1);

return statearr_50420;
})();
var statearr_50421_52292 = state_50382__$1;
(statearr_50421_52292[(2)] = null);

(statearr_50421_52292[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50386 === (21))){
var inst_50293 = (state_50382[(2)]);
var state_50382__$1 = state_50382;
var statearr_50426_52294 = state_50382__$1;
(statearr_50426_52294[(2)] = inst_50293);

(statearr_50426_52294[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50386 === (31))){
var inst_50326 = (state_50382[(10)]);
var inst_50330 = m.cljs$core$async$Mult$untap_STAR_$arity$2(null,inst_50326);
var state_50382__$1 = state_50382;
var statearr_50433_52296 = state_50382__$1;
(statearr_50433_52296[(2)] = inst_50330);

(statearr_50433_52296[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50386 === (32))){
var inst_50315 = (state_50382[(19)]);
var inst_50316 = (state_50382[(11)]);
var inst_50317 = (state_50382[(20)]);
var inst_50318 = (state_50382[(12)]);
var inst_50332 = (state_50382[(2)]);
var inst_50333 = (inst_50318 + (1));
var tmp50423 = inst_50315;
var tmp50424 = inst_50316;
var tmp50425 = inst_50317;
var inst_50315__$1 = tmp50423;
var inst_50316__$1 = tmp50424;
var inst_50317__$1 = tmp50425;
var inst_50318__$1 = inst_50333;
var state_50382__$1 = (function (){var statearr_50445 = state_50382;
(statearr_50445[(19)] = inst_50315__$1);

(statearr_50445[(11)] = inst_50316__$1);

(statearr_50445[(20)] = inst_50317__$1);

(statearr_50445[(21)] = inst_50332);

(statearr_50445[(12)] = inst_50318__$1);

return statearr_50445;
})();
var statearr_50446_52298 = state_50382__$1;
(statearr_50446_52298[(2)] = null);

(statearr_50446_52298[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50386 === (40))){
var inst_50346 = (state_50382[(22)]);
var inst_50351 = m.cljs$core$async$Mult$untap_STAR_$arity$2(null,inst_50346);
var state_50382__$1 = state_50382;
var statearr_50447_52302 = state_50382__$1;
(statearr_50447_52302[(2)] = inst_50351);

(statearr_50447_52302[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50386 === (33))){
var inst_50336 = (state_50382[(23)]);
var inst_50338 = cljs.core.chunked_seq_QMARK_(inst_50336);
var state_50382__$1 = state_50382;
if(inst_50338){
var statearr_50449_52303 = state_50382__$1;
(statearr_50449_52303[(1)] = (36));

} else {
var statearr_50450_52304 = state_50382__$1;
(statearr_50450_52304[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50386 === (13))){
var inst_50250 = (state_50382[(24)]);
var inst_50256 = cljs.core.async.close_BANG_(inst_50250);
var state_50382__$1 = state_50382;
var statearr_50451_52305 = state_50382__$1;
(statearr_50451_52305[(2)] = inst_50256);

(statearr_50451_52305[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50386 === (22))){
var inst_50283 = (state_50382[(8)]);
var inst_50286 = cljs.core.async.close_BANG_(inst_50283);
var state_50382__$1 = state_50382;
var statearr_50452_52306 = state_50382__$1;
(statearr_50452_52306[(2)] = inst_50286);

(statearr_50452_52306[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50386 === (36))){
var inst_50336 = (state_50382[(23)]);
var inst_50340 = cljs.core.chunk_first(inst_50336);
var inst_50341 = cljs.core.chunk_rest(inst_50336);
var inst_50342 = cljs.core.count(inst_50340);
var inst_50315 = inst_50341;
var inst_50316 = inst_50340;
var inst_50317 = inst_50342;
var inst_50318 = (0);
var state_50382__$1 = (function (){var statearr_50453 = state_50382;
(statearr_50453[(19)] = inst_50315);

(statearr_50453[(11)] = inst_50316);

(statearr_50453[(20)] = inst_50317);

(statearr_50453[(12)] = inst_50318);

return statearr_50453;
})();
var statearr_50454_52307 = state_50382__$1;
(statearr_50454_52307[(2)] = null);

(statearr_50454_52307[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50386 === (41))){
var inst_50336 = (state_50382[(23)]);
var inst_50353 = (state_50382[(2)]);
var inst_50354 = cljs.core.next(inst_50336);
var inst_50315 = inst_50354;
var inst_50316 = null;
var inst_50317 = (0);
var inst_50318 = (0);
var state_50382__$1 = (function (){var statearr_50459 = state_50382;
(statearr_50459[(25)] = inst_50353);

(statearr_50459[(19)] = inst_50315);

(statearr_50459[(11)] = inst_50316);

(statearr_50459[(20)] = inst_50317);

(statearr_50459[(12)] = inst_50318);

return statearr_50459;
})();
var statearr_50461_52309 = state_50382__$1;
(statearr_50461_52309[(2)] = null);

(statearr_50461_52309[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50386 === (43))){
var state_50382__$1 = state_50382;
var statearr_50463_52310 = state_50382__$1;
(statearr_50463_52310[(2)] = null);

(statearr_50463_52310[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50386 === (29))){
var inst_50365 = (state_50382[(2)]);
var state_50382__$1 = state_50382;
var statearr_50465_52314 = state_50382__$1;
(statearr_50465_52314[(2)] = inst_50365);

(statearr_50465_52314[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50386 === (44))){
var inst_50375 = (state_50382[(2)]);
var state_50382__$1 = (function (){var statearr_50467 = state_50382;
(statearr_50467[(26)] = inst_50375);

return statearr_50467;
})();
var statearr_50468_52315 = state_50382__$1;
(statearr_50468_52315[(2)] = null);

(statearr_50468_52315[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50386 === (6))){
var inst_50303 = (state_50382[(27)]);
var inst_50302 = cljs.core.deref(cs);
var inst_50303__$1 = cljs.core.keys(inst_50302);
var inst_50308 = cljs.core.count(inst_50303__$1);
var inst_50309 = cljs.core.reset_BANG_(dctr,inst_50308);
var inst_50314 = cljs.core.seq(inst_50303__$1);
var inst_50315 = inst_50314;
var inst_50316 = null;
var inst_50317 = (0);
var inst_50318 = (0);
var state_50382__$1 = (function (){var statearr_50470 = state_50382;
(statearr_50470[(27)] = inst_50303__$1);

(statearr_50470[(19)] = inst_50315);

(statearr_50470[(11)] = inst_50316);

(statearr_50470[(20)] = inst_50317);

(statearr_50470[(28)] = inst_50309);

(statearr_50470[(12)] = inst_50318);

return statearr_50470;
})();
var statearr_50473_52318 = state_50382__$1;
(statearr_50473_52318[(2)] = null);

(statearr_50473_52318[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50386 === (28))){
var inst_50315 = (state_50382[(19)]);
var inst_50336 = (state_50382[(23)]);
var inst_50336__$1 = cljs.core.seq(inst_50315);
var state_50382__$1 = (function (){var statearr_50474 = state_50382;
(statearr_50474[(23)] = inst_50336__$1);

return statearr_50474;
})();
if(inst_50336__$1){
var statearr_50475_52321 = state_50382__$1;
(statearr_50475_52321[(1)] = (33));

} else {
var statearr_50476_52322 = state_50382__$1;
(statearr_50476_52322[(1)] = (34));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50386 === (25))){
var inst_50317 = (state_50382[(20)]);
var inst_50318 = (state_50382[(12)]);
var inst_50320 = (inst_50318 < inst_50317);
var inst_50321 = inst_50320;
var state_50382__$1 = state_50382;
if(cljs.core.truth_(inst_50321)){
var statearr_50477_52323 = state_50382__$1;
(statearr_50477_52323[(1)] = (27));

} else {
var statearr_50478_52325 = state_50382__$1;
(statearr_50478_52325[(1)] = (28));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50386 === (34))){
var state_50382__$1 = state_50382;
var statearr_50479_52332 = state_50382__$1;
(statearr_50479_52332[(2)] = null);

(statearr_50479_52332[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50386 === (17))){
var state_50382__$1 = state_50382;
var statearr_50483_52333 = state_50382__$1;
(statearr_50483_52333[(2)] = null);

(statearr_50483_52333[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50386 === (3))){
var inst_50380 = (state_50382[(2)]);
var state_50382__$1 = state_50382;
return cljs.core.async.impl.ioc_helpers.return_chan(state_50382__$1,inst_50380);
} else {
if((state_val_50386 === (12))){
var inst_50298 = (state_50382[(2)]);
var state_50382__$1 = state_50382;
var statearr_50487_52338 = state_50382__$1;
(statearr_50487_52338[(2)] = inst_50298);

(statearr_50487_52338[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50386 === (2))){
var state_50382__$1 = state_50382;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_50382__$1,(4),ch);
} else {
if((state_val_50386 === (23))){
var state_50382__$1 = state_50382;
var statearr_50489_52339 = state_50382__$1;
(statearr_50489_52339[(2)] = null);

(statearr_50489_52339[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50386 === (35))){
var inst_50363 = (state_50382[(2)]);
var state_50382__$1 = state_50382;
var statearr_50491_52340 = state_50382__$1;
(statearr_50491_52340[(2)] = inst_50363);

(statearr_50491_52340[(1)] = (29));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50386 === (19))){
var inst_50265 = (state_50382[(7)]);
var inst_50271 = cljs.core.chunk_first(inst_50265);
var inst_50272 = cljs.core.chunk_rest(inst_50265);
var inst_50276 = cljs.core.count(inst_50271);
var inst_50233 = inst_50272;
var inst_50234 = inst_50271;
var inst_50235 = inst_50276;
var inst_50236 = (0);
var state_50382__$1 = (function (){var statearr_50493 = state_50382;
(statearr_50493[(13)] = inst_50236);

(statearr_50493[(14)] = inst_50234);

(statearr_50493[(16)] = inst_50233);

(statearr_50493[(17)] = inst_50235);

return statearr_50493;
})();
var statearr_50495_52347 = state_50382__$1;
(statearr_50495_52347[(2)] = null);

(statearr_50495_52347[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50386 === (11))){
var inst_50265 = (state_50382[(7)]);
var inst_50233 = (state_50382[(16)]);
var inst_50265__$1 = cljs.core.seq(inst_50233);
var state_50382__$1 = (function (){var statearr_50499 = state_50382;
(statearr_50499[(7)] = inst_50265__$1);

return statearr_50499;
})();
if(inst_50265__$1){
var statearr_50500_52348 = state_50382__$1;
(statearr_50500_52348[(1)] = (16));

} else {
var statearr_50501_52349 = state_50382__$1;
(statearr_50501_52349[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50386 === (9))){
var inst_50300 = (state_50382[(2)]);
var state_50382__$1 = state_50382;
var statearr_50502_52350 = state_50382__$1;
(statearr_50502_52350[(2)] = inst_50300);

(statearr_50502_52350[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50386 === (5))){
var inst_50230 = cljs.core.deref(cs);
var inst_50231 = cljs.core.seq(inst_50230);
var inst_50233 = inst_50231;
var inst_50234 = null;
var inst_50235 = (0);
var inst_50236 = (0);
var state_50382__$1 = (function (){var statearr_50505 = state_50382;
(statearr_50505[(13)] = inst_50236);

(statearr_50505[(14)] = inst_50234);

(statearr_50505[(16)] = inst_50233);

(statearr_50505[(17)] = inst_50235);

return statearr_50505;
})();
var statearr_50506_52351 = state_50382__$1;
(statearr_50506_52351[(2)] = null);

(statearr_50506_52351[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50386 === (14))){
var state_50382__$1 = state_50382;
var statearr_50507_52352 = state_50382__$1;
(statearr_50507_52352[(2)] = null);

(statearr_50507_52352[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50386 === (45))){
var inst_50372 = (state_50382[(2)]);
var state_50382__$1 = state_50382;
var statearr_50511_52353 = state_50382__$1;
(statearr_50511_52353[(2)] = inst_50372);

(statearr_50511_52353[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50386 === (26))){
var inst_50303 = (state_50382[(27)]);
var inst_50367 = (state_50382[(2)]);
var inst_50369 = cljs.core.seq(inst_50303);
var state_50382__$1 = (function (){var statearr_50512 = state_50382;
(statearr_50512[(29)] = inst_50367);

return statearr_50512;
})();
if(inst_50369){
var statearr_50514_52354 = state_50382__$1;
(statearr_50514_52354[(1)] = (42));

} else {
var statearr_50515_52356 = state_50382__$1;
(statearr_50515_52356[(1)] = (43));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50386 === (16))){
var inst_50265 = (state_50382[(7)]);
var inst_50269 = cljs.core.chunked_seq_QMARK_(inst_50265);
var state_50382__$1 = state_50382;
if(inst_50269){
var statearr_50516_52358 = state_50382__$1;
(statearr_50516_52358[(1)] = (19));

} else {
var statearr_50517_52359 = state_50382__$1;
(statearr_50517_52359[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50386 === (38))){
var inst_50360 = (state_50382[(2)]);
var state_50382__$1 = state_50382;
var statearr_50518_52360 = state_50382__$1;
(statearr_50518_52360[(2)] = inst_50360);

(statearr_50518_52360[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50386 === (30))){
var state_50382__$1 = state_50382;
var statearr_50519_52361 = state_50382__$1;
(statearr_50519_52361[(2)] = null);

(statearr_50519_52361[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50386 === (10))){
var inst_50236 = (state_50382[(13)]);
var inst_50234 = (state_50382[(14)]);
var inst_50249 = cljs.core._nth(inst_50234,inst_50236);
var inst_50250 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_50249,(0),null);
var inst_50251 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_50249,(1),null);
var state_50382__$1 = (function (){var statearr_50522 = state_50382;
(statearr_50522[(24)] = inst_50250);

return statearr_50522;
})();
if(cljs.core.truth_(inst_50251)){
var statearr_50525_52362 = state_50382__$1;
(statearr_50525_52362[(1)] = (13));

} else {
var statearr_50526_52363 = state_50382__$1;
(statearr_50526_52363[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50386 === (18))){
var inst_50296 = (state_50382[(2)]);
var state_50382__$1 = state_50382;
var statearr_50528_52364 = state_50382__$1;
(statearr_50528_52364[(2)] = inst_50296);

(statearr_50528_52364[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50386 === (42))){
var state_50382__$1 = state_50382;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_50382__$1,(45),dchan);
} else {
if((state_val_50386 === (37))){
var inst_50222 = (state_50382[(9)]);
var inst_50346 = (state_50382[(22)]);
var inst_50336 = (state_50382[(23)]);
var inst_50346__$1 = cljs.core.first(inst_50336);
var inst_50347 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3(inst_50346__$1,inst_50222,done);
var state_50382__$1 = (function (){var statearr_50532 = state_50382;
(statearr_50532[(22)] = inst_50346__$1);

return statearr_50532;
})();
if(cljs.core.truth_(inst_50347)){
var statearr_50533_52365 = state_50382__$1;
(statearr_50533_52365[(1)] = (39));

} else {
var statearr_50534_52368 = state_50382__$1;
(statearr_50534_52368[(1)] = (40));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50386 === (8))){
var inst_50236 = (state_50382[(13)]);
var inst_50235 = (state_50382[(17)]);
var inst_50242 = (inst_50236 < inst_50235);
var inst_50243 = inst_50242;
var state_50382__$1 = state_50382;
if(cljs.core.truth_(inst_50243)){
var statearr_50535_52373 = state_50382__$1;
(statearr_50535_52373[(1)] = (10));

} else {
var statearr_50538_52374 = state_50382__$1;
(statearr_50538_52374[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$mult_$_state_machine__48630__auto__ = null;
var cljs$core$async$mult_$_state_machine__48630__auto____0 = (function (){
var statearr_50541 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_50541[(0)] = cljs$core$async$mult_$_state_machine__48630__auto__);

(statearr_50541[(1)] = (1));

return statearr_50541;
});
var cljs$core$async$mult_$_state_machine__48630__auto____1 = (function (state_50382){
while(true){
var ret_value__48631__auto__ = (function (){try{while(true){
var result__48632__auto__ = switch__48629__auto__(state_50382);
if(cljs.core.keyword_identical_QMARK_(result__48632__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__48632__auto__;
}
break;
}
}catch (e50543){var ex__48633__auto__ = e50543;
var statearr_50545_52378 = state_50382;
(statearr_50545_52378[(2)] = ex__48633__auto__);


if(cljs.core.seq((state_50382[(4)]))){
var statearr_50546_52379 = state_50382;
(statearr_50546_52379[(1)] = cljs.core.first((state_50382[(4)])));

} else {
throw ex__48633__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__48631__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__52380 = state_50382;
state_50382 = G__52380;
continue;
} else {
return ret_value__48631__auto__;
}
break;
}
});
cljs$core$async$mult_$_state_machine__48630__auto__ = function(state_50382){
switch(arguments.length){
case 0:
return cljs$core$async$mult_$_state_machine__48630__auto____0.call(this);
case 1:
return cljs$core$async$mult_$_state_machine__48630__auto____1.call(this,state_50382);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mult_$_state_machine__48630__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mult_$_state_machine__48630__auto____0;
cljs$core$async$mult_$_state_machine__48630__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mult_$_state_machine__48630__auto____1;
return cljs$core$async$mult_$_state_machine__48630__auto__;
})()
})();
var state__49007__auto__ = (function (){var statearr_50549 = f__49006__auto__();
(statearr_50549[(6)] = c__49005__auto___52273);

return statearr_50549;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__49007__auto__);
}));


return m;
});
/**
 * Copies the mult source onto the supplied channel.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.tap = (function cljs$core$async$tap(var_args){
var G__50559 = arguments.length;
switch (G__50559) {
case 2:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2 = (function (mult,ch){
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3(mult,ch,true);
}));

(cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3 = (function (mult,ch,close_QMARK_){
cljs.core.async.tap_STAR_(mult,ch,close_QMARK_);

return ch;
}));

(cljs.core.async.tap.cljs$lang$maxFixedArity = 3);

/**
 * Disconnects a target channel from a mult
 */
cljs.core.async.untap = (function cljs$core$async$untap(mult,ch){
return cljs.core.async.untap_STAR_(mult,ch);
});
/**
 * Disconnects all target channels from a mult
 */
cljs.core.async.untap_all = (function cljs$core$async$untap_all(mult){
return cljs.core.async.untap_all_STAR_(mult);
});

/**
 * @interface
 */
cljs.core.async.Mix = function(){};

var cljs$core$async$Mix$admix_STAR_$dyn_52385 = (function (m,ch){
var x__4509__auto__ = (((m == null))?null:m);
var m__4510__auto__ = (cljs.core.async.admix_STAR_[goog.typeOf(x__4509__auto__)]);
if((!((m__4510__auto__ == null)))){
return (m__4510__auto__.cljs$core$IFn$_invoke$arity$2 ? m__4510__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__4510__auto__.call(null,m,ch));
} else {
var m__4508__auto__ = (cljs.core.async.admix_STAR_["_"]);
if((!((m__4508__auto__ == null)))){
return (m__4508__auto__.cljs$core$IFn$_invoke$arity$2 ? m__4508__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__4508__auto__.call(null,m,ch));
} else {
throw cljs.core.missing_protocol("Mix.admix*",m);
}
}
});
cljs.core.async.admix_STAR_ = (function cljs$core$async$admix_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$admix_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$admix_STAR_$arity$2(m,ch);
} else {
return cljs$core$async$Mix$admix_STAR_$dyn_52385(m,ch);
}
});

var cljs$core$async$Mix$unmix_STAR_$dyn_52386 = (function (m,ch){
var x__4509__auto__ = (((m == null))?null:m);
var m__4510__auto__ = (cljs.core.async.unmix_STAR_[goog.typeOf(x__4509__auto__)]);
if((!((m__4510__auto__ == null)))){
return (m__4510__auto__.cljs$core$IFn$_invoke$arity$2 ? m__4510__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__4510__auto__.call(null,m,ch));
} else {
var m__4508__auto__ = (cljs.core.async.unmix_STAR_["_"]);
if((!((m__4508__auto__ == null)))){
return (m__4508__auto__.cljs$core$IFn$_invoke$arity$2 ? m__4508__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__4508__auto__.call(null,m,ch));
} else {
throw cljs.core.missing_protocol("Mix.unmix*",m);
}
}
});
cljs.core.async.unmix_STAR_ = (function cljs$core$async$unmix_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$unmix_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$unmix_STAR_$arity$2(m,ch);
} else {
return cljs$core$async$Mix$unmix_STAR_$dyn_52386(m,ch);
}
});

var cljs$core$async$Mix$unmix_all_STAR_$dyn_52395 = (function (m){
var x__4509__auto__ = (((m == null))?null:m);
var m__4510__auto__ = (cljs.core.async.unmix_all_STAR_[goog.typeOf(x__4509__auto__)]);
if((!((m__4510__auto__ == null)))){
return (m__4510__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4510__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__4510__auto__.call(null,m));
} else {
var m__4508__auto__ = (cljs.core.async.unmix_all_STAR_["_"]);
if((!((m__4508__auto__ == null)))){
return (m__4508__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4508__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__4508__auto__.call(null,m));
} else {
throw cljs.core.missing_protocol("Mix.unmix-all*",m);
}
}
});
cljs.core.async.unmix_all_STAR_ = (function cljs$core$async$unmix_all_STAR_(m){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$unmix_all_STAR_$arity$1 == null)))))){
return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1(m);
} else {
return cljs$core$async$Mix$unmix_all_STAR_$dyn_52395(m);
}
});

var cljs$core$async$Mix$toggle_STAR_$dyn_52396 = (function (m,state_map){
var x__4509__auto__ = (((m == null))?null:m);
var m__4510__auto__ = (cljs.core.async.toggle_STAR_[goog.typeOf(x__4509__auto__)]);
if((!((m__4510__auto__ == null)))){
return (m__4510__auto__.cljs$core$IFn$_invoke$arity$2 ? m__4510__auto__.cljs$core$IFn$_invoke$arity$2(m,state_map) : m__4510__auto__.call(null,m,state_map));
} else {
var m__4508__auto__ = (cljs.core.async.toggle_STAR_["_"]);
if((!((m__4508__auto__ == null)))){
return (m__4508__auto__.cljs$core$IFn$_invoke$arity$2 ? m__4508__auto__.cljs$core$IFn$_invoke$arity$2(m,state_map) : m__4508__auto__.call(null,m,state_map));
} else {
throw cljs.core.missing_protocol("Mix.toggle*",m);
}
}
});
cljs.core.async.toggle_STAR_ = (function cljs$core$async$toggle_STAR_(m,state_map){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$toggle_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$toggle_STAR_$arity$2(m,state_map);
} else {
return cljs$core$async$Mix$toggle_STAR_$dyn_52396(m,state_map);
}
});

var cljs$core$async$Mix$solo_mode_STAR_$dyn_52408 = (function (m,mode){
var x__4509__auto__ = (((m == null))?null:m);
var m__4510__auto__ = (cljs.core.async.solo_mode_STAR_[goog.typeOf(x__4509__auto__)]);
if((!((m__4510__auto__ == null)))){
return (m__4510__auto__.cljs$core$IFn$_invoke$arity$2 ? m__4510__auto__.cljs$core$IFn$_invoke$arity$2(m,mode) : m__4510__auto__.call(null,m,mode));
} else {
var m__4508__auto__ = (cljs.core.async.solo_mode_STAR_["_"]);
if((!((m__4508__auto__ == null)))){
return (m__4508__auto__.cljs$core$IFn$_invoke$arity$2 ? m__4508__auto__.cljs$core$IFn$_invoke$arity$2(m,mode) : m__4508__auto__.call(null,m,mode));
} else {
throw cljs.core.missing_protocol("Mix.solo-mode*",m);
}
}
});
cljs.core.async.solo_mode_STAR_ = (function cljs$core$async$solo_mode_STAR_(m,mode){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$solo_mode_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2(m,mode);
} else {
return cljs$core$async$Mix$solo_mode_STAR_$dyn_52408(m,mode);
}
});

cljs.core.async.ioc_alts_BANG_ = (function cljs$core$async$ioc_alts_BANG_(var_args){
var args__4824__auto__ = [];
var len__4818__auto___52410 = arguments.length;
var i__4819__auto___52411 = (0);
while(true){
if((i__4819__auto___52411 < len__4818__auto___52410)){
args__4824__auto__.push((arguments[i__4819__auto___52411]));

var G__52412 = (i__4819__auto___52411 + (1));
i__4819__auto___52411 = G__52412;
continue;
} else {
}
break;
}

var argseq__4825__auto__ = ((((3) < args__4824__auto__.length))?(new cljs.core.IndexedSeq(args__4824__auto__.slice((3)),(0),null)):null);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__4825__auto__);
});

(cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (state,cont_block,ports,p__50615){
var map__50616 = p__50615;
var map__50616__$1 = cljs.core.__destructure_map(map__50616);
var opts = map__50616__$1;
var statearr_50617_52413 = state;
(statearr_50617_52413[(1)] = cont_block);


var temp__5753__auto__ = cljs.core.async.do_alts((function (val){
var statearr_50618_52414 = state;
(statearr_50618_52414[(2)] = val);


return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state);
}),ports,opts);
if(cljs.core.truth_(temp__5753__auto__)){
var cb = temp__5753__auto__;
var statearr_50625_52415 = state;
(statearr_50625_52415[(2)] = cljs.core.deref(cb));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}));

(cljs.core.async.ioc_alts_BANG_.cljs$lang$maxFixedArity = (3));

/** @this {Function} */
(cljs.core.async.ioc_alts_BANG_.cljs$lang$applyTo = (function (seq50605){
var G__50606 = cljs.core.first(seq50605);
var seq50605__$1 = cljs.core.next(seq50605);
var G__50607 = cljs.core.first(seq50605__$1);
var seq50605__$2 = cljs.core.next(seq50605__$1);
var G__50608 = cljs.core.first(seq50605__$2);
var seq50605__$3 = cljs.core.next(seq50605__$2);
var self__4805__auto__ = this;
return self__4805__auto__.cljs$core$IFn$_invoke$arity$variadic(G__50606,G__50607,G__50608,seq50605__$3);
}));

/**
 * Creates and returns a mix of one or more input channels which will
 *   be put on the supplied out channel. Input sources can be added to
 *   the mix with 'admix', and removed with 'unmix'. A mix supports
 *   soloing, muting and pausing multiple inputs atomically using
 *   'toggle', and can solo using either muting or pausing as determined
 *   by 'solo-mode'.
 * 
 *   Each channel can have zero or more boolean modes set via 'toggle':
 * 
 *   :solo - when true, only this (ond other soloed) channel(s) will appear
 *        in the mix output channel. :mute and :pause states of soloed
 *        channels are ignored. If solo-mode is :mute, non-soloed
 *        channels are muted, if :pause, non-soloed channels are
 *        paused.
 * 
 *   :mute - muted channels will have their contents consumed but not included in the mix
 *   :pause - paused channels will not have their contents consumed (and thus also not included in the mix)
 */
cljs.core.async.mix = (function cljs$core$async$mix(out){
var cs = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var solo_modes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pause","pause",-2095325672),null,new cljs.core.Keyword(null,"mute","mute",1151223646),null], null), null);
var attrs = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(solo_modes,new cljs.core.Keyword(null,"solo","solo",-316350075));
var solo_mode = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"mute","mute",1151223646));
var change = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(cljs.core.async.sliding_buffer((1)));
var changed = (function (){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(change,true);
});
var pick = (function (attr,chs){
return cljs.core.reduce_kv((function (ret,c,v){
if(cljs.core.truth_((attr.cljs$core$IFn$_invoke$arity$1 ? attr.cljs$core$IFn$_invoke$arity$1(v) : attr.call(null,v)))){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(ret,c);
} else {
return ret;
}
}),cljs.core.PersistentHashSet.EMPTY,chs);
});
var calc_state = (function (){
var chs = cljs.core.deref(cs);
var mode = cljs.core.deref(solo_mode);
var solos = pick(new cljs.core.Keyword(null,"solo","solo",-316350075),chs);
var pauses = pick(new cljs.core.Keyword(null,"pause","pause",-2095325672),chs);
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"solos","solos",1441458643),solos,new cljs.core.Keyword(null,"mutes","mutes",1068806309),pick(new cljs.core.Keyword(null,"mute","mute",1151223646),chs),new cljs.core.Keyword(null,"reads","reads",-1215067361),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(((((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(mode,new cljs.core.Keyword(null,"pause","pause",-2095325672))) && ((!(cljs.core.empty_QMARK_(solos))))))?cljs.core.vec(solos):cljs.core.vec(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(pauses,cljs.core.keys(chs)))),change)], null);
});
var m = (function (){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async50640 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mix}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async50640 = (function (change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta50641){
this.change = change;
this.solo_mode = solo_mode;
this.pick = pick;
this.cs = cs;
this.calc_state = calc_state;
this.out = out;
this.changed = changed;
this.solo_modes = solo_modes;
this.attrs = attrs;
this.meta50641 = meta50641;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async50640.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_50642,meta50641__$1){
var self__ = this;
var _50642__$1 = this;
return (new cljs.core.async.t_cljs$core$async50640(self__.change,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta50641__$1));
}));

(cljs.core.async.t_cljs$core$async50640.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_50642){
var self__ = this;
var _50642__$1 = this;
return self__.meta50641;
}));

(cljs.core.async.t_cljs$core$async50640.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async50640.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.out;
}));

(cljs.core.async.t_cljs$core$async50640.prototype.cljs$core$async$Mix$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async50640.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async50640.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.dissoc,ch);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async50640.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async50640.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = (function (_,state_map){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core.merge_with,cljs.core.merge),state_map);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async50640.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = (function (_,mode){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_((self__.solo_modes.cljs$core$IFn$_invoke$arity$1 ? self__.solo_modes.cljs$core$IFn$_invoke$arity$1(mode) : self__.solo_modes.call(null,mode)))){
} else {
throw (new Error(["Assert failed: ",["mode must be one of: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.solo_modes)].join(''),"\n","(solo-modes mode)"].join('')));
}

cljs.core.reset_BANG_(self__.solo_mode,mode);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async50640.getBasis = (function (){
return new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"change","change",477485025,null),new cljs.core.Symbol(null,"solo-mode","solo-mode",2031788074,null),new cljs.core.Symbol(null,"pick","pick",1300068175,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"calc-state","calc-state",-349968968,null),new cljs.core.Symbol(null,"out","out",729986010,null),new cljs.core.Symbol(null,"changed","changed",-2083710852,null),new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"attrs","attrs",-450137186,null),new cljs.core.Symbol(null,"meta50641","meta50641",216350265,null)], null);
}));

(cljs.core.async.t_cljs$core$async50640.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async50640.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async50640");

(cljs.core.async.t_cljs$core$async50640.cljs$lang$ctorPrWriter = (function (this__4450__auto__,writer__4451__auto__,opt__4452__auto__){
return cljs.core._write(writer__4451__auto__,"cljs.core.async/t_cljs$core$async50640");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async50640.
 */
cljs.core.async.__GT_t_cljs$core$async50640 = (function cljs$core$async$mix_$___GT_t_cljs$core$async50640(change__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta50641){
return (new cljs.core.async.t_cljs$core$async50640(change__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta50641));
});

}

return (new cljs.core.async.t_cljs$core$async50640(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__49005__auto___52437 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__49006__auto__ = (function (){var switch__48629__auto__ = (function (state_50734){
var state_val_50735 = (state_50734[(1)]);
if((state_val_50735 === (7))){
var inst_50689 = (state_50734[(2)]);
var state_50734__$1 = state_50734;
if(cljs.core.truth_(inst_50689)){
var statearr_50741_52438 = state_50734__$1;
(statearr_50741_52438[(1)] = (8));

} else {
var statearr_50742_52439 = state_50734__$1;
(statearr_50742_52439[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50735 === (20))){
var inst_50680 = (state_50734[(7)]);
var state_50734__$1 = state_50734;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_50734__$1,(23),out,inst_50680);
} else {
if((state_val_50735 === (1))){
var inst_50661 = calc_state();
var inst_50662 = cljs.core.__destructure_map(inst_50661);
var inst_50663 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_50662,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_50664 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_50662,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_50666 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_50662,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var inst_50667 = inst_50661;
var state_50734__$1 = (function (){var statearr_50743 = state_50734;
(statearr_50743[(8)] = inst_50664);

(statearr_50743[(9)] = inst_50667);

(statearr_50743[(10)] = inst_50663);

(statearr_50743[(11)] = inst_50666);

return statearr_50743;
})();
var statearr_50744_52440 = state_50734__$1;
(statearr_50744_52440[(2)] = null);

(statearr_50744_52440[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50735 === (24))){
var inst_50670 = (state_50734[(12)]);
var inst_50667 = inst_50670;
var state_50734__$1 = (function (){var statearr_50748 = state_50734;
(statearr_50748[(9)] = inst_50667);

return statearr_50748;
})();
var statearr_50749_52442 = state_50734__$1;
(statearr_50749_52442[(2)] = null);

(statearr_50749_52442[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50735 === (4))){
var inst_50684 = (state_50734[(13)]);
var inst_50680 = (state_50734[(7)]);
var inst_50679 = (state_50734[(2)]);
var inst_50680__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_50679,(0),null);
var inst_50681 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_50679,(1),null);
var inst_50684__$1 = (inst_50680__$1 == null);
var state_50734__$1 = (function (){var statearr_50754 = state_50734;
(statearr_50754[(14)] = inst_50681);

(statearr_50754[(13)] = inst_50684__$1);

(statearr_50754[(7)] = inst_50680__$1);

return statearr_50754;
})();
if(cljs.core.truth_(inst_50684__$1)){
var statearr_50756_52443 = state_50734__$1;
(statearr_50756_52443[(1)] = (5));

} else {
var statearr_50758_52444 = state_50734__$1;
(statearr_50758_52444[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50735 === (15))){
var inst_50671 = (state_50734[(15)]);
var inst_50705 = (state_50734[(16)]);
var inst_50705__$1 = cljs.core.empty_QMARK_(inst_50671);
var state_50734__$1 = (function (){var statearr_50761 = state_50734;
(statearr_50761[(16)] = inst_50705__$1);

return statearr_50761;
})();
if(inst_50705__$1){
var statearr_50762_52450 = state_50734__$1;
(statearr_50762_52450[(1)] = (17));

} else {
var statearr_50763_52451 = state_50734__$1;
(statearr_50763_52451[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50735 === (21))){
var inst_50670 = (state_50734[(12)]);
var inst_50667 = inst_50670;
var state_50734__$1 = (function (){var statearr_50764 = state_50734;
(statearr_50764[(9)] = inst_50667);

return statearr_50764;
})();
var statearr_50765_52452 = state_50734__$1;
(statearr_50765_52452[(2)] = null);

(statearr_50765_52452[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50735 === (13))){
var inst_50696 = (state_50734[(2)]);
var inst_50697 = calc_state();
var inst_50667 = inst_50697;
var state_50734__$1 = (function (){var statearr_50766 = state_50734;
(statearr_50766[(17)] = inst_50696);

(statearr_50766[(9)] = inst_50667);

return statearr_50766;
})();
var statearr_50767_52453 = state_50734__$1;
(statearr_50767_52453[(2)] = null);

(statearr_50767_52453[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50735 === (22))){
var inst_50727 = (state_50734[(2)]);
var state_50734__$1 = state_50734;
var statearr_50768_52454 = state_50734__$1;
(statearr_50768_52454[(2)] = inst_50727);

(statearr_50768_52454[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50735 === (6))){
var inst_50681 = (state_50734[(14)]);
var inst_50687 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_50681,change);
var state_50734__$1 = state_50734;
var statearr_50769_52457 = state_50734__$1;
(statearr_50769_52457[(2)] = inst_50687);

(statearr_50769_52457[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50735 === (25))){
var state_50734__$1 = state_50734;
var statearr_50771_52458 = state_50734__$1;
(statearr_50771_52458[(2)] = null);

(statearr_50771_52458[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50735 === (17))){
var inst_50681 = (state_50734[(14)]);
var inst_50672 = (state_50734[(18)]);
var inst_50708 = (inst_50672.cljs$core$IFn$_invoke$arity$1 ? inst_50672.cljs$core$IFn$_invoke$arity$1(inst_50681) : inst_50672.call(null,inst_50681));
var inst_50709 = cljs.core.not(inst_50708);
var state_50734__$1 = state_50734;
var statearr_50773_52465 = state_50734__$1;
(statearr_50773_52465[(2)] = inst_50709);

(statearr_50773_52465[(1)] = (19));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50735 === (3))){
var inst_50732 = (state_50734[(2)]);
var state_50734__$1 = state_50734;
return cljs.core.async.impl.ioc_helpers.return_chan(state_50734__$1,inst_50732);
} else {
if((state_val_50735 === (12))){
var state_50734__$1 = state_50734;
var statearr_50775_52466 = state_50734__$1;
(statearr_50775_52466[(2)] = null);

(statearr_50775_52466[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50735 === (2))){
var inst_50667 = (state_50734[(9)]);
var inst_50670 = (state_50734[(12)]);
var inst_50670__$1 = cljs.core.__destructure_map(inst_50667);
var inst_50671 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_50670__$1,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_50672 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_50670__$1,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_50673 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_50670__$1,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var state_50734__$1 = (function (){var statearr_50781 = state_50734;
(statearr_50781[(15)] = inst_50671);

(statearr_50781[(12)] = inst_50670__$1);

(statearr_50781[(18)] = inst_50672);

return statearr_50781;
})();
return cljs.core.async.ioc_alts_BANG_(state_50734__$1,(4),inst_50673);
} else {
if((state_val_50735 === (23))){
var inst_50717 = (state_50734[(2)]);
var state_50734__$1 = state_50734;
if(cljs.core.truth_(inst_50717)){
var statearr_50786_52467 = state_50734__$1;
(statearr_50786_52467[(1)] = (24));

} else {
var statearr_50787_52468 = state_50734__$1;
(statearr_50787_52468[(1)] = (25));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50735 === (19))){
var inst_50712 = (state_50734[(2)]);
var state_50734__$1 = state_50734;
var statearr_50789_52469 = state_50734__$1;
(statearr_50789_52469[(2)] = inst_50712);

(statearr_50789_52469[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50735 === (11))){
var inst_50681 = (state_50734[(14)]);
var inst_50693 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(cs,cljs.core.dissoc,inst_50681);
var state_50734__$1 = state_50734;
var statearr_50790_52470 = state_50734__$1;
(statearr_50790_52470[(2)] = inst_50693);

(statearr_50790_52470[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50735 === (9))){
var inst_50681 = (state_50734[(14)]);
var inst_50700 = (state_50734[(19)]);
var inst_50671 = (state_50734[(15)]);
var inst_50700__$1 = (inst_50671.cljs$core$IFn$_invoke$arity$1 ? inst_50671.cljs$core$IFn$_invoke$arity$1(inst_50681) : inst_50671.call(null,inst_50681));
var state_50734__$1 = (function (){var statearr_50791 = state_50734;
(statearr_50791[(19)] = inst_50700__$1);

return statearr_50791;
})();
if(cljs.core.truth_(inst_50700__$1)){
var statearr_50792_52474 = state_50734__$1;
(statearr_50792_52474[(1)] = (14));

} else {
var statearr_50793_52475 = state_50734__$1;
(statearr_50793_52475[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50735 === (5))){
var inst_50684 = (state_50734[(13)]);
var state_50734__$1 = state_50734;
var statearr_50795_52476 = state_50734__$1;
(statearr_50795_52476[(2)] = inst_50684);

(statearr_50795_52476[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50735 === (14))){
var inst_50700 = (state_50734[(19)]);
var state_50734__$1 = state_50734;
var statearr_50796_52477 = state_50734__$1;
(statearr_50796_52477[(2)] = inst_50700);

(statearr_50796_52477[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50735 === (26))){
var inst_50723 = (state_50734[(2)]);
var state_50734__$1 = state_50734;
var statearr_50797_52478 = state_50734__$1;
(statearr_50797_52478[(2)] = inst_50723);

(statearr_50797_52478[(1)] = (22));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50735 === (16))){
var inst_50714 = (state_50734[(2)]);
var state_50734__$1 = state_50734;
if(cljs.core.truth_(inst_50714)){
var statearr_50801_52479 = state_50734__$1;
(statearr_50801_52479[(1)] = (20));

} else {
var statearr_50807_52480 = state_50734__$1;
(statearr_50807_52480[(1)] = (21));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50735 === (10))){
var inst_50729 = (state_50734[(2)]);
var state_50734__$1 = state_50734;
var statearr_50808_52481 = state_50734__$1;
(statearr_50808_52481[(2)] = inst_50729);

(statearr_50808_52481[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50735 === (18))){
var inst_50705 = (state_50734[(16)]);
var state_50734__$1 = state_50734;
var statearr_50809_52482 = state_50734__$1;
(statearr_50809_52482[(2)] = inst_50705);

(statearr_50809_52482[(1)] = (19));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50735 === (8))){
var inst_50680 = (state_50734[(7)]);
var inst_50691 = (inst_50680 == null);
var state_50734__$1 = state_50734;
if(cljs.core.truth_(inst_50691)){
var statearr_50810_52484 = state_50734__$1;
(statearr_50810_52484[(1)] = (11));

} else {
var statearr_50811_52485 = state_50734__$1;
(statearr_50811_52485[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$mix_$_state_machine__48630__auto__ = null;
var cljs$core$async$mix_$_state_machine__48630__auto____0 = (function (){
var statearr_50812 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_50812[(0)] = cljs$core$async$mix_$_state_machine__48630__auto__);

(statearr_50812[(1)] = (1));

return statearr_50812;
});
var cljs$core$async$mix_$_state_machine__48630__auto____1 = (function (state_50734){
while(true){
var ret_value__48631__auto__ = (function (){try{while(true){
var result__48632__auto__ = switch__48629__auto__(state_50734);
if(cljs.core.keyword_identical_QMARK_(result__48632__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__48632__auto__;
}
break;
}
}catch (e50814){var ex__48633__auto__ = e50814;
var statearr_50815_52492 = state_50734;
(statearr_50815_52492[(2)] = ex__48633__auto__);


if(cljs.core.seq((state_50734[(4)]))){
var statearr_50818_52493 = state_50734;
(statearr_50818_52493[(1)] = cljs.core.first((state_50734[(4)])));

} else {
throw ex__48633__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__48631__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__52494 = state_50734;
state_50734 = G__52494;
continue;
} else {
return ret_value__48631__auto__;
}
break;
}
});
cljs$core$async$mix_$_state_machine__48630__auto__ = function(state_50734){
switch(arguments.length){
case 0:
return cljs$core$async$mix_$_state_machine__48630__auto____0.call(this);
case 1:
return cljs$core$async$mix_$_state_machine__48630__auto____1.call(this,state_50734);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mix_$_state_machine__48630__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mix_$_state_machine__48630__auto____0;
cljs$core$async$mix_$_state_machine__48630__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mix_$_state_machine__48630__auto____1;
return cljs$core$async$mix_$_state_machine__48630__auto__;
})()
})();
var state__49007__auto__ = (function (){var statearr_50819 = f__49006__auto__();
(statearr_50819[(6)] = c__49005__auto___52437);

return statearr_50819;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__49007__auto__);
}));


return m;
});
/**
 * Adds ch as an input to the mix
 */
cljs.core.async.admix = (function cljs$core$async$admix(mix,ch){
return cljs.core.async.admix_STAR_(mix,ch);
});
/**
 * Removes ch as an input to the mix
 */
cljs.core.async.unmix = (function cljs$core$async$unmix(mix,ch){
return cljs.core.async.unmix_STAR_(mix,ch);
});
/**
 * removes all inputs from the mix
 */
cljs.core.async.unmix_all = (function cljs$core$async$unmix_all(mix){
return cljs.core.async.unmix_all_STAR_(mix);
});
/**
 * Atomically sets the state(s) of one or more channels in a mix. The
 *   state map is a map of channels -> channel-state-map. A
 *   channel-state-map is a map of attrs -> boolean, where attr is one or
 *   more of :mute, :pause or :solo. Any states supplied are merged with
 *   the current state.
 * 
 *   Note that channels can be added to a mix via toggle, which can be
 *   used to add channels in a particular (e.g. paused) state.
 */
cljs.core.async.toggle = (function cljs$core$async$toggle(mix,state_map){
return cljs.core.async.toggle_STAR_(mix,state_map);
});
/**
 * Sets the solo mode of the mix. mode must be one of :mute or :pause
 */
cljs.core.async.solo_mode = (function cljs$core$async$solo_mode(mix,mode){
return cljs.core.async.solo_mode_STAR_(mix,mode);
});

/**
 * @interface
 */
cljs.core.async.Pub = function(){};

var cljs$core$async$Pub$sub_STAR_$dyn_52496 = (function (p,v,ch,close_QMARK_){
var x__4509__auto__ = (((p == null))?null:p);
var m__4510__auto__ = (cljs.core.async.sub_STAR_[goog.typeOf(x__4509__auto__)]);
if((!((m__4510__auto__ == null)))){
return (m__4510__auto__.cljs$core$IFn$_invoke$arity$4 ? m__4510__auto__.cljs$core$IFn$_invoke$arity$4(p,v,ch,close_QMARK_) : m__4510__auto__.call(null,p,v,ch,close_QMARK_));
} else {
var m__4508__auto__ = (cljs.core.async.sub_STAR_["_"]);
if((!((m__4508__auto__ == null)))){
return (m__4508__auto__.cljs$core$IFn$_invoke$arity$4 ? m__4508__auto__.cljs$core$IFn$_invoke$arity$4(p,v,ch,close_QMARK_) : m__4508__auto__.call(null,p,v,ch,close_QMARK_));
} else {
throw cljs.core.missing_protocol("Pub.sub*",p);
}
}
});
cljs.core.async.sub_STAR_ = (function cljs$core$async$sub_STAR_(p,v,ch,close_QMARK_){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$sub_STAR_$arity$4 == null)))))){
return p.cljs$core$async$Pub$sub_STAR_$arity$4(p,v,ch,close_QMARK_);
} else {
return cljs$core$async$Pub$sub_STAR_$dyn_52496(p,v,ch,close_QMARK_);
}
});

var cljs$core$async$Pub$unsub_STAR_$dyn_52502 = (function (p,v,ch){
var x__4509__auto__ = (((p == null))?null:p);
var m__4510__auto__ = (cljs.core.async.unsub_STAR_[goog.typeOf(x__4509__auto__)]);
if((!((m__4510__auto__ == null)))){
return (m__4510__auto__.cljs$core$IFn$_invoke$arity$3 ? m__4510__auto__.cljs$core$IFn$_invoke$arity$3(p,v,ch) : m__4510__auto__.call(null,p,v,ch));
} else {
var m__4508__auto__ = (cljs.core.async.unsub_STAR_["_"]);
if((!((m__4508__auto__ == null)))){
return (m__4508__auto__.cljs$core$IFn$_invoke$arity$3 ? m__4508__auto__.cljs$core$IFn$_invoke$arity$3(p,v,ch) : m__4508__auto__.call(null,p,v,ch));
} else {
throw cljs.core.missing_protocol("Pub.unsub*",p);
}
}
});
cljs.core.async.unsub_STAR_ = (function cljs$core$async$unsub_STAR_(p,v,ch){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_STAR_$arity$3 == null)))))){
return p.cljs$core$async$Pub$unsub_STAR_$arity$3(p,v,ch);
} else {
return cljs$core$async$Pub$unsub_STAR_$dyn_52502(p,v,ch);
}
});

var cljs$core$async$Pub$unsub_all_STAR_$dyn_52506 = (function() {
var G__52507 = null;
var G__52507__1 = (function (p){
var x__4509__auto__ = (((p == null))?null:p);
var m__4510__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__4509__auto__)]);
if((!((m__4510__auto__ == null)))){
return (m__4510__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4510__auto__.cljs$core$IFn$_invoke$arity$1(p) : m__4510__auto__.call(null,p));
} else {
var m__4508__auto__ = (cljs.core.async.unsub_all_STAR_["_"]);
if((!((m__4508__auto__ == null)))){
return (m__4508__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4508__auto__.cljs$core$IFn$_invoke$arity$1(p) : m__4508__auto__.call(null,p));
} else {
throw cljs.core.missing_protocol("Pub.unsub-all*",p);
}
}
});
var G__52507__2 = (function (p,v){
var x__4509__auto__ = (((p == null))?null:p);
var m__4510__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__4509__auto__)]);
if((!((m__4510__auto__ == null)))){
return (m__4510__auto__.cljs$core$IFn$_invoke$arity$2 ? m__4510__auto__.cljs$core$IFn$_invoke$arity$2(p,v) : m__4510__auto__.call(null,p,v));
} else {
var m__4508__auto__ = (cljs.core.async.unsub_all_STAR_["_"]);
if((!((m__4508__auto__ == null)))){
return (m__4508__auto__.cljs$core$IFn$_invoke$arity$2 ? m__4508__auto__.cljs$core$IFn$_invoke$arity$2(p,v) : m__4508__auto__.call(null,p,v));
} else {
throw cljs.core.missing_protocol("Pub.unsub-all*",p);
}
}
});
G__52507 = function(p,v){
switch(arguments.length){
case 1:
return G__52507__1.call(this,p);
case 2:
return G__52507__2.call(this,p,v);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
G__52507.cljs$core$IFn$_invoke$arity$1 = G__52507__1;
G__52507.cljs$core$IFn$_invoke$arity$2 = G__52507__2;
return G__52507;
})()
;
cljs.core.async.unsub_all_STAR_ = (function cljs$core$async$unsub_all_STAR_(var_args){
var G__50839 = arguments.length;
switch (G__50839) {
case 1:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1 = (function (p){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$1 == null)))))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1(p);
} else {
return cljs$core$async$Pub$unsub_all_STAR_$dyn_52506(p);
}
}));

(cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2 = (function (p,v){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$2 == null)))))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else {
return cljs$core$async$Pub$unsub_all_STAR_$dyn_52506(p,v);
}
}));

(cljs.core.async.unsub_all_STAR_.cljs$lang$maxFixedArity = 2);


/**
 * Creates and returns a pub(lication) of the supplied channel,
 *   partitioned into topics by the topic-fn. topic-fn will be applied to
 *   each value on the channel and the result will determine the 'topic'
 *   on which that value will be put. Channels can be subscribed to
 *   receive copies of topics using 'sub', and unsubscribed using
 *   'unsub'. Each topic will be handled by an internal mult on a
 *   dedicated channel. By default these internal channels are
 *   unbuffered, but a buf-fn can be supplied which, given a topic,
 *   creates a buffer with desired properties.
 * 
 *   Each item is distributed to all subs in parallel and synchronously,
 *   i.e. each sub must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow subs from holding up the pub.
 * 
 *   Items received when there are no matching subs get dropped.
 * 
 *   Note that if buf-fns are used then each topic is handled
 *   asynchronously, i.e. if a channel is subscribed to more than one
 *   topic it should not expect them to be interleaved identically with
 *   the source.
 */
cljs.core.async.pub = (function cljs$core$async$pub(var_args){
var G__50843 = arguments.length;
switch (G__50843) {
case 2:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2 = (function (ch,topic_fn){
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3(ch,topic_fn,cljs.core.constantly(null));
}));

(cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3 = (function (ch,topic_fn,buf_fn){
var mults = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var ensure_mult = (function (topic){
var or__4212__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(mults),topic);
if(cljs.core.truth_(or__4212__auto__)){
return or__4212__auto__;
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(mults,(function (p1__50841_SHARP_){
if(cljs.core.truth_((p1__50841_SHARP_.cljs$core$IFn$_invoke$arity$1 ? p1__50841_SHARP_.cljs$core$IFn$_invoke$arity$1(topic) : p1__50841_SHARP_.call(null,topic)))){
return p1__50841_SHARP_;
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__50841_SHARP_,topic,cljs.core.async.mult(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((buf_fn.cljs$core$IFn$_invoke$arity$1 ? buf_fn.cljs$core$IFn$_invoke$arity$1(topic) : buf_fn.call(null,topic)))));
}
})),topic);
}
});
var p = (function (){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async50846 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Pub}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async50846 = (function (ch,topic_fn,buf_fn,mults,ensure_mult,meta50847){
this.ch = ch;
this.topic_fn = topic_fn;
this.buf_fn = buf_fn;
this.mults = mults;
this.ensure_mult = ensure_mult;
this.meta50847 = meta50847;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async50846.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_50848,meta50847__$1){
var self__ = this;
var _50848__$1 = this;
return (new cljs.core.async.t_cljs$core$async50846(self__.ch,self__.topic_fn,self__.buf_fn,self__.mults,self__.ensure_mult,meta50847__$1));
}));

(cljs.core.async.t_cljs$core$async50846.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_50848){
var self__ = this;
var _50848__$1 = this;
return self__.meta50847;
}));

(cljs.core.async.t_cljs$core$async50846.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async50846.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
}));

(cljs.core.async.t_cljs$core$async50846.prototype.cljs$core$async$Pub$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async50846.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = (function (p,topic,ch__$1,close_QMARK_){
var self__ = this;
var p__$1 = this;
var m = (self__.ensure_mult.cljs$core$IFn$_invoke$arity$1 ? self__.ensure_mult.cljs$core$IFn$_invoke$arity$1(topic) : self__.ensure_mult.call(null,topic));
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3(m,ch__$1,close_QMARK_);
}));

(cljs.core.async.t_cljs$core$async50846.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = (function (p,topic,ch__$1){
var self__ = this;
var p__$1 = this;
var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(self__.mults),topic);
if(cljs.core.truth_(temp__5753__auto__)){
var m = temp__5753__auto__;
return cljs.core.async.untap(m,ch__$1);
} else {
return null;
}
}));

(cljs.core.async.t_cljs$core$async50846.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.reset_BANG_(self__.mults,cljs.core.PersistentArrayMap.EMPTY);
}));

(cljs.core.async.t_cljs$core$async50846.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = (function (_,topic){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.mults,cljs.core.dissoc,topic);
}));

(cljs.core.async.t_cljs$core$async50846.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"topic-fn","topic-fn",-862449736,null),new cljs.core.Symbol(null,"buf-fn","buf-fn",-1200281591,null),new cljs.core.Symbol(null,"mults","mults",-461114485,null),new cljs.core.Symbol(null,"ensure-mult","ensure-mult",1796584816,null),new cljs.core.Symbol(null,"meta50847","meta50847",-961746968,null)], null);
}));

(cljs.core.async.t_cljs$core$async50846.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async50846.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async50846");

(cljs.core.async.t_cljs$core$async50846.cljs$lang$ctorPrWriter = (function (this__4450__auto__,writer__4451__auto__,opt__4452__auto__){
return cljs.core._write(writer__4451__auto__,"cljs.core.async/t_cljs$core$async50846");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async50846.
 */
cljs.core.async.__GT_t_cljs$core$async50846 = (function cljs$core$async$__GT_t_cljs$core$async50846(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta50847){
return (new cljs.core.async.t_cljs$core$async50846(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta50847));
});

}

return (new cljs.core.async.t_cljs$core$async50846(ch,topic_fn,buf_fn,mults,ensure_mult,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__49005__auto___52521 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__49006__auto__ = (function (){var switch__48629__auto__ = (function (state_50927){
var state_val_50928 = (state_50927[(1)]);
if((state_val_50928 === (7))){
var inst_50923 = (state_50927[(2)]);
var state_50927__$1 = state_50927;
var statearr_50929_52525 = state_50927__$1;
(statearr_50929_52525[(2)] = inst_50923);

(statearr_50929_52525[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50928 === (20))){
var state_50927__$1 = state_50927;
var statearr_50934_52526 = state_50927__$1;
(statearr_50934_52526[(2)] = null);

(statearr_50934_52526[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50928 === (1))){
var state_50927__$1 = state_50927;
var statearr_50935_52527 = state_50927__$1;
(statearr_50935_52527[(2)] = null);

(statearr_50935_52527[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50928 === (24))){
var inst_50906 = (state_50927[(7)]);
var inst_50915 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(mults,cljs.core.dissoc,inst_50906);
var state_50927__$1 = state_50927;
var statearr_50936_52528 = state_50927__$1;
(statearr_50936_52528[(2)] = inst_50915);

(statearr_50936_52528[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50928 === (4))){
var inst_50855 = (state_50927[(8)]);
var inst_50855__$1 = (state_50927[(2)]);
var inst_50856 = (inst_50855__$1 == null);
var state_50927__$1 = (function (){var statearr_50937 = state_50927;
(statearr_50937[(8)] = inst_50855__$1);

return statearr_50937;
})();
if(cljs.core.truth_(inst_50856)){
var statearr_50938_52529 = state_50927__$1;
(statearr_50938_52529[(1)] = (5));

} else {
var statearr_50939_52530 = state_50927__$1;
(statearr_50939_52530[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50928 === (15))){
var inst_50900 = (state_50927[(2)]);
var state_50927__$1 = state_50927;
var statearr_50940_52531 = state_50927__$1;
(statearr_50940_52531[(2)] = inst_50900);

(statearr_50940_52531[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50928 === (21))){
var inst_50920 = (state_50927[(2)]);
var state_50927__$1 = (function (){var statearr_50941 = state_50927;
(statearr_50941[(9)] = inst_50920);

return statearr_50941;
})();
var statearr_50942_52532 = state_50927__$1;
(statearr_50942_52532[(2)] = null);

(statearr_50942_52532[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50928 === (13))){
var inst_50882 = (state_50927[(10)]);
var inst_50884 = cljs.core.chunked_seq_QMARK_(inst_50882);
var state_50927__$1 = state_50927;
if(inst_50884){
var statearr_50943_52533 = state_50927__$1;
(statearr_50943_52533[(1)] = (16));

} else {
var statearr_50944_52534 = state_50927__$1;
(statearr_50944_52534[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50928 === (22))){
var inst_50912 = (state_50927[(2)]);
var state_50927__$1 = state_50927;
if(cljs.core.truth_(inst_50912)){
var statearr_50945_52535 = state_50927__$1;
(statearr_50945_52535[(1)] = (23));

} else {
var statearr_50946_52537 = state_50927__$1;
(statearr_50946_52537[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50928 === (6))){
var inst_50908 = (state_50927[(11)]);
var inst_50906 = (state_50927[(7)]);
var inst_50855 = (state_50927[(8)]);
var inst_50906__$1 = (topic_fn.cljs$core$IFn$_invoke$arity$1 ? topic_fn.cljs$core$IFn$_invoke$arity$1(inst_50855) : topic_fn.call(null,inst_50855));
var inst_50907 = cljs.core.deref(mults);
var inst_50908__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_50907,inst_50906__$1);
var state_50927__$1 = (function (){var statearr_50947 = state_50927;
(statearr_50947[(11)] = inst_50908__$1);

(statearr_50947[(7)] = inst_50906__$1);

return statearr_50947;
})();
if(cljs.core.truth_(inst_50908__$1)){
var statearr_50949_52538 = state_50927__$1;
(statearr_50949_52538[(1)] = (19));

} else {
var statearr_50950_52539 = state_50927__$1;
(statearr_50950_52539[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50928 === (25))){
var inst_50917 = (state_50927[(2)]);
var state_50927__$1 = state_50927;
var statearr_50951_52540 = state_50927__$1;
(statearr_50951_52540[(2)] = inst_50917);

(statearr_50951_52540[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50928 === (17))){
var inst_50882 = (state_50927[(10)]);
var inst_50891 = cljs.core.first(inst_50882);
var inst_50892 = cljs.core.async.muxch_STAR_(inst_50891);
var inst_50893 = cljs.core.async.close_BANG_(inst_50892);
var inst_50894 = cljs.core.next(inst_50882);
var inst_50865 = inst_50894;
var inst_50866 = null;
var inst_50867 = (0);
var inst_50868 = (0);
var state_50927__$1 = (function (){var statearr_50952 = state_50927;
(statearr_50952[(12)] = inst_50865);

(statearr_50952[(13)] = inst_50893);

(statearr_50952[(14)] = inst_50868);

(statearr_50952[(15)] = inst_50866);

(statearr_50952[(16)] = inst_50867);

return statearr_50952;
})();
var statearr_50953_52545 = state_50927__$1;
(statearr_50953_52545[(2)] = null);

(statearr_50953_52545[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50928 === (3))){
var inst_50925 = (state_50927[(2)]);
var state_50927__$1 = state_50927;
return cljs.core.async.impl.ioc_helpers.return_chan(state_50927__$1,inst_50925);
} else {
if((state_val_50928 === (12))){
var inst_50902 = (state_50927[(2)]);
var state_50927__$1 = state_50927;
var statearr_50954_52546 = state_50927__$1;
(statearr_50954_52546[(2)] = inst_50902);

(statearr_50954_52546[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50928 === (2))){
var state_50927__$1 = state_50927;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_50927__$1,(4),ch);
} else {
if((state_val_50928 === (23))){
var state_50927__$1 = state_50927;
var statearr_50958_52547 = state_50927__$1;
(statearr_50958_52547[(2)] = null);

(statearr_50958_52547[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50928 === (19))){
var inst_50908 = (state_50927[(11)]);
var inst_50855 = (state_50927[(8)]);
var inst_50910 = cljs.core.async.muxch_STAR_(inst_50908);
var state_50927__$1 = state_50927;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_50927__$1,(22),inst_50910,inst_50855);
} else {
if((state_val_50928 === (11))){
var inst_50882 = (state_50927[(10)]);
var inst_50865 = (state_50927[(12)]);
var inst_50882__$1 = cljs.core.seq(inst_50865);
var state_50927__$1 = (function (){var statearr_50962 = state_50927;
(statearr_50962[(10)] = inst_50882__$1);

return statearr_50962;
})();
if(inst_50882__$1){
var statearr_50966_52548 = state_50927__$1;
(statearr_50966_52548[(1)] = (13));

} else {
var statearr_50967_52549 = state_50927__$1;
(statearr_50967_52549[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50928 === (9))){
var inst_50904 = (state_50927[(2)]);
var state_50927__$1 = state_50927;
var statearr_50968_52550 = state_50927__$1;
(statearr_50968_52550[(2)] = inst_50904);

(statearr_50968_52550[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50928 === (5))){
var inst_50862 = cljs.core.deref(mults);
var inst_50863 = cljs.core.vals(inst_50862);
var inst_50864 = cljs.core.seq(inst_50863);
var inst_50865 = inst_50864;
var inst_50866 = null;
var inst_50867 = (0);
var inst_50868 = (0);
var state_50927__$1 = (function (){var statearr_50969 = state_50927;
(statearr_50969[(12)] = inst_50865);

(statearr_50969[(14)] = inst_50868);

(statearr_50969[(15)] = inst_50866);

(statearr_50969[(16)] = inst_50867);

return statearr_50969;
})();
var statearr_50970_52551 = state_50927__$1;
(statearr_50970_52551[(2)] = null);

(statearr_50970_52551[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50928 === (14))){
var state_50927__$1 = state_50927;
var statearr_50974_52552 = state_50927__$1;
(statearr_50974_52552[(2)] = null);

(statearr_50974_52552[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50928 === (16))){
var inst_50882 = (state_50927[(10)]);
var inst_50886 = cljs.core.chunk_first(inst_50882);
var inst_50887 = cljs.core.chunk_rest(inst_50882);
var inst_50888 = cljs.core.count(inst_50886);
var inst_50865 = inst_50887;
var inst_50866 = inst_50886;
var inst_50867 = inst_50888;
var inst_50868 = (0);
var state_50927__$1 = (function (){var statearr_50975 = state_50927;
(statearr_50975[(12)] = inst_50865);

(statearr_50975[(14)] = inst_50868);

(statearr_50975[(15)] = inst_50866);

(statearr_50975[(16)] = inst_50867);

return statearr_50975;
})();
var statearr_50976_52553 = state_50927__$1;
(statearr_50976_52553[(2)] = null);

(statearr_50976_52553[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50928 === (10))){
var inst_50865 = (state_50927[(12)]);
var inst_50868 = (state_50927[(14)]);
var inst_50866 = (state_50927[(15)]);
var inst_50867 = (state_50927[(16)]);
var inst_50876 = cljs.core._nth(inst_50866,inst_50868);
var inst_50877 = cljs.core.async.muxch_STAR_(inst_50876);
var inst_50878 = cljs.core.async.close_BANG_(inst_50877);
var inst_50879 = (inst_50868 + (1));
var tmp50971 = inst_50865;
var tmp50972 = inst_50866;
var tmp50973 = inst_50867;
var inst_50865__$1 = tmp50971;
var inst_50866__$1 = tmp50972;
var inst_50867__$1 = tmp50973;
var inst_50868__$1 = inst_50879;
var state_50927__$1 = (function (){var statearr_50980 = state_50927;
(statearr_50980[(12)] = inst_50865__$1);

(statearr_50980[(14)] = inst_50868__$1);

(statearr_50980[(15)] = inst_50866__$1);

(statearr_50980[(17)] = inst_50878);

(statearr_50980[(16)] = inst_50867__$1);

return statearr_50980;
})();
var statearr_50981_52554 = state_50927__$1;
(statearr_50981_52554[(2)] = null);

(statearr_50981_52554[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50928 === (18))){
var inst_50897 = (state_50927[(2)]);
var state_50927__$1 = state_50927;
var statearr_50982_52559 = state_50927__$1;
(statearr_50982_52559[(2)] = inst_50897);

(statearr_50982_52559[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50928 === (8))){
var inst_50868 = (state_50927[(14)]);
var inst_50867 = (state_50927[(16)]);
var inst_50873 = (inst_50868 < inst_50867);
var inst_50874 = inst_50873;
var state_50927__$1 = state_50927;
if(cljs.core.truth_(inst_50874)){
var statearr_50983_52564 = state_50927__$1;
(statearr_50983_52564[(1)] = (10));

} else {
var statearr_50984_52566 = state_50927__$1;
(statearr_50984_52566[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__48630__auto__ = null;
var cljs$core$async$state_machine__48630__auto____0 = (function (){
var statearr_50985 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_50985[(0)] = cljs$core$async$state_machine__48630__auto__);

(statearr_50985[(1)] = (1));

return statearr_50985;
});
var cljs$core$async$state_machine__48630__auto____1 = (function (state_50927){
while(true){
var ret_value__48631__auto__ = (function (){try{while(true){
var result__48632__auto__ = switch__48629__auto__(state_50927);
if(cljs.core.keyword_identical_QMARK_(result__48632__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__48632__auto__;
}
break;
}
}catch (e50986){var ex__48633__auto__ = e50986;
var statearr_50987_52567 = state_50927;
(statearr_50987_52567[(2)] = ex__48633__auto__);


if(cljs.core.seq((state_50927[(4)]))){
var statearr_50991_52568 = state_50927;
(statearr_50991_52568[(1)] = cljs.core.first((state_50927[(4)])));

} else {
throw ex__48633__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__48631__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__52570 = state_50927;
state_50927 = G__52570;
continue;
} else {
return ret_value__48631__auto__;
}
break;
}
});
cljs$core$async$state_machine__48630__auto__ = function(state_50927){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__48630__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__48630__auto____1.call(this,state_50927);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__48630__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__48630__auto____0;
cljs$core$async$state_machine__48630__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__48630__auto____1;
return cljs$core$async$state_machine__48630__auto__;
})()
})();
var state__49007__auto__ = (function (){var statearr_50995 = f__49006__auto__();
(statearr_50995[(6)] = c__49005__auto___52521);

return statearr_50995;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__49007__auto__);
}));


return p;
}));

(cljs.core.async.pub.cljs$lang$maxFixedArity = 3);

/**
 * Subscribes a channel to a topic of a pub.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.sub = (function cljs$core$async$sub(var_args){
var G__50997 = arguments.length;
switch (G__50997) {
case 3:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3 = (function (p,topic,ch){
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4(p,topic,ch,true);
}));

(cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4 = (function (p,topic,ch,close_QMARK_){
return cljs.core.async.sub_STAR_(p,topic,ch,close_QMARK_);
}));

(cljs.core.async.sub.cljs$lang$maxFixedArity = 4);

/**
 * Unsubscribes a channel from a topic of a pub
 */
cljs.core.async.unsub = (function cljs$core$async$unsub(p,topic,ch){
return cljs.core.async.unsub_STAR_(p,topic,ch);
});
/**
 * Unsubscribes all channels from a pub, or a topic of a pub
 */
cljs.core.async.unsub_all = (function cljs$core$async$unsub_all(var_args){
var G__51011 = arguments.length;
switch (G__51011) {
case 1:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1 = (function (p){
return cljs.core.async.unsub_all_STAR_(p);
}));

(cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2 = (function (p,topic){
return cljs.core.async.unsub_all_STAR_(p,topic);
}));

(cljs.core.async.unsub_all.cljs$lang$maxFixedArity = 2);

/**
 * Takes a function and a collection of source channels, and returns a
 *   channel which contains the values produced by applying f to the set
 *   of first items taken from each source channel, followed by applying
 *   f to the set of second items from each channel, until any one of the
 *   channels is closed, at which point the output channel will be
 *   closed. The returned channel will be unbuffered by default, or a
 *   buf-or-n can be supplied
 */
cljs.core.async.map = (function cljs$core$async$map(var_args){
var G__51017 = arguments.length;
switch (G__51017) {
case 2:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.map.cljs$core$IFn$_invoke$arity$2 = (function (f,chs){
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3(f,chs,null);
}));

(cljs.core.async.map.cljs$core$IFn$_invoke$arity$3 = (function (f,chs,buf_or_n){
var chs__$1 = cljs.core.vec(chs);
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var cnt = cljs.core.count(chs__$1);
var rets = cljs.core.object_array.cljs$core$IFn$_invoke$arity$1(cnt);
var dchan = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var dctr = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var done = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (i){
return (function (ret){
(rets[i] = ret);

if((cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(dchan,rets.slice((0)));
} else {
return null;
}
});
}),cljs.core.range.cljs$core$IFn$_invoke$arity$1(cnt));
var c__49005__auto___52594 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__49006__auto__ = (function (){var switch__48629__auto__ = (function (state_51068){
var state_val_51069 = (state_51068[(1)]);
if((state_val_51069 === (7))){
var state_51068__$1 = state_51068;
var statearr_51070_52599 = state_51068__$1;
(statearr_51070_52599[(2)] = null);

(statearr_51070_52599[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51069 === (1))){
var state_51068__$1 = state_51068;
var statearr_51071_52600 = state_51068__$1;
(statearr_51071_52600[(2)] = null);

(statearr_51071_52600[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51069 === (4))){
var inst_51026 = (state_51068[(7)]);
var inst_51025 = (state_51068[(8)]);
var inst_51028 = (inst_51026 < inst_51025);
var state_51068__$1 = state_51068;
if(cljs.core.truth_(inst_51028)){
var statearr_51072_52602 = state_51068__$1;
(statearr_51072_52602[(1)] = (6));

} else {
var statearr_51073_52603 = state_51068__$1;
(statearr_51073_52603[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51069 === (15))){
var inst_51054 = (state_51068[(9)]);
var inst_51059 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(f,inst_51054);
var state_51068__$1 = state_51068;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_51068__$1,(17),out,inst_51059);
} else {
if((state_val_51069 === (13))){
var inst_51054 = (state_51068[(9)]);
var inst_51054__$1 = (state_51068[(2)]);
var inst_51055 = cljs.core.some(cljs.core.nil_QMARK_,inst_51054__$1);
var state_51068__$1 = (function (){var statearr_51074 = state_51068;
(statearr_51074[(9)] = inst_51054__$1);

return statearr_51074;
})();
if(cljs.core.truth_(inst_51055)){
var statearr_51076_52604 = state_51068__$1;
(statearr_51076_52604[(1)] = (14));

} else {
var statearr_51077_52605 = state_51068__$1;
(statearr_51077_52605[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51069 === (6))){
var state_51068__$1 = state_51068;
var statearr_51078_52610 = state_51068__$1;
(statearr_51078_52610[(2)] = null);

(statearr_51078_52610[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51069 === (17))){
var inst_51061 = (state_51068[(2)]);
var state_51068__$1 = (function (){var statearr_51086 = state_51068;
(statearr_51086[(10)] = inst_51061);

return statearr_51086;
})();
var statearr_51087_52611 = state_51068__$1;
(statearr_51087_52611[(2)] = null);

(statearr_51087_52611[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51069 === (3))){
var inst_51066 = (state_51068[(2)]);
var state_51068__$1 = state_51068;
return cljs.core.async.impl.ioc_helpers.return_chan(state_51068__$1,inst_51066);
} else {
if((state_val_51069 === (12))){
var _ = (function (){var statearr_51088 = state_51068;
(statearr_51088[(4)] = cljs.core.rest((state_51068[(4)])));

return statearr_51088;
})();
var state_51068__$1 = state_51068;
var ex51085 = (state_51068__$1[(2)]);
var statearr_51089_52613 = state_51068__$1;
(statearr_51089_52613[(5)] = ex51085);


if((ex51085 instanceof Object)){
var statearr_51090_52614 = state_51068__$1;
(statearr_51090_52614[(1)] = (11));

(statearr_51090_52614[(5)] = null);

} else {
throw ex51085;

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51069 === (2))){
var inst_51024 = cljs.core.reset_BANG_(dctr,cnt);
var inst_51025 = cnt;
var inst_51026 = (0);
var state_51068__$1 = (function (){var statearr_51091 = state_51068;
(statearr_51091[(7)] = inst_51026);

(statearr_51091[(11)] = inst_51024);

(statearr_51091[(8)] = inst_51025);

return statearr_51091;
})();
var statearr_51093_52617 = state_51068__$1;
(statearr_51093_52617[(2)] = null);

(statearr_51093_52617[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51069 === (11))){
var inst_51033 = (state_51068[(2)]);
var inst_51034 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec);
var state_51068__$1 = (function (){var statearr_51094 = state_51068;
(statearr_51094[(12)] = inst_51033);

return statearr_51094;
})();
var statearr_51095_52619 = state_51068__$1;
(statearr_51095_52619[(2)] = inst_51034);

(statearr_51095_52619[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51069 === (9))){
var inst_51026 = (state_51068[(7)]);
var _ = (function (){var statearr_51096 = state_51068;
(statearr_51096[(4)] = cljs.core.cons((12),(state_51068[(4)])));

return statearr_51096;
})();
var inst_51040 = (chs__$1.cljs$core$IFn$_invoke$arity$1 ? chs__$1.cljs$core$IFn$_invoke$arity$1(inst_51026) : chs__$1.call(null,inst_51026));
var inst_51041 = (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(inst_51026) : done.call(null,inst_51026));
var inst_51042 = cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2(inst_51040,inst_51041);
var ___$1 = (function (){var statearr_51097 = state_51068;
(statearr_51097[(4)] = cljs.core.rest((state_51068[(4)])));

return statearr_51097;
})();
var state_51068__$1 = state_51068;
var statearr_51098_52623 = state_51068__$1;
(statearr_51098_52623[(2)] = inst_51042);

(statearr_51098_52623[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51069 === (5))){
var inst_51052 = (state_51068[(2)]);
var state_51068__$1 = (function (){var statearr_51100 = state_51068;
(statearr_51100[(13)] = inst_51052);

return statearr_51100;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_51068__$1,(13),dchan);
} else {
if((state_val_51069 === (14))){
var inst_51057 = cljs.core.async.close_BANG_(out);
var state_51068__$1 = state_51068;
var statearr_51102_52624 = state_51068__$1;
(statearr_51102_52624[(2)] = inst_51057);

(statearr_51102_52624[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51069 === (16))){
var inst_51064 = (state_51068[(2)]);
var state_51068__$1 = state_51068;
var statearr_51104_52625 = state_51068__$1;
(statearr_51104_52625[(2)] = inst_51064);

(statearr_51104_52625[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51069 === (10))){
var inst_51026 = (state_51068[(7)]);
var inst_51045 = (state_51068[(2)]);
var inst_51046 = (inst_51026 + (1));
var inst_51026__$1 = inst_51046;
var state_51068__$1 = (function (){var statearr_51106 = state_51068;
(statearr_51106[(7)] = inst_51026__$1);

(statearr_51106[(14)] = inst_51045);

return statearr_51106;
})();
var statearr_51107_52627 = state_51068__$1;
(statearr_51107_52627[(2)] = null);

(statearr_51107_52627[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51069 === (8))){
var inst_51050 = (state_51068[(2)]);
var state_51068__$1 = state_51068;
var statearr_51111_52628 = state_51068__$1;
(statearr_51111_52628[(2)] = inst_51050);

(statearr_51111_52628[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__48630__auto__ = null;
var cljs$core$async$state_machine__48630__auto____0 = (function (){
var statearr_51113 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_51113[(0)] = cljs$core$async$state_machine__48630__auto__);

(statearr_51113[(1)] = (1));

return statearr_51113;
});
var cljs$core$async$state_machine__48630__auto____1 = (function (state_51068){
while(true){
var ret_value__48631__auto__ = (function (){try{while(true){
var result__48632__auto__ = switch__48629__auto__(state_51068);
if(cljs.core.keyword_identical_QMARK_(result__48632__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__48632__auto__;
}
break;
}
}catch (e51114){var ex__48633__auto__ = e51114;
var statearr_51116_52629 = state_51068;
(statearr_51116_52629[(2)] = ex__48633__auto__);


if(cljs.core.seq((state_51068[(4)]))){
var statearr_51117_52631 = state_51068;
(statearr_51117_52631[(1)] = cljs.core.first((state_51068[(4)])));

} else {
throw ex__48633__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__48631__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__52632 = state_51068;
state_51068 = G__52632;
continue;
} else {
return ret_value__48631__auto__;
}
break;
}
});
cljs$core$async$state_machine__48630__auto__ = function(state_51068){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__48630__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__48630__auto____1.call(this,state_51068);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__48630__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__48630__auto____0;
cljs$core$async$state_machine__48630__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__48630__auto____1;
return cljs$core$async$state_machine__48630__auto__;
})()
})();
var state__49007__auto__ = (function (){var statearr_51121 = f__49006__auto__();
(statearr_51121[(6)] = c__49005__auto___52594);

return statearr_51121;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__49007__auto__);
}));


return out;
}));

(cljs.core.async.map.cljs$lang$maxFixedArity = 3);

/**
 * Takes a collection of source channels and returns a channel which
 *   contains all values taken from them. The returned channel will be
 *   unbuffered by default, or a buf-or-n can be supplied. The channel
 *   will close after all the source channels have closed.
 */
cljs.core.async.merge = (function cljs$core$async$merge(var_args){
var G__51126 = arguments.length;
switch (G__51126) {
case 1:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1 = (function (chs){
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2(chs,null);
}));

(cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2 = (function (chs,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__49005__auto___52635 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__49006__auto__ = (function (){var switch__48629__auto__ = (function (state_51160){
var state_val_51161 = (state_51160[(1)]);
if((state_val_51161 === (7))){
var inst_51139 = (state_51160[(7)]);
var inst_51140 = (state_51160[(8)]);
var inst_51139__$1 = (state_51160[(2)]);
var inst_51140__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_51139__$1,(0),null);
var inst_51141 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_51139__$1,(1),null);
var inst_51142 = (inst_51140__$1 == null);
var state_51160__$1 = (function (){var statearr_51162 = state_51160;
(statearr_51162[(9)] = inst_51141);

(statearr_51162[(7)] = inst_51139__$1);

(statearr_51162[(8)] = inst_51140__$1);

return statearr_51162;
})();
if(cljs.core.truth_(inst_51142)){
var statearr_51163_52642 = state_51160__$1;
(statearr_51163_52642[(1)] = (8));

} else {
var statearr_51164_52647 = state_51160__$1;
(statearr_51164_52647[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51161 === (1))){
var inst_51128 = cljs.core.vec(chs);
var inst_51129 = inst_51128;
var state_51160__$1 = (function (){var statearr_51166 = state_51160;
(statearr_51166[(10)] = inst_51129);

return statearr_51166;
})();
var statearr_51167_52653 = state_51160__$1;
(statearr_51167_52653[(2)] = null);

(statearr_51167_52653[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51161 === (4))){
var inst_51129 = (state_51160[(10)]);
var state_51160__$1 = state_51160;
return cljs.core.async.ioc_alts_BANG_(state_51160__$1,(7),inst_51129);
} else {
if((state_val_51161 === (6))){
var inst_51156 = (state_51160[(2)]);
var state_51160__$1 = state_51160;
var statearr_51169_52654 = state_51160__$1;
(statearr_51169_52654[(2)] = inst_51156);

(statearr_51169_52654[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51161 === (3))){
var inst_51158 = (state_51160[(2)]);
var state_51160__$1 = state_51160;
return cljs.core.async.impl.ioc_helpers.return_chan(state_51160__$1,inst_51158);
} else {
if((state_val_51161 === (2))){
var inst_51129 = (state_51160[(10)]);
var inst_51131 = cljs.core.count(inst_51129);
var inst_51132 = (inst_51131 > (0));
var state_51160__$1 = state_51160;
if(cljs.core.truth_(inst_51132)){
var statearr_51171_52659 = state_51160__$1;
(statearr_51171_52659[(1)] = (4));

} else {
var statearr_51172_52660 = state_51160__$1;
(statearr_51172_52660[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51161 === (11))){
var inst_51129 = (state_51160[(10)]);
var inst_51149 = (state_51160[(2)]);
var tmp51170 = inst_51129;
var inst_51129__$1 = tmp51170;
var state_51160__$1 = (function (){var statearr_51173 = state_51160;
(statearr_51173[(11)] = inst_51149);

(statearr_51173[(10)] = inst_51129__$1);

return statearr_51173;
})();
var statearr_51174_52661 = state_51160__$1;
(statearr_51174_52661[(2)] = null);

(statearr_51174_52661[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51161 === (9))){
var inst_51140 = (state_51160[(8)]);
var state_51160__$1 = state_51160;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_51160__$1,(11),out,inst_51140);
} else {
if((state_val_51161 === (5))){
var inst_51154 = cljs.core.async.close_BANG_(out);
var state_51160__$1 = state_51160;
var statearr_51177_52662 = state_51160__$1;
(statearr_51177_52662[(2)] = inst_51154);

(statearr_51177_52662[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51161 === (10))){
var inst_51152 = (state_51160[(2)]);
var state_51160__$1 = state_51160;
var statearr_51178_52664 = state_51160__$1;
(statearr_51178_52664[(2)] = inst_51152);

(statearr_51178_52664[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51161 === (8))){
var inst_51141 = (state_51160[(9)]);
var inst_51139 = (state_51160[(7)]);
var inst_51129 = (state_51160[(10)]);
var inst_51140 = (state_51160[(8)]);
var inst_51144 = (function (){var cs = inst_51129;
var vec__51135 = inst_51139;
var v = inst_51140;
var c = inst_51141;
return (function (p1__51123_SHARP_){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(c,p1__51123_SHARP_);
});
})();
var inst_51145 = cljs.core.filterv(inst_51144,inst_51129);
var inst_51129__$1 = inst_51145;
var state_51160__$1 = (function (){var statearr_51179 = state_51160;
(statearr_51179[(10)] = inst_51129__$1);

return statearr_51179;
})();
var statearr_51180_52665 = state_51160__$1;
(statearr_51180_52665[(2)] = null);

(statearr_51180_52665[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__48630__auto__ = null;
var cljs$core$async$state_machine__48630__auto____0 = (function (){
var statearr_51181 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_51181[(0)] = cljs$core$async$state_machine__48630__auto__);

(statearr_51181[(1)] = (1));

return statearr_51181;
});
var cljs$core$async$state_machine__48630__auto____1 = (function (state_51160){
while(true){
var ret_value__48631__auto__ = (function (){try{while(true){
var result__48632__auto__ = switch__48629__auto__(state_51160);
if(cljs.core.keyword_identical_QMARK_(result__48632__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__48632__auto__;
}
break;
}
}catch (e51182){var ex__48633__auto__ = e51182;
var statearr_51183_52669 = state_51160;
(statearr_51183_52669[(2)] = ex__48633__auto__);


if(cljs.core.seq((state_51160[(4)]))){
var statearr_51187_52670 = state_51160;
(statearr_51187_52670[(1)] = cljs.core.first((state_51160[(4)])));

} else {
throw ex__48633__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__48631__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__52671 = state_51160;
state_51160 = G__52671;
continue;
} else {
return ret_value__48631__auto__;
}
break;
}
});
cljs$core$async$state_machine__48630__auto__ = function(state_51160){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__48630__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__48630__auto____1.call(this,state_51160);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__48630__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__48630__auto____0;
cljs$core$async$state_machine__48630__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__48630__auto____1;
return cljs$core$async$state_machine__48630__auto__;
})()
})();
var state__49007__auto__ = (function (){var statearr_51188 = f__49006__auto__();
(statearr_51188[(6)] = c__49005__auto___52635);

return statearr_51188;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__49007__auto__);
}));


return out;
}));

(cljs.core.async.merge.cljs$lang$maxFixedArity = 2);

/**
 * Returns a channel containing the single (collection) result of the
 *   items taken from the channel conjoined to the supplied
 *   collection. ch must close before into produces a result.
 */
cljs.core.async.into = (function cljs$core$async$into(coll,ch){
return cljs.core.async.reduce(cljs.core.conj,coll,ch);
});
/**
 * Returns a channel that will return, at most, n items from ch. After n items
 * have been returned, or ch has been closed, the return chanel will close.
 * 
 *   The output channel is unbuffered by default, unless buf-or-n is given.
 */
cljs.core.async.take = (function cljs$core$async$take(var_args){
var G__51195 = arguments.length;
switch (G__51195) {
case 2:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.take.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3(n,ch,null);
}));

(cljs.core.async.take.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__49005__auto___52678 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__49006__auto__ = (function (){var switch__48629__auto__ = (function (state_51226){
var state_val_51227 = (state_51226[(1)]);
if((state_val_51227 === (7))){
var inst_51207 = (state_51226[(7)]);
var inst_51207__$1 = (state_51226[(2)]);
var inst_51208 = (inst_51207__$1 == null);
var inst_51209 = cljs.core.not(inst_51208);
var state_51226__$1 = (function (){var statearr_51229 = state_51226;
(statearr_51229[(7)] = inst_51207__$1);

return statearr_51229;
})();
if(inst_51209){
var statearr_51232_52679 = state_51226__$1;
(statearr_51232_52679[(1)] = (8));

} else {
var statearr_51234_52680 = state_51226__$1;
(statearr_51234_52680[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51227 === (1))){
var inst_51201 = (0);
var state_51226__$1 = (function (){var statearr_51237 = state_51226;
(statearr_51237[(8)] = inst_51201);

return statearr_51237;
})();
var statearr_51238_52681 = state_51226__$1;
(statearr_51238_52681[(2)] = null);

(statearr_51238_52681[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51227 === (4))){
var state_51226__$1 = state_51226;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_51226__$1,(7),ch);
} else {
if((state_val_51227 === (6))){
var inst_51220 = (state_51226[(2)]);
var state_51226__$1 = state_51226;
var statearr_51243_52682 = state_51226__$1;
(statearr_51243_52682[(2)] = inst_51220);

(statearr_51243_52682[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51227 === (3))){
var inst_51222 = (state_51226[(2)]);
var inst_51224 = cljs.core.async.close_BANG_(out);
var state_51226__$1 = (function (){var statearr_51245 = state_51226;
(statearr_51245[(9)] = inst_51222);

return statearr_51245;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_51226__$1,inst_51224);
} else {
if((state_val_51227 === (2))){
var inst_51201 = (state_51226[(8)]);
var inst_51204 = (inst_51201 < n);
var state_51226__$1 = state_51226;
if(cljs.core.truth_(inst_51204)){
var statearr_51247_52684 = state_51226__$1;
(statearr_51247_52684[(1)] = (4));

} else {
var statearr_51248_52685 = state_51226__$1;
(statearr_51248_52685[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51227 === (11))){
var inst_51201 = (state_51226[(8)]);
var inst_51212 = (state_51226[(2)]);
var inst_51213 = (inst_51201 + (1));
var inst_51201__$1 = inst_51213;
var state_51226__$1 = (function (){var statearr_51262 = state_51226;
(statearr_51262[(8)] = inst_51201__$1);

(statearr_51262[(10)] = inst_51212);

return statearr_51262;
})();
var statearr_51265_52687 = state_51226__$1;
(statearr_51265_52687[(2)] = null);

(statearr_51265_52687[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51227 === (9))){
var state_51226__$1 = state_51226;
var statearr_51268_52688 = state_51226__$1;
(statearr_51268_52688[(2)] = null);

(statearr_51268_52688[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51227 === (5))){
var state_51226__$1 = state_51226;
var statearr_51269_52689 = state_51226__$1;
(statearr_51269_52689[(2)] = null);

(statearr_51269_52689[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51227 === (10))){
var inst_51217 = (state_51226[(2)]);
var state_51226__$1 = state_51226;
var statearr_51270_52690 = state_51226__$1;
(statearr_51270_52690[(2)] = inst_51217);

(statearr_51270_52690[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51227 === (8))){
var inst_51207 = (state_51226[(7)]);
var state_51226__$1 = state_51226;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_51226__$1,(11),out,inst_51207);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__48630__auto__ = null;
var cljs$core$async$state_machine__48630__auto____0 = (function (){
var statearr_51291 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_51291[(0)] = cljs$core$async$state_machine__48630__auto__);

(statearr_51291[(1)] = (1));

return statearr_51291;
});
var cljs$core$async$state_machine__48630__auto____1 = (function (state_51226){
while(true){
var ret_value__48631__auto__ = (function (){try{while(true){
var result__48632__auto__ = switch__48629__auto__(state_51226);
if(cljs.core.keyword_identical_QMARK_(result__48632__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__48632__auto__;
}
break;
}
}catch (e51292){var ex__48633__auto__ = e51292;
var statearr_51294_52691 = state_51226;
(statearr_51294_52691[(2)] = ex__48633__auto__);


if(cljs.core.seq((state_51226[(4)]))){
var statearr_51295_52692 = state_51226;
(statearr_51295_52692[(1)] = cljs.core.first((state_51226[(4)])));

} else {
throw ex__48633__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__48631__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__52694 = state_51226;
state_51226 = G__52694;
continue;
} else {
return ret_value__48631__auto__;
}
break;
}
});
cljs$core$async$state_machine__48630__auto__ = function(state_51226){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__48630__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__48630__auto____1.call(this,state_51226);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__48630__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__48630__auto____0;
cljs$core$async$state_machine__48630__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__48630__auto____1;
return cljs$core$async$state_machine__48630__auto__;
})()
})();
var state__49007__auto__ = (function (){var statearr_51300 = f__49006__auto__();
(statearr_51300[(6)] = c__49005__auto___52678);

return statearr_51300;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__49007__auto__);
}));


return out;
}));

(cljs.core.async.take.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_LT_ = (function cljs$core$async$map_LT_(f,ch){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async51308 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async51308 = (function (f,ch,meta51309){
this.f = f;
this.ch = ch;
this.meta51309 = meta51309;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async51308.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_51310,meta51309__$1){
var self__ = this;
var _51310__$1 = this;
return (new cljs.core.async.t_cljs$core$async51308(self__.f,self__.ch,meta51309__$1));
}));

(cljs.core.async.t_cljs$core$async51308.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_51310){
var self__ = this;
var _51310__$1 = this;
return self__.meta51309;
}));

(cljs.core.async.t_cljs$core$async51308.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async51308.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async51308.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async51308.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async51308.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
var ret = cljs.core.async.impl.protocols.take_BANG_(self__.ch,(function (){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async51315 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async51315 = (function (f,ch,meta51309,_,fn1,meta51316){
this.f = f;
this.ch = ch;
this.meta51309 = meta51309;
this._ = _;
this.fn1 = fn1;
this.meta51316 = meta51316;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async51315.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_51317,meta51316__$1){
var self__ = this;
var _51317__$1 = this;
return (new cljs.core.async.t_cljs$core$async51315(self__.f,self__.ch,self__.meta51309,self__._,self__.fn1,meta51316__$1));
}));

(cljs.core.async.t_cljs$core$async51315.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_51317){
var self__ = this;
var _51317__$1 = this;
return self__.meta51316;
}));

(cljs.core.async.t_cljs$core$async51315.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async51315.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
return cljs.core.async.impl.protocols.active_QMARK_(self__.fn1);
}));

(cljs.core.async.t_cljs$core$async51315.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async51315.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
var f1 = cljs.core.async.impl.protocols.commit(self__.fn1);
return (function (p1__51305_SHARP_){
var G__51321 = (((p1__51305_SHARP_ == null))?null:(self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(p1__51305_SHARP_) : self__.f.call(null,p1__51305_SHARP_)));
return (f1.cljs$core$IFn$_invoke$arity$1 ? f1.cljs$core$IFn$_invoke$arity$1(G__51321) : f1.call(null,G__51321));
});
}));

(cljs.core.async.t_cljs$core$async51315.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta51309","meta51309",1803949198,null),cljs.core.with_meta(new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol("cljs.core.async","t_cljs$core$async51308","cljs.core.async/t_cljs$core$async51308",-580093566,null)], null)),new cljs.core.Symbol(null,"fn1","fn1",895834444,null),new cljs.core.Symbol(null,"meta51316","meta51316",1604294486,null)], null);
}));

(cljs.core.async.t_cljs$core$async51315.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async51315.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async51315");

(cljs.core.async.t_cljs$core$async51315.cljs$lang$ctorPrWriter = (function (this__4450__auto__,writer__4451__auto__,opt__4452__auto__){
return cljs.core._write(writer__4451__auto__,"cljs.core.async/t_cljs$core$async51315");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async51315.
 */
cljs.core.async.__GT_t_cljs$core$async51315 = (function cljs$core$async$map_LT__$___GT_t_cljs$core$async51315(f__$1,ch__$1,meta51309__$1,___$2,fn1__$1,meta51316){
return (new cljs.core.async.t_cljs$core$async51315(f__$1,ch__$1,meta51309__$1,___$2,fn1__$1,meta51316));
});

}

return (new cljs.core.async.t_cljs$core$async51315(self__.f,self__.ch,self__.meta51309,___$1,fn1,cljs.core.PersistentArrayMap.EMPTY));
})()
);
if(cljs.core.truth_((function (){var and__4210__auto__ = ret;
if(cljs.core.truth_(and__4210__auto__)){
return (!((cljs.core.deref(ret) == null)));
} else {
return and__4210__auto__;
}
})())){
return cljs.core.async.impl.channels.box((function (){var G__51323 = cljs.core.deref(ret);
return (self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(G__51323) : self__.f.call(null,G__51323));
})());
} else {
return ret;
}
}));

(cljs.core.async.t_cljs$core$async51308.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async51308.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,val,fn1);
}));

(cljs.core.async.t_cljs$core$async51308.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta51309","meta51309",1803949198,null)], null);
}));

(cljs.core.async.t_cljs$core$async51308.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async51308.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async51308");

(cljs.core.async.t_cljs$core$async51308.cljs$lang$ctorPrWriter = (function (this__4450__auto__,writer__4451__auto__,opt__4452__auto__){
return cljs.core._write(writer__4451__auto__,"cljs.core.async/t_cljs$core$async51308");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async51308.
 */
cljs.core.async.__GT_t_cljs$core$async51308 = (function cljs$core$async$map_LT__$___GT_t_cljs$core$async51308(f__$1,ch__$1,meta51309){
return (new cljs.core.async.t_cljs$core$async51308(f__$1,ch__$1,meta51309));
});

}

return (new cljs.core.async.t_cljs$core$async51308(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_GT_ = (function cljs$core$async$map_GT_(f,ch){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async51336 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async51336 = (function (f,ch,meta51337){
this.f = f;
this.ch = ch;
this.meta51337 = meta51337;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async51336.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_51338,meta51337__$1){
var self__ = this;
var _51338__$1 = this;
return (new cljs.core.async.t_cljs$core$async51336(self__.f,self__.ch,meta51337__$1));
}));

(cljs.core.async.t_cljs$core$async51336.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_51338){
var self__ = this;
var _51338__$1 = this;
return self__.meta51337;
}));

(cljs.core.async.t_cljs$core$async51336.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async51336.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async51336.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async51336.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_(self__.ch,fn1);
}));

(cljs.core.async.t_cljs$core$async51336.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async51336.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,(self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(val) : self__.f.call(null,val)),fn1);
}));

(cljs.core.async.t_cljs$core$async51336.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta51337","meta51337",1481346552,null)], null);
}));

(cljs.core.async.t_cljs$core$async51336.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async51336.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async51336");

(cljs.core.async.t_cljs$core$async51336.cljs$lang$ctorPrWriter = (function (this__4450__auto__,writer__4451__auto__,opt__4452__auto__){
return cljs.core._write(writer__4451__auto__,"cljs.core.async/t_cljs$core$async51336");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async51336.
 */
cljs.core.async.__GT_t_cljs$core$async51336 = (function cljs$core$async$map_GT__$___GT_t_cljs$core$async51336(f__$1,ch__$1,meta51337){
return (new cljs.core.async.t_cljs$core$async51336(f__$1,ch__$1,meta51337));
});

}

return (new cljs.core.async.t_cljs$core$async51336(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_GT_ = (function cljs$core$async$filter_GT_(p,ch){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async51362 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async51362 = (function (p,ch,meta51363){
this.p = p;
this.ch = ch;
this.meta51363 = meta51363;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async51362.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_51364,meta51363__$1){
var self__ = this;
var _51364__$1 = this;
return (new cljs.core.async.t_cljs$core$async51362(self__.p,self__.ch,meta51363__$1));
}));

(cljs.core.async.t_cljs$core$async51362.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_51364){
var self__ = this;
var _51364__$1 = this;
return self__.meta51363;
}));

(cljs.core.async.t_cljs$core$async51362.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async51362.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async51362.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async51362.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async51362.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_(self__.ch,fn1);
}));

(cljs.core.async.t_cljs$core$async51362.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async51362.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_((self__.p.cljs$core$IFn$_invoke$arity$1 ? self__.p.cljs$core$IFn$_invoke$arity$1(val) : self__.p.call(null,val)))){
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,val,fn1);
} else {
return cljs.core.async.impl.channels.box(cljs.core.not(cljs.core.async.impl.protocols.closed_QMARK_(self__.ch)));
}
}));

(cljs.core.async.t_cljs$core$async51362.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta51363","meta51363",-1299630810,null)], null);
}));

(cljs.core.async.t_cljs$core$async51362.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async51362.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async51362");

(cljs.core.async.t_cljs$core$async51362.cljs$lang$ctorPrWriter = (function (this__4450__auto__,writer__4451__auto__,opt__4452__auto__){
return cljs.core._write(writer__4451__auto__,"cljs.core.async/t_cljs$core$async51362");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async51362.
 */
cljs.core.async.__GT_t_cljs$core$async51362 = (function cljs$core$async$filter_GT__$___GT_t_cljs$core$async51362(p__$1,ch__$1,meta51363){
return (new cljs.core.async.t_cljs$core$async51362(p__$1,ch__$1,meta51363));
});

}

return (new cljs.core.async.t_cljs$core$async51362(p,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_GT_ = (function cljs$core$async$remove_GT_(p,ch){
return cljs.core.async.filter_GT_(cljs.core.complement(p),ch);
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_LT_ = (function cljs$core$async$filter_LT_(var_args){
var G__51385 = arguments.length;
switch (G__51385) {
case 2:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3(p,ch,null);
}));

(cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__49005__auto___52699 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__49006__auto__ = (function (){var switch__48629__auto__ = (function (state_51412){
var state_val_51413 = (state_51412[(1)]);
if((state_val_51413 === (7))){
var inst_51408 = (state_51412[(2)]);
var state_51412__$1 = state_51412;
var statearr_51417_52700 = state_51412__$1;
(statearr_51417_52700[(2)] = inst_51408);

(statearr_51417_52700[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51413 === (1))){
var state_51412__$1 = state_51412;
var statearr_51421_52701 = state_51412__$1;
(statearr_51421_52701[(2)] = null);

(statearr_51421_52701[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51413 === (4))){
var inst_51393 = (state_51412[(7)]);
var inst_51393__$1 = (state_51412[(2)]);
var inst_51394 = (inst_51393__$1 == null);
var state_51412__$1 = (function (){var statearr_51425 = state_51412;
(statearr_51425[(7)] = inst_51393__$1);

return statearr_51425;
})();
if(cljs.core.truth_(inst_51394)){
var statearr_51426_52702 = state_51412__$1;
(statearr_51426_52702[(1)] = (5));

} else {
var statearr_51430_52703 = state_51412__$1;
(statearr_51430_52703[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51413 === (6))){
var inst_51393 = (state_51412[(7)]);
var inst_51398 = (p.cljs$core$IFn$_invoke$arity$1 ? p.cljs$core$IFn$_invoke$arity$1(inst_51393) : p.call(null,inst_51393));
var state_51412__$1 = state_51412;
if(cljs.core.truth_(inst_51398)){
var statearr_51432_52704 = state_51412__$1;
(statearr_51432_52704[(1)] = (8));

} else {
var statearr_51433_52705 = state_51412__$1;
(statearr_51433_52705[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51413 === (3))){
var inst_51410 = (state_51412[(2)]);
var state_51412__$1 = state_51412;
return cljs.core.async.impl.ioc_helpers.return_chan(state_51412__$1,inst_51410);
} else {
if((state_val_51413 === (2))){
var state_51412__$1 = state_51412;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_51412__$1,(4),ch);
} else {
if((state_val_51413 === (11))){
var inst_51402 = (state_51412[(2)]);
var state_51412__$1 = state_51412;
var statearr_51438_52707 = state_51412__$1;
(statearr_51438_52707[(2)] = inst_51402);

(statearr_51438_52707[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51413 === (9))){
var state_51412__$1 = state_51412;
var statearr_51439_52708 = state_51412__$1;
(statearr_51439_52708[(2)] = null);

(statearr_51439_52708[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51413 === (5))){
var inst_51396 = cljs.core.async.close_BANG_(out);
var state_51412__$1 = state_51412;
var statearr_51440_52709 = state_51412__$1;
(statearr_51440_52709[(2)] = inst_51396);

(statearr_51440_52709[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51413 === (10))){
var inst_51405 = (state_51412[(2)]);
var state_51412__$1 = (function (){var statearr_51441 = state_51412;
(statearr_51441[(8)] = inst_51405);

return statearr_51441;
})();
var statearr_51442_52710 = state_51412__$1;
(statearr_51442_52710[(2)] = null);

(statearr_51442_52710[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51413 === (8))){
var inst_51393 = (state_51412[(7)]);
var state_51412__$1 = state_51412;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_51412__$1,(11),out,inst_51393);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__48630__auto__ = null;
var cljs$core$async$state_machine__48630__auto____0 = (function (){
var statearr_51443 = [null,null,null,null,null,null,null,null,null];
(statearr_51443[(0)] = cljs$core$async$state_machine__48630__auto__);

(statearr_51443[(1)] = (1));

return statearr_51443;
});
var cljs$core$async$state_machine__48630__auto____1 = (function (state_51412){
while(true){
var ret_value__48631__auto__ = (function (){try{while(true){
var result__48632__auto__ = switch__48629__auto__(state_51412);
if(cljs.core.keyword_identical_QMARK_(result__48632__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__48632__auto__;
}
break;
}
}catch (e51444){var ex__48633__auto__ = e51444;
var statearr_51445_52716 = state_51412;
(statearr_51445_52716[(2)] = ex__48633__auto__);


if(cljs.core.seq((state_51412[(4)]))){
var statearr_51446_52717 = state_51412;
(statearr_51446_52717[(1)] = cljs.core.first((state_51412[(4)])));

} else {
throw ex__48633__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__48631__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__52718 = state_51412;
state_51412 = G__52718;
continue;
} else {
return ret_value__48631__auto__;
}
break;
}
});
cljs$core$async$state_machine__48630__auto__ = function(state_51412){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__48630__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__48630__auto____1.call(this,state_51412);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__48630__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__48630__auto____0;
cljs$core$async$state_machine__48630__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__48630__auto____1;
return cljs$core$async$state_machine__48630__auto__;
})()
})();
var state__49007__auto__ = (function (){var statearr_51449 = f__49006__auto__();
(statearr_51449[(6)] = c__49005__auto___52699);

return statearr_51449;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__49007__auto__);
}));


return out;
}));

(cljs.core.async.filter_LT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_LT_ = (function cljs$core$async$remove_LT_(var_args){
var G__51456 = arguments.length;
switch (G__51456) {
case 2:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3(p,ch,null);
}));

(cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3(cljs.core.complement(p),ch,buf_or_n);
}));

(cljs.core.async.remove_LT_.cljs$lang$maxFixedArity = 3);

cljs.core.async.mapcat_STAR_ = (function cljs$core$async$mapcat_STAR_(f,in$,out){
var c__49005__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__49006__auto__ = (function (){var switch__48629__auto__ = (function (state_51535){
var state_val_51536 = (state_51535[(1)]);
if((state_val_51536 === (7))){
var inst_51530 = (state_51535[(2)]);
var state_51535__$1 = state_51535;
var statearr_51537_52725 = state_51535__$1;
(statearr_51537_52725[(2)] = inst_51530);

(statearr_51537_52725[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51536 === (20))){
var inst_51497 = (state_51535[(7)]);
var inst_51509 = (state_51535[(2)]);
var inst_51510 = cljs.core.next(inst_51497);
var inst_51475 = inst_51510;
var inst_51476 = null;
var inst_51477 = (0);
var inst_51478 = (0);
var state_51535__$1 = (function (){var statearr_51538 = state_51535;
(statearr_51538[(8)] = inst_51509);

(statearr_51538[(9)] = inst_51475);

(statearr_51538[(10)] = inst_51476);

(statearr_51538[(11)] = inst_51477);

(statearr_51538[(12)] = inst_51478);

return statearr_51538;
})();
var statearr_51539_52731 = state_51535__$1;
(statearr_51539_52731[(2)] = null);

(statearr_51539_52731[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51536 === (1))){
var state_51535__$1 = state_51535;
var statearr_51540_52734 = state_51535__$1;
(statearr_51540_52734[(2)] = null);

(statearr_51540_52734[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51536 === (4))){
var inst_51463 = (state_51535[(13)]);
var inst_51463__$1 = (state_51535[(2)]);
var inst_51464 = (inst_51463__$1 == null);
var state_51535__$1 = (function (){var statearr_51541 = state_51535;
(statearr_51541[(13)] = inst_51463__$1);

return statearr_51541;
})();
if(cljs.core.truth_(inst_51464)){
var statearr_51542_52736 = state_51535__$1;
(statearr_51542_52736[(1)] = (5));

} else {
var statearr_51543_52738 = state_51535__$1;
(statearr_51543_52738[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51536 === (15))){
var state_51535__$1 = state_51535;
var statearr_51547_52740 = state_51535__$1;
(statearr_51547_52740[(2)] = null);

(statearr_51547_52740[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51536 === (21))){
var state_51535__$1 = state_51535;
var statearr_51548_52741 = state_51535__$1;
(statearr_51548_52741[(2)] = null);

(statearr_51548_52741[(1)] = (23));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51536 === (13))){
var inst_51475 = (state_51535[(9)]);
var inst_51476 = (state_51535[(10)]);
var inst_51477 = (state_51535[(11)]);
var inst_51478 = (state_51535[(12)]);
var inst_51491 = (state_51535[(2)]);
var inst_51492 = (inst_51478 + (1));
var tmp51544 = inst_51475;
var tmp51545 = inst_51476;
var tmp51546 = inst_51477;
var inst_51475__$1 = tmp51544;
var inst_51476__$1 = tmp51545;
var inst_51477__$1 = tmp51546;
var inst_51478__$1 = inst_51492;
var state_51535__$1 = (function (){var statearr_51552 = state_51535;
(statearr_51552[(9)] = inst_51475__$1);

(statearr_51552[(10)] = inst_51476__$1);

(statearr_51552[(11)] = inst_51477__$1);

(statearr_51552[(12)] = inst_51478__$1);

(statearr_51552[(14)] = inst_51491);

return statearr_51552;
})();
var statearr_51553_52743 = state_51535__$1;
(statearr_51553_52743[(2)] = null);

(statearr_51553_52743[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51536 === (22))){
var state_51535__$1 = state_51535;
var statearr_51554_52744 = state_51535__$1;
(statearr_51554_52744[(2)] = null);

(statearr_51554_52744[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51536 === (6))){
var inst_51463 = (state_51535[(13)]);
var inst_51472 = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(inst_51463) : f.call(null,inst_51463));
var inst_51473 = cljs.core.seq(inst_51472);
var inst_51475 = inst_51473;
var inst_51476 = null;
var inst_51477 = (0);
var inst_51478 = (0);
var state_51535__$1 = (function (){var statearr_51555 = state_51535;
(statearr_51555[(9)] = inst_51475);

(statearr_51555[(10)] = inst_51476);

(statearr_51555[(11)] = inst_51477);

(statearr_51555[(12)] = inst_51478);

return statearr_51555;
})();
var statearr_51556_52745 = state_51535__$1;
(statearr_51556_52745[(2)] = null);

(statearr_51556_52745[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51536 === (17))){
var inst_51497 = (state_51535[(7)]);
var inst_51502 = cljs.core.chunk_first(inst_51497);
var inst_51503 = cljs.core.chunk_rest(inst_51497);
var inst_51504 = cljs.core.count(inst_51502);
var inst_51475 = inst_51503;
var inst_51476 = inst_51502;
var inst_51477 = inst_51504;
var inst_51478 = (0);
var state_51535__$1 = (function (){var statearr_51558 = state_51535;
(statearr_51558[(9)] = inst_51475);

(statearr_51558[(10)] = inst_51476);

(statearr_51558[(11)] = inst_51477);

(statearr_51558[(12)] = inst_51478);

return statearr_51558;
})();
var statearr_51562_52747 = state_51535__$1;
(statearr_51562_52747[(2)] = null);

(statearr_51562_52747[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51536 === (3))){
var inst_51532 = (state_51535[(2)]);
var state_51535__$1 = state_51535;
return cljs.core.async.impl.ioc_helpers.return_chan(state_51535__$1,inst_51532);
} else {
if((state_val_51536 === (12))){
var inst_51519 = (state_51535[(2)]);
var state_51535__$1 = state_51535;
var statearr_51563_52748 = state_51535__$1;
(statearr_51563_52748[(2)] = inst_51519);

(statearr_51563_52748[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51536 === (2))){
var state_51535__$1 = state_51535;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_51535__$1,(4),in$);
} else {
if((state_val_51536 === (23))){
var inst_51528 = (state_51535[(2)]);
var state_51535__$1 = state_51535;
var statearr_51564_52749 = state_51535__$1;
(statearr_51564_52749[(2)] = inst_51528);

(statearr_51564_52749[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51536 === (19))){
var inst_51513 = (state_51535[(2)]);
var state_51535__$1 = state_51535;
var statearr_51566_52750 = state_51535__$1;
(statearr_51566_52750[(2)] = inst_51513);

(statearr_51566_52750[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51536 === (11))){
var inst_51497 = (state_51535[(7)]);
var inst_51475 = (state_51535[(9)]);
var inst_51497__$1 = cljs.core.seq(inst_51475);
var state_51535__$1 = (function (){var statearr_51567 = state_51535;
(statearr_51567[(7)] = inst_51497__$1);

return statearr_51567;
})();
if(inst_51497__$1){
var statearr_51568_52752 = state_51535__$1;
(statearr_51568_52752[(1)] = (14));

} else {
var statearr_51569_52753 = state_51535__$1;
(statearr_51569_52753[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51536 === (9))){
var inst_51521 = (state_51535[(2)]);
var inst_51523 = cljs.core.async.impl.protocols.closed_QMARK_(out);
var state_51535__$1 = (function (){var statearr_51570 = state_51535;
(statearr_51570[(15)] = inst_51521);

return statearr_51570;
})();
if(cljs.core.truth_(inst_51523)){
var statearr_51571_52754 = state_51535__$1;
(statearr_51571_52754[(1)] = (21));

} else {
var statearr_51572_52755 = state_51535__$1;
(statearr_51572_52755[(1)] = (22));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51536 === (5))){
var inst_51466 = cljs.core.async.close_BANG_(out);
var state_51535__$1 = state_51535;
var statearr_51574_52756 = state_51535__$1;
(statearr_51574_52756[(2)] = inst_51466);

(statearr_51574_52756[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51536 === (14))){
var inst_51497 = (state_51535[(7)]);
var inst_51499 = cljs.core.chunked_seq_QMARK_(inst_51497);
var state_51535__$1 = state_51535;
if(inst_51499){
var statearr_51575_52758 = state_51535__$1;
(statearr_51575_52758[(1)] = (17));

} else {
var statearr_51576_52759 = state_51535__$1;
(statearr_51576_52759[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51536 === (16))){
var inst_51517 = (state_51535[(2)]);
var state_51535__$1 = state_51535;
var statearr_51578_52760 = state_51535__$1;
(statearr_51578_52760[(2)] = inst_51517);

(statearr_51578_52760[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51536 === (10))){
var inst_51476 = (state_51535[(10)]);
var inst_51478 = (state_51535[(12)]);
var inst_51489 = cljs.core._nth(inst_51476,inst_51478);
var state_51535__$1 = state_51535;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_51535__$1,(13),out,inst_51489);
} else {
if((state_val_51536 === (18))){
var inst_51497 = (state_51535[(7)]);
var inst_51507 = cljs.core.first(inst_51497);
var state_51535__$1 = state_51535;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_51535__$1,(20),out,inst_51507);
} else {
if((state_val_51536 === (8))){
var inst_51477 = (state_51535[(11)]);
var inst_51478 = (state_51535[(12)]);
var inst_51486 = (inst_51478 < inst_51477);
var inst_51487 = inst_51486;
var state_51535__$1 = state_51535;
if(cljs.core.truth_(inst_51487)){
var statearr_51582_52762 = state_51535__$1;
(statearr_51582_52762[(1)] = (10));

} else {
var statearr_51583_52763 = state_51535__$1;
(statearr_51583_52763[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$mapcat_STAR__$_state_machine__48630__auto__ = null;
var cljs$core$async$mapcat_STAR__$_state_machine__48630__auto____0 = (function (){
var statearr_51586 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_51586[(0)] = cljs$core$async$mapcat_STAR__$_state_machine__48630__auto__);

(statearr_51586[(1)] = (1));

return statearr_51586;
});
var cljs$core$async$mapcat_STAR__$_state_machine__48630__auto____1 = (function (state_51535){
while(true){
var ret_value__48631__auto__ = (function (){try{while(true){
var result__48632__auto__ = switch__48629__auto__(state_51535);
if(cljs.core.keyword_identical_QMARK_(result__48632__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__48632__auto__;
}
break;
}
}catch (e51587){var ex__48633__auto__ = e51587;
var statearr_51588_52764 = state_51535;
(statearr_51588_52764[(2)] = ex__48633__auto__);


if(cljs.core.seq((state_51535[(4)]))){
var statearr_51589_52769 = state_51535;
(statearr_51589_52769[(1)] = cljs.core.first((state_51535[(4)])));

} else {
throw ex__48633__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__48631__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__52770 = state_51535;
state_51535 = G__52770;
continue;
} else {
return ret_value__48631__auto__;
}
break;
}
});
cljs$core$async$mapcat_STAR__$_state_machine__48630__auto__ = function(state_51535){
switch(arguments.length){
case 0:
return cljs$core$async$mapcat_STAR__$_state_machine__48630__auto____0.call(this);
case 1:
return cljs$core$async$mapcat_STAR__$_state_machine__48630__auto____1.call(this,state_51535);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mapcat_STAR__$_state_machine__48630__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mapcat_STAR__$_state_machine__48630__auto____0;
cljs$core$async$mapcat_STAR__$_state_machine__48630__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mapcat_STAR__$_state_machine__48630__auto____1;
return cljs$core$async$mapcat_STAR__$_state_machine__48630__auto__;
})()
})();
var state__49007__auto__ = (function (){var statearr_51597 = f__49006__auto__();
(statearr_51597[(6)] = c__49005__auto__);

return statearr_51597;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__49007__auto__);
}));

return c__49005__auto__;
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_LT_ = (function cljs$core$async$mapcat_LT_(var_args){
var G__51599 = arguments.length;
switch (G__51599) {
case 2:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2 = (function (f,in$){
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3(f,in$,null);
}));

(cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3 = (function (f,in$,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
cljs.core.async.mapcat_STAR_(f,in$,out);

return out;
}));

(cljs.core.async.mapcat_LT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_GT_ = (function cljs$core$async$mapcat_GT_(var_args){
var G__51608 = arguments.length;
switch (G__51608) {
case 2:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2 = (function (f,out){
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3(f,out,null);
}));

(cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3 = (function (f,out,buf_or_n){
var in$ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
cljs.core.async.mapcat_STAR_(f,in$,out);

return in$;
}));

(cljs.core.async.mapcat_GT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.unique = (function cljs$core$async$unique(var_args){
var G__51615 = arguments.length;
switch (G__51615) {
case 1:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1 = (function (ch){
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2(ch,null);
}));

(cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2 = (function (ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__49005__auto___52786 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__49006__auto__ = (function (){var switch__48629__auto__ = (function (state_51647){
var state_val_51648 = (state_51647[(1)]);
if((state_val_51648 === (7))){
var inst_51641 = (state_51647[(2)]);
var state_51647__$1 = state_51647;
var statearr_51651_52794 = state_51647__$1;
(statearr_51651_52794[(2)] = inst_51641);

(statearr_51651_52794[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51648 === (1))){
var inst_51621 = null;
var state_51647__$1 = (function (){var statearr_51653 = state_51647;
(statearr_51653[(7)] = inst_51621);

return statearr_51653;
})();
var statearr_51655_52795 = state_51647__$1;
(statearr_51655_52795[(2)] = null);

(statearr_51655_52795[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51648 === (4))){
var inst_51624 = (state_51647[(8)]);
var inst_51624__$1 = (state_51647[(2)]);
var inst_51626 = (inst_51624__$1 == null);
var inst_51627 = cljs.core.not(inst_51626);
var state_51647__$1 = (function (){var statearr_51657 = state_51647;
(statearr_51657[(8)] = inst_51624__$1);

return statearr_51657;
})();
if(inst_51627){
var statearr_51658_52796 = state_51647__$1;
(statearr_51658_52796[(1)] = (5));

} else {
var statearr_51659_52797 = state_51647__$1;
(statearr_51659_52797[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51648 === (6))){
var state_51647__$1 = state_51647;
var statearr_51661_52798 = state_51647__$1;
(statearr_51661_52798[(2)] = null);

(statearr_51661_52798[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51648 === (3))){
var inst_51643 = (state_51647[(2)]);
var inst_51644 = cljs.core.async.close_BANG_(out);
var state_51647__$1 = (function (){var statearr_51662 = state_51647;
(statearr_51662[(9)] = inst_51643);

return statearr_51662;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_51647__$1,inst_51644);
} else {
if((state_val_51648 === (2))){
var state_51647__$1 = state_51647;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_51647__$1,(4),ch);
} else {
if((state_val_51648 === (11))){
var inst_51624 = (state_51647[(8)]);
var inst_51635 = (state_51647[(2)]);
var inst_51621 = inst_51624;
var state_51647__$1 = (function (){var statearr_51663 = state_51647;
(statearr_51663[(7)] = inst_51621);

(statearr_51663[(10)] = inst_51635);

return statearr_51663;
})();
var statearr_51664_52803 = state_51647__$1;
(statearr_51664_52803[(2)] = null);

(statearr_51664_52803[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51648 === (9))){
var inst_51624 = (state_51647[(8)]);
var state_51647__$1 = state_51647;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_51647__$1,(11),out,inst_51624);
} else {
if((state_val_51648 === (5))){
var inst_51621 = (state_51647[(7)]);
var inst_51624 = (state_51647[(8)]);
var inst_51629 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_51624,inst_51621);
var state_51647__$1 = state_51647;
if(inst_51629){
var statearr_51666_52809 = state_51647__$1;
(statearr_51666_52809[(1)] = (8));

} else {
var statearr_51667_52810 = state_51647__$1;
(statearr_51667_52810[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51648 === (10))){
var inst_51638 = (state_51647[(2)]);
var state_51647__$1 = state_51647;
var statearr_51668_52813 = state_51647__$1;
(statearr_51668_52813[(2)] = inst_51638);

(statearr_51668_52813[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51648 === (8))){
var inst_51621 = (state_51647[(7)]);
var tmp51665 = inst_51621;
var inst_51621__$1 = tmp51665;
var state_51647__$1 = (function (){var statearr_51669 = state_51647;
(statearr_51669[(7)] = inst_51621__$1);

return statearr_51669;
})();
var statearr_51671_52815 = state_51647__$1;
(statearr_51671_52815[(2)] = null);

(statearr_51671_52815[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__48630__auto__ = null;
var cljs$core$async$state_machine__48630__auto____0 = (function (){
var statearr_51672 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_51672[(0)] = cljs$core$async$state_machine__48630__auto__);

(statearr_51672[(1)] = (1));

return statearr_51672;
});
var cljs$core$async$state_machine__48630__auto____1 = (function (state_51647){
while(true){
var ret_value__48631__auto__ = (function (){try{while(true){
var result__48632__auto__ = switch__48629__auto__(state_51647);
if(cljs.core.keyword_identical_QMARK_(result__48632__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__48632__auto__;
}
break;
}
}catch (e51673){var ex__48633__auto__ = e51673;
var statearr_51675_52820 = state_51647;
(statearr_51675_52820[(2)] = ex__48633__auto__);


if(cljs.core.seq((state_51647[(4)]))){
var statearr_51676_52821 = state_51647;
(statearr_51676_52821[(1)] = cljs.core.first((state_51647[(4)])));

} else {
throw ex__48633__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__48631__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__52822 = state_51647;
state_51647 = G__52822;
continue;
} else {
return ret_value__48631__auto__;
}
break;
}
});
cljs$core$async$state_machine__48630__auto__ = function(state_51647){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__48630__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__48630__auto____1.call(this,state_51647);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__48630__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__48630__auto____0;
cljs$core$async$state_machine__48630__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__48630__auto____1;
return cljs$core$async$state_machine__48630__auto__;
})()
})();
var state__49007__auto__ = (function (){var statearr_51677 = f__49006__auto__();
(statearr_51677[(6)] = c__49005__auto___52786);

return statearr_51677;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__49007__auto__);
}));


return out;
}));

(cljs.core.async.unique.cljs$lang$maxFixedArity = 2);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition = (function cljs$core$async$partition(var_args){
var G__51679 = arguments.length;
switch (G__51679) {
case 2:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3(n,ch,null);
}));

(cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__49005__auto___52828 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__49006__auto__ = (function (){var switch__48629__auto__ = (function (state_51733){
var state_val_51734 = (state_51733[(1)]);
if((state_val_51734 === (7))){
var inst_51723 = (state_51733[(2)]);
var state_51733__$1 = state_51733;
var statearr_51735_52829 = state_51733__$1;
(statearr_51735_52829[(2)] = inst_51723);

(statearr_51735_52829[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51734 === (1))){
var inst_51690 = (new Array(n));
var inst_51691 = inst_51690;
var inst_51692 = (0);
var state_51733__$1 = (function (){var statearr_51736 = state_51733;
(statearr_51736[(7)] = inst_51691);

(statearr_51736[(8)] = inst_51692);

return statearr_51736;
})();
var statearr_51737_52830 = state_51733__$1;
(statearr_51737_52830[(2)] = null);

(statearr_51737_52830[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51734 === (4))){
var inst_51695 = (state_51733[(9)]);
var inst_51695__$1 = (state_51733[(2)]);
var inst_51696 = (inst_51695__$1 == null);
var inst_51697 = cljs.core.not(inst_51696);
var state_51733__$1 = (function (){var statearr_51744 = state_51733;
(statearr_51744[(9)] = inst_51695__$1);

return statearr_51744;
})();
if(inst_51697){
var statearr_51745_52831 = state_51733__$1;
(statearr_51745_52831[(1)] = (5));

} else {
var statearr_51746_52832 = state_51733__$1;
(statearr_51746_52832[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51734 === (15))){
var inst_51717 = (state_51733[(2)]);
var state_51733__$1 = state_51733;
var statearr_51748_52833 = state_51733__$1;
(statearr_51748_52833[(2)] = inst_51717);

(statearr_51748_52833[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51734 === (13))){
var state_51733__$1 = state_51733;
var statearr_51749_52834 = state_51733__$1;
(statearr_51749_52834[(2)] = null);

(statearr_51749_52834[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51734 === (6))){
var inst_51692 = (state_51733[(8)]);
var inst_51713 = (inst_51692 > (0));
var state_51733__$1 = state_51733;
if(cljs.core.truth_(inst_51713)){
var statearr_51756_52835 = state_51733__$1;
(statearr_51756_52835[(1)] = (12));

} else {
var statearr_51757_52836 = state_51733__$1;
(statearr_51757_52836[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51734 === (3))){
var inst_51731 = (state_51733[(2)]);
var state_51733__$1 = state_51733;
return cljs.core.async.impl.ioc_helpers.return_chan(state_51733__$1,inst_51731);
} else {
if((state_val_51734 === (12))){
var inst_51691 = (state_51733[(7)]);
var inst_51715 = cljs.core.vec(inst_51691);
var state_51733__$1 = state_51733;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_51733__$1,(15),out,inst_51715);
} else {
if((state_val_51734 === (2))){
var state_51733__$1 = state_51733;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_51733__$1,(4),ch);
} else {
if((state_val_51734 === (11))){
var inst_51707 = (state_51733[(2)]);
var inst_51708 = (new Array(n));
var inst_51691 = inst_51708;
var inst_51692 = (0);
var state_51733__$1 = (function (){var statearr_51759 = state_51733;
(statearr_51759[(10)] = inst_51707);

(statearr_51759[(7)] = inst_51691);

(statearr_51759[(8)] = inst_51692);

return statearr_51759;
})();
var statearr_51764_52837 = state_51733__$1;
(statearr_51764_52837[(2)] = null);

(statearr_51764_52837[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51734 === (9))){
var inst_51691 = (state_51733[(7)]);
var inst_51705 = cljs.core.vec(inst_51691);
var state_51733__$1 = state_51733;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_51733__$1,(11),out,inst_51705);
} else {
if((state_val_51734 === (5))){
var inst_51695 = (state_51733[(9)]);
var inst_51700 = (state_51733[(11)]);
var inst_51691 = (state_51733[(7)]);
var inst_51692 = (state_51733[(8)]);
var inst_51699 = (inst_51691[inst_51692] = inst_51695);
var inst_51700__$1 = (inst_51692 + (1));
var inst_51701 = (inst_51700__$1 < n);
var state_51733__$1 = (function (){var statearr_51766 = state_51733;
(statearr_51766[(11)] = inst_51700__$1);

(statearr_51766[(12)] = inst_51699);

return statearr_51766;
})();
if(cljs.core.truth_(inst_51701)){
var statearr_51767_52844 = state_51733__$1;
(statearr_51767_52844[(1)] = (8));

} else {
var statearr_51768_52845 = state_51733__$1;
(statearr_51768_52845[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51734 === (14))){
var inst_51720 = (state_51733[(2)]);
var inst_51721 = cljs.core.async.close_BANG_(out);
var state_51733__$1 = (function (){var statearr_51770 = state_51733;
(statearr_51770[(13)] = inst_51720);

return statearr_51770;
})();
var statearr_51772_52846 = state_51733__$1;
(statearr_51772_52846[(2)] = inst_51721);

(statearr_51772_52846[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51734 === (10))){
var inst_51711 = (state_51733[(2)]);
var state_51733__$1 = state_51733;
var statearr_51773_52852 = state_51733__$1;
(statearr_51773_52852[(2)] = inst_51711);

(statearr_51773_52852[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51734 === (8))){
var inst_51700 = (state_51733[(11)]);
var inst_51691 = (state_51733[(7)]);
var tmp51769 = inst_51691;
var inst_51691__$1 = tmp51769;
var inst_51692 = inst_51700;
var state_51733__$1 = (function (){var statearr_51774 = state_51733;
(statearr_51774[(7)] = inst_51691__$1);

(statearr_51774[(8)] = inst_51692);

return statearr_51774;
})();
var statearr_51779_52853 = state_51733__$1;
(statearr_51779_52853[(2)] = null);

(statearr_51779_52853[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__48630__auto__ = null;
var cljs$core$async$state_machine__48630__auto____0 = (function (){
var statearr_51782 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_51782[(0)] = cljs$core$async$state_machine__48630__auto__);

(statearr_51782[(1)] = (1));

return statearr_51782;
});
var cljs$core$async$state_machine__48630__auto____1 = (function (state_51733){
while(true){
var ret_value__48631__auto__ = (function (){try{while(true){
var result__48632__auto__ = switch__48629__auto__(state_51733);
if(cljs.core.keyword_identical_QMARK_(result__48632__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__48632__auto__;
}
break;
}
}catch (e51786){var ex__48633__auto__ = e51786;
var statearr_51787_52854 = state_51733;
(statearr_51787_52854[(2)] = ex__48633__auto__);


if(cljs.core.seq((state_51733[(4)]))){
var statearr_51789_52855 = state_51733;
(statearr_51789_52855[(1)] = cljs.core.first((state_51733[(4)])));

} else {
throw ex__48633__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__48631__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__52857 = state_51733;
state_51733 = G__52857;
continue;
} else {
return ret_value__48631__auto__;
}
break;
}
});
cljs$core$async$state_machine__48630__auto__ = function(state_51733){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__48630__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__48630__auto____1.call(this,state_51733);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__48630__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__48630__auto____0;
cljs$core$async$state_machine__48630__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__48630__auto____1;
return cljs$core$async$state_machine__48630__auto__;
})()
})();
var state__49007__auto__ = (function (){var statearr_51790 = f__49006__auto__();
(statearr_51790[(6)] = c__49005__auto___52828);

return statearr_51790;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__49007__auto__);
}));


return out;
}));

(cljs.core.async.partition.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition_by = (function cljs$core$async$partition_by(var_args){
var G__51796 = arguments.length;
switch (G__51796) {
case 2:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2 = (function (f,ch){
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3(f,ch,null);
}));

(cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3 = (function (f,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__49005__auto___52862 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__49006__auto__ = (function (){var switch__48629__auto__ = (function (state_51850){
var state_val_51851 = (state_51850[(1)]);
if((state_val_51851 === (7))){
var inst_51846 = (state_51850[(2)]);
var state_51850__$1 = state_51850;
var statearr_51852_52863 = state_51850__$1;
(statearr_51852_52863[(2)] = inst_51846);

(statearr_51852_52863[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51851 === (1))){
var inst_51800 = [];
var inst_51801 = inst_51800;
var inst_51802 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123);
var state_51850__$1 = (function (){var statearr_51853 = state_51850;
(statearr_51853[(7)] = inst_51802);

(statearr_51853[(8)] = inst_51801);

return statearr_51853;
})();
var statearr_51854_52864 = state_51850__$1;
(statearr_51854_52864[(2)] = null);

(statearr_51854_52864[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51851 === (4))){
var inst_51805 = (state_51850[(9)]);
var inst_51805__$1 = (state_51850[(2)]);
var inst_51806 = (inst_51805__$1 == null);
var inst_51807 = cljs.core.not(inst_51806);
var state_51850__$1 = (function (){var statearr_51858 = state_51850;
(statearr_51858[(9)] = inst_51805__$1);

return statearr_51858;
})();
if(inst_51807){
var statearr_51861_52868 = state_51850__$1;
(statearr_51861_52868[(1)] = (5));

} else {
var statearr_51862_52869 = state_51850__$1;
(statearr_51862_52869[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51851 === (15))){
var inst_51801 = (state_51850[(8)]);
var inst_51838 = cljs.core.vec(inst_51801);
var state_51850__$1 = state_51850;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_51850__$1,(18),out,inst_51838);
} else {
if((state_val_51851 === (13))){
var inst_51833 = (state_51850[(2)]);
var state_51850__$1 = state_51850;
var statearr_51863_52870 = state_51850__$1;
(statearr_51863_52870[(2)] = inst_51833);

(statearr_51863_52870[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51851 === (6))){
var inst_51801 = (state_51850[(8)]);
var inst_51835 = inst_51801.length;
var inst_51836 = (inst_51835 > (0));
var state_51850__$1 = state_51850;
if(cljs.core.truth_(inst_51836)){
var statearr_51870_52871 = state_51850__$1;
(statearr_51870_52871[(1)] = (15));

} else {
var statearr_51871_52872 = state_51850__$1;
(statearr_51871_52872[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51851 === (17))){
var inst_51843 = (state_51850[(2)]);
var inst_51844 = cljs.core.async.close_BANG_(out);
var state_51850__$1 = (function (){var statearr_51875 = state_51850;
(statearr_51875[(10)] = inst_51843);

return statearr_51875;
})();
var statearr_51876_52874 = state_51850__$1;
(statearr_51876_52874[(2)] = inst_51844);

(statearr_51876_52874[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51851 === (3))){
var inst_51848 = (state_51850[(2)]);
var state_51850__$1 = state_51850;
return cljs.core.async.impl.ioc_helpers.return_chan(state_51850__$1,inst_51848);
} else {
if((state_val_51851 === (12))){
var inst_51801 = (state_51850[(8)]);
var inst_51820 = cljs.core.vec(inst_51801);
var state_51850__$1 = state_51850;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_51850__$1,(14),out,inst_51820);
} else {
if((state_val_51851 === (2))){
var state_51850__$1 = state_51850;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_51850__$1,(4),ch);
} else {
if((state_val_51851 === (11))){
var inst_51805 = (state_51850[(9)]);
var inst_51809 = (state_51850[(11)]);
var inst_51801 = (state_51850[(8)]);
var inst_51817 = inst_51801.push(inst_51805);
var tmp51877 = inst_51801;
var inst_51801__$1 = tmp51877;
var inst_51802 = inst_51809;
var state_51850__$1 = (function (){var statearr_51879 = state_51850;
(statearr_51879[(7)] = inst_51802);

(statearr_51879[(12)] = inst_51817);

(statearr_51879[(8)] = inst_51801__$1);

return statearr_51879;
})();
var statearr_51880_52880 = state_51850__$1;
(statearr_51880_52880[(2)] = null);

(statearr_51880_52880[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51851 === (9))){
var inst_51802 = (state_51850[(7)]);
var inst_51813 = cljs.core.keyword_identical_QMARK_(inst_51802,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123));
var state_51850__$1 = state_51850;
var statearr_51883_52881 = state_51850__$1;
(statearr_51883_52881[(2)] = inst_51813);

(statearr_51883_52881[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51851 === (5))){
var inst_51802 = (state_51850[(7)]);
var inst_51805 = (state_51850[(9)]);
var inst_51810 = (state_51850[(13)]);
var inst_51809 = (state_51850[(11)]);
var inst_51809__$1 = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(inst_51805) : f.call(null,inst_51805));
var inst_51810__$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_51809__$1,inst_51802);
var state_51850__$1 = (function (){var statearr_51890 = state_51850;
(statearr_51890[(13)] = inst_51810__$1);

(statearr_51890[(11)] = inst_51809__$1);

return statearr_51890;
})();
if(inst_51810__$1){
var statearr_51893_52885 = state_51850__$1;
(statearr_51893_52885[(1)] = (8));

} else {
var statearr_51897_52886 = state_51850__$1;
(statearr_51897_52886[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51851 === (14))){
var inst_51805 = (state_51850[(9)]);
var inst_51809 = (state_51850[(11)]);
var inst_51822 = (state_51850[(2)]);
var inst_51823 = [];
var inst_51827 = inst_51823.push(inst_51805);
var inst_51801 = inst_51823;
var inst_51802 = inst_51809;
var state_51850__$1 = (function (){var statearr_51898 = state_51850;
(statearr_51898[(7)] = inst_51802);

(statearr_51898[(14)] = inst_51827);

(statearr_51898[(8)] = inst_51801);

(statearr_51898[(15)] = inst_51822);

return statearr_51898;
})();
var statearr_51899_52888 = state_51850__$1;
(statearr_51899_52888[(2)] = null);

(statearr_51899_52888[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51851 === (16))){
var state_51850__$1 = state_51850;
var statearr_51900_52889 = state_51850__$1;
(statearr_51900_52889[(2)] = null);

(statearr_51900_52889[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51851 === (10))){
var inst_51815 = (state_51850[(2)]);
var state_51850__$1 = state_51850;
if(cljs.core.truth_(inst_51815)){
var statearr_51903_52890 = state_51850__$1;
(statearr_51903_52890[(1)] = (11));

} else {
var statearr_51904_52891 = state_51850__$1;
(statearr_51904_52891[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51851 === (18))){
var inst_51840 = (state_51850[(2)]);
var state_51850__$1 = state_51850;
var statearr_51905_52892 = state_51850__$1;
(statearr_51905_52892[(2)] = inst_51840);

(statearr_51905_52892[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51851 === (8))){
var inst_51810 = (state_51850[(13)]);
var state_51850__$1 = state_51850;
var statearr_51906_52893 = state_51850__$1;
(statearr_51906_52893[(2)] = inst_51810);

(statearr_51906_52893[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__48630__auto__ = null;
var cljs$core$async$state_machine__48630__auto____0 = (function (){
var statearr_51911 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_51911[(0)] = cljs$core$async$state_machine__48630__auto__);

(statearr_51911[(1)] = (1));

return statearr_51911;
});
var cljs$core$async$state_machine__48630__auto____1 = (function (state_51850){
while(true){
var ret_value__48631__auto__ = (function (){try{while(true){
var result__48632__auto__ = switch__48629__auto__(state_51850);
if(cljs.core.keyword_identical_QMARK_(result__48632__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__48632__auto__;
}
break;
}
}catch (e51912){var ex__48633__auto__ = e51912;
var statearr_51914_52894 = state_51850;
(statearr_51914_52894[(2)] = ex__48633__auto__);


if(cljs.core.seq((state_51850[(4)]))){
var statearr_51915_52896 = state_51850;
(statearr_51915_52896[(1)] = cljs.core.first((state_51850[(4)])));

} else {
throw ex__48633__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__48631__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__52897 = state_51850;
state_51850 = G__52897;
continue;
} else {
return ret_value__48631__auto__;
}
break;
}
});
cljs$core$async$state_machine__48630__auto__ = function(state_51850){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__48630__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__48630__auto____1.call(this,state_51850);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__48630__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__48630__auto____0;
cljs$core$async$state_machine__48630__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__48630__auto____1;
return cljs$core$async$state_machine__48630__auto__;
})()
})();
var state__49007__auto__ = (function (){var statearr_51916 = f__49006__auto__();
(statearr_51916[(6)] = c__49005__auto___52862);

return statearr_51916;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__49007__auto__);
}));


return out;
}));

(cljs.core.async.partition_by.cljs$lang$maxFixedArity = 3);


//# sourceMappingURL=cljs.core.async.js.map
