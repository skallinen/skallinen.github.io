// Compiled by ClojureScript 1.10.597 {}
goog.provide('cljs.core.async');
goog.require('cljs.core');
goog.require('cljs.core.async.impl.protocols');
goog.require('cljs.core.async.impl.channels');
goog.require('cljs.core.async.impl.buffers');
goog.require('cljs.core.async.impl.timers');
goog.require('cljs.core.async.impl.dispatch');
goog.require('cljs.core.async.impl.ioc_helpers');
cljs.core.async.fn_handler = (function cljs$core$async$fn_handler(var_args){
var G__26379 = arguments.length;
switch (G__26379) {
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
return cljs.core.async.fn_handler.call(null,f,true);
}));

(cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2 = (function (f,blockable){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async26380 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async26380 = (function (f,blockable,meta26381){
this.f = f;
this.blockable = blockable;
this.meta26381 = meta26381;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async26380.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_26382,meta26381__$1){
var self__ = this;
var _26382__$1 = this;
return (new cljs.core.async.t_cljs$core$async26380(self__.f,self__.blockable,meta26381__$1));
}));

(cljs.core.async.t_cljs$core$async26380.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_26382){
var self__ = this;
var _26382__$1 = this;
return self__.meta26381;
}));

(cljs.core.async.t_cljs$core$async26380.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async26380.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async26380.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.blockable;
}));

(cljs.core.async.t_cljs$core$async26380.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.f;
}));

(cljs.core.async.t_cljs$core$async26380.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"blockable","blockable",-28395259,null),new cljs.core.Symbol(null,"meta26381","meta26381",-560473441,null)], null);
}));

(cljs.core.async.t_cljs$core$async26380.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async26380.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async26380");

(cljs.core.async.t_cljs$core$async26380.cljs$lang$ctorPrWriter = (function (this__4428__auto__,writer__4429__auto__,opt__4430__auto__){
return cljs.core._write.call(null,writer__4429__auto__,"cljs.core.async/t_cljs$core$async26380");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async26380.
 */
cljs.core.async.__GT_t_cljs$core$async26380 = (function cljs$core$async$__GT_t_cljs$core$async26380(f__$1,blockable__$1,meta26381){
return (new cljs.core.async.t_cljs$core$async26380(f__$1,blockable__$1,meta26381));
});

}

return (new cljs.core.async.t_cljs$core$async26380(f,blockable,cljs.core.PersistentArrayMap.EMPTY));
}));

(cljs.core.async.fn_handler.cljs$lang$maxFixedArity = 2);

/**
 * Returns a fixed buffer of size n. When full, puts will block/park.
 */
cljs.core.async.buffer = (function cljs$core$async$buffer(n){
return cljs.core.async.impl.buffers.fixed_buffer.call(null,n);
});
/**
 * Returns a buffer of size n. When full, puts will complete but
 *   val will be dropped (no transfer).
 */
cljs.core.async.dropping_buffer = (function cljs$core$async$dropping_buffer(n){
return cljs.core.async.impl.buffers.dropping_buffer.call(null,n);
});
/**
 * Returns a buffer of size n. When full, puts will complete, and be
 *   buffered, but oldest elements in buffer will be dropped (not
 *   transferred).
 */
cljs.core.async.sliding_buffer = (function cljs$core$async$sliding_buffer(n){
return cljs.core.async.impl.buffers.sliding_buffer.call(null,n);
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
return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,buff);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,buff);
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
var G__26386 = arguments.length;
switch (G__26386) {
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
return cljs.core.async.chan.call(null,null);
}));

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1 = (function (buf_or_n){
return cljs.core.async.chan.call(null,buf_or_n,null,null);
}));

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2 = (function (buf_or_n,xform){
return cljs.core.async.chan.call(null,buf_or_n,xform,null);
}));

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3 = (function (buf_or_n,xform,ex_handler){
var buf_or_n__$1 = ((cljs.core._EQ_.call(null,buf_or_n,(0)))?null:buf_or_n);
if(cljs.core.truth_(xform)){
if(cljs.core.truth_(buf_or_n__$1)){
} else {
throw (new Error(["Assert failed: ","buffer must be supplied when transducer is","\n","buf-or-n"].join('')));
}
} else {
}

return cljs.core.async.impl.channels.chan.call(null,((typeof buf_or_n__$1 === 'number')?cljs.core.async.buffer.call(null,buf_or_n__$1):buf_or_n__$1),xform,ex_handler);
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
var G__26389 = arguments.length;
switch (G__26389) {
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
return cljs.core.async.promise_chan.call(null,null);
}));

(cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1 = (function (xform){
return cljs.core.async.promise_chan.call(null,xform,null);
}));

(cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2 = (function (xform,ex_handler){
return cljs.core.async.chan.call(null,cljs.core.async.impl.buffers.promise_buffer.call(null),xform,ex_handler);
}));

(cljs.core.async.promise_chan.cljs$lang$maxFixedArity = 2);

/**
 * Returns a channel that will close after msecs
 */
cljs.core.async.timeout = (function cljs$core$async$timeout(msecs){
return cljs.core.async.impl.timers.timeout.call(null,msecs);
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
var G__26392 = arguments.length;
switch (G__26392) {
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
return cljs.core.async.take_BANG_.call(null,port,fn1,true);
}));

(cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,fn1,on_caller_QMARK_){
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.fn_handler.call(null,fn1));
if(cljs.core.truth_(ret)){
var val_26394 = cljs.core.deref.call(null,ret);
if(cljs.core.truth_(on_caller_QMARK_)){
fn1.call(null,val_26394);
} else {
cljs.core.async.impl.dispatch.run.call(null,(function (){
return fn1.call(null,val_26394);
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
cljs.core.async.fhnop = cljs.core.async.fn_handler.call(null,cljs.core.async.nop);
/**
 * puts a val into port. nil values are not allowed. Must be called
 *   inside a (go ...) block. Will park if no buffer space is available.
 *   Returns true unless port is already closed.
 */
cljs.core.async._GT__BANG_ = (function cljs$core$async$_GT__BANG_(port,val){
throw (new Error(">! used not in (go ...) block"));
});
/**
 * Asynchronously puts a val into port, calling fn0 (if supplied) when
 * complete. nil values are not allowed. Will throw if closed. If
 * on-caller? (default true) is true, and the put is immediately
 * accepted, will call fn0 on calling thread.  Returns nil.
 */
cljs.core.async.put_BANG_ = (function cljs$core$async$put_BANG_(var_args){
var G__26396 = arguments.length;
switch (G__26396) {
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
var temp__5733__auto__ = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fhnop);
if(cljs.core.truth_(temp__5733__auto__)){
var ret = temp__5733__auto__;
return cljs.core.deref.call(null,ret);
} else {
return true;
}
}));

(cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,val,fn1){
return cljs.core.async.put_BANG_.call(null,port,val,fn1,true);
}));

(cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (port,val,fn1,on_caller_QMARK_){
var temp__5733__auto__ = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fn_handler.call(null,fn1));
if(cljs.core.truth_(temp__5733__auto__)){
var retb = temp__5733__auto__;
var ret = cljs.core.deref.call(null,retb);
if(cljs.core.truth_(on_caller_QMARK_)){
fn1.call(null,ret);
} else {
cljs.core.async.impl.dispatch.run.call(null,(function (){
return fn1.call(null,ret);
}));
}

return ret;
} else {
return true;
}
}));

(cljs.core.async.put_BANG_.cljs$lang$maxFixedArity = 4);

cljs.core.async.close_BANG_ = (function cljs$core$async$close_BANG_(port){
return cljs.core.async.impl.protocols.close_BANG_.call(null,port);
});
cljs.core.async.random_array = (function cljs$core$async$random_array(n){
var a = (new Array(n));
var n__4666__auto___26398 = n;
var x_26399 = (0);
while(true){
if((x_26399 < n__4666__auto___26398)){
(a[x_26399] = (0));

var G__26400 = (x_26399 + (1));
x_26399 = G__26400;
continue;
} else {
}
break;
}

var i = (1);
while(true){
if(cljs.core._EQ_.call(null,i,n)){
return a;
} else {
var j = cljs.core.rand_int.call(null,i);
(a[i] = (a[j]));

(a[j] = i);

var G__26401 = (i + (1));
i = G__26401;
continue;
}
break;
}
});
cljs.core.async.alt_flag = (function cljs$core$async$alt_flag(){
var flag = cljs.core.atom.call(null,true);
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async26402 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async26402 = (function (flag,meta26403){
this.flag = flag;
this.meta26403 = meta26403;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async26402.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_26404,meta26403__$1){
var self__ = this;
var _26404__$1 = this;
return (new cljs.core.async.t_cljs$core$async26402(self__.flag,meta26403__$1));
}));

(cljs.core.async.t_cljs$core$async26402.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_26404){
var self__ = this;
var _26404__$1 = this;
return self__.meta26403;
}));

(cljs.core.async.t_cljs$core$async26402.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async26402.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.deref.call(null,self__.flag);
}));

(cljs.core.async.t_cljs$core$async26402.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async26402.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.flag,null);

return true;
}));

(cljs.core.async.t_cljs$core$async26402.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"meta26403","meta26403",587785306,null)], null);
}));

(cljs.core.async.t_cljs$core$async26402.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async26402.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async26402");

(cljs.core.async.t_cljs$core$async26402.cljs$lang$ctorPrWriter = (function (this__4428__auto__,writer__4429__auto__,opt__4430__auto__){
return cljs.core._write.call(null,writer__4429__auto__,"cljs.core.async/t_cljs$core$async26402");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async26402.
 */
cljs.core.async.__GT_t_cljs$core$async26402 = (function cljs$core$async$alt_flag_$___GT_t_cljs$core$async26402(flag__$1,meta26403){
return (new cljs.core.async.t_cljs$core$async26402(flag__$1,meta26403));
});

}

return (new cljs.core.async.t_cljs$core$async26402(flag,cljs.core.PersistentArrayMap.EMPTY));
});
cljs.core.async.alt_handler = (function cljs$core$async$alt_handler(flag,cb){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async26405 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async26405 = (function (flag,cb,meta26406){
this.flag = flag;
this.cb = cb;
this.meta26406 = meta26406;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async26405.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_26407,meta26406__$1){
var self__ = this;
var _26407__$1 = this;
return (new cljs.core.async.t_cljs$core$async26405(self__.flag,self__.cb,meta26406__$1));
}));

(cljs.core.async.t_cljs$core$async26405.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_26407){
var self__ = this;
var _26407__$1 = this;
return self__.meta26406;
}));

(cljs.core.async.t_cljs$core$async26405.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async26405.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.flag);
}));

(cljs.core.async.t_cljs$core$async26405.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async26405.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.async.impl.protocols.commit.call(null,self__.flag);

return self__.cb;
}));

(cljs.core.async.t_cljs$core$async26405.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null),new cljs.core.Symbol(null,"meta26406","meta26406",465702328,null)], null);
}));

(cljs.core.async.t_cljs$core$async26405.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async26405.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async26405");

(cljs.core.async.t_cljs$core$async26405.cljs$lang$ctorPrWriter = (function (this__4428__auto__,writer__4429__auto__,opt__4430__auto__){
return cljs.core._write.call(null,writer__4429__auto__,"cljs.core.async/t_cljs$core$async26405");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async26405.
 */
cljs.core.async.__GT_t_cljs$core$async26405 = (function cljs$core$async$alt_handler_$___GT_t_cljs$core$async26405(flag__$1,cb__$1,meta26406){
return (new cljs.core.async.t_cljs$core$async26405(flag__$1,cb__$1,meta26406));
});

}

return (new cljs.core.async.t_cljs$core$async26405(flag,cb,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * returns derefable [val port] if immediate, nil if enqueued
 */
cljs.core.async.do_alts = (function cljs$core$async$do_alts(fret,ports,opts){
var flag = cljs.core.async.alt_flag.call(null);
var n = cljs.core.count.call(null,ports);
var idxs = cljs.core.async.random_array.call(null,n);
var priority = new cljs.core.Keyword(null,"priority","priority",1431093715).cljs$core$IFn$_invoke$arity$1(opts);
var ret = (function (){var i = (0);
while(true){
if((i < n)){
var idx = (cljs.core.truth_(priority)?i:(idxs[i]));
var port = cljs.core.nth.call(null,ports,idx);
var wport = ((cljs.core.vector_QMARK_.call(null,port))?port.call(null,(0)):null);
var vbox = (cljs.core.truth_(wport)?(function (){var val = port.call(null,(1));
return cljs.core.async.impl.protocols.put_BANG_.call(null,wport,val,cljs.core.async.alt_handler.call(null,flag,((function (i,val,idx,port,wport,flag,n,idxs,priority){
return (function (p1__26408_SHARP_){
return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__26408_SHARP_,wport], null));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.alt_handler.call(null,flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__26409_SHARP_){
return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__26409_SHARP_,port], null));
});})(i,idx,port,wport,flag,n,idxs,priority))
)));
if(cljs.core.truth_(vbox)){
return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref.call(null,vbox),(function (){var or__4185__auto__ = wport;
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return port;
}
})()], null));
} else {
var G__26410 = (i + (1));
i = G__26410;
continue;
}
} else {
return null;
}
break;
}
})();
var or__4185__auto__ = ret;
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
if(cljs.core.contains_QMARK_.call(null,opts,new cljs.core.Keyword(null,"default","default",-1987822328))){
var temp__5735__auto__ = (function (){var and__4174__auto__ = cljs.core.async.impl.protocols.active_QMARK_.call(null,flag);
if(cljs.core.truth_(and__4174__auto__)){
return cljs.core.async.impl.protocols.commit.call(null,flag);
} else {
return and__4174__auto__;
}
})();
if(cljs.core.truth_(temp__5735__auto__)){
var got = temp__5735__auto__;
return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"default","default",-1987822328).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"default","default",-1987822328)], null));
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
var args__4795__auto__ = [];
var len__4789__auto___26416 = arguments.length;
var i__4790__auto___26417 = (0);
while(true){
if((i__4790__auto___26417 < len__4789__auto___26416)){
args__4795__auto__.push((arguments[i__4790__auto___26417]));

var G__26418 = (i__4790__auto___26417 + (1));
i__4790__auto___26417 = G__26418;
continue;
} else {
}
break;
}

var argseq__4796__auto__ = ((((1) < args__4795__auto__.length))?(new cljs.core.IndexedSeq(args__4795__auto__.slice((1)),(0),null)):null);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__4796__auto__);
});

(cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ports,p__26413){
var map__26414 = p__26413;
var map__26414__$1 = (((((!((map__26414 == null))))?(((((map__26414.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__26414.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__26414):map__26414);
var opts = map__26414__$1;
throw (new Error("alts! used not in (go ...) block"));
}));

(cljs.core.async.alts_BANG_.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(cljs.core.async.alts_BANG_.cljs$lang$applyTo = (function (seq26411){
var G__26412 = cljs.core.first.call(null,seq26411);
var seq26411__$1 = cljs.core.next.call(null,seq26411);
var self__4776__auto__ = this;
return self__4776__auto__.cljs$core$IFn$_invoke$arity$variadic(G__26412,seq26411__$1);
}));

/**
 * Puts a val into port if it's possible to do so immediately.
 *   nil values are not allowed. Never blocks. Returns true if offer succeeds.
 */
cljs.core.async.offer_BANG_ = (function cljs$core$async$offer_BANG_(port,val){
var ret = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fn_handler.call(null,cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return cljs.core.deref.call(null,ret);
} else {
return null;
}
});
/**
 * Takes a val from port if it's possible to do so immediately.
 *   Never blocks. Returns value if successful, nil otherwise.
 */
cljs.core.async.poll_BANG_ = (function cljs$core$async$poll_BANG_(port){
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.fn_handler.call(null,cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return cljs.core.deref.call(null,ret);
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
var G__26420 = arguments.length;
switch (G__26420) {
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
return cljs.core.async.pipe.call(null,from,to,true);
}));

(cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3 = (function (from,to,close_QMARK_){
var c__26319__auto___26466 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26320__auto__ = (function (){var switch__26224__auto__ = (function (state_26444){
var state_val_26445 = (state_26444[(1)]);
if((state_val_26445 === (7))){
var inst_26440 = (state_26444[(2)]);
var state_26444__$1 = state_26444;
var statearr_26446_26467 = state_26444__$1;
(statearr_26446_26467[(2)] = inst_26440);

(statearr_26446_26467[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26445 === (1))){
var state_26444__$1 = state_26444;
var statearr_26447_26468 = state_26444__$1;
(statearr_26447_26468[(2)] = null);

(statearr_26447_26468[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26445 === (4))){
var inst_26423 = (state_26444[(7)]);
var inst_26423__$1 = (state_26444[(2)]);
var inst_26424 = (inst_26423__$1 == null);
var state_26444__$1 = (function (){var statearr_26448 = state_26444;
(statearr_26448[(7)] = inst_26423__$1);

return statearr_26448;
})();
if(cljs.core.truth_(inst_26424)){
var statearr_26449_26469 = state_26444__$1;
(statearr_26449_26469[(1)] = (5));

} else {
var statearr_26450_26470 = state_26444__$1;
(statearr_26450_26470[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26445 === (13))){
var state_26444__$1 = state_26444;
var statearr_26451_26471 = state_26444__$1;
(statearr_26451_26471[(2)] = null);

(statearr_26451_26471[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26445 === (6))){
var inst_26423 = (state_26444[(7)]);
var state_26444__$1 = state_26444;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26444__$1,(11),to,inst_26423);
} else {
if((state_val_26445 === (3))){
var inst_26442 = (state_26444[(2)]);
var state_26444__$1 = state_26444;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26444__$1,inst_26442);
} else {
if((state_val_26445 === (12))){
var state_26444__$1 = state_26444;
var statearr_26452_26472 = state_26444__$1;
(statearr_26452_26472[(2)] = null);

(statearr_26452_26472[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26445 === (2))){
var state_26444__$1 = state_26444;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26444__$1,(4),from);
} else {
if((state_val_26445 === (11))){
var inst_26433 = (state_26444[(2)]);
var state_26444__$1 = state_26444;
if(cljs.core.truth_(inst_26433)){
var statearr_26453_26473 = state_26444__$1;
(statearr_26453_26473[(1)] = (12));

} else {
var statearr_26454_26474 = state_26444__$1;
(statearr_26454_26474[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26445 === (9))){
var state_26444__$1 = state_26444;
var statearr_26455_26475 = state_26444__$1;
(statearr_26455_26475[(2)] = null);

(statearr_26455_26475[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26445 === (5))){
var state_26444__$1 = state_26444;
if(cljs.core.truth_(close_QMARK_)){
var statearr_26456_26476 = state_26444__$1;
(statearr_26456_26476[(1)] = (8));

} else {
var statearr_26457_26477 = state_26444__$1;
(statearr_26457_26477[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26445 === (14))){
var inst_26438 = (state_26444[(2)]);
var state_26444__$1 = state_26444;
var statearr_26458_26478 = state_26444__$1;
(statearr_26458_26478[(2)] = inst_26438);

(statearr_26458_26478[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26445 === (10))){
var inst_26430 = (state_26444[(2)]);
var state_26444__$1 = state_26444;
var statearr_26459_26479 = state_26444__$1;
(statearr_26459_26479[(2)] = inst_26430);

(statearr_26459_26479[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26445 === (8))){
var inst_26427 = cljs.core.async.close_BANG_.call(null,to);
var state_26444__$1 = state_26444;
var statearr_26460_26480 = state_26444__$1;
(statearr_26460_26480[(2)] = inst_26427);

(statearr_26460_26480[(1)] = (10));


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
var cljs$core$async$state_machine__26225__auto__ = null;
var cljs$core$async$state_machine__26225__auto____0 = (function (){
var statearr_26461 = [null,null,null,null,null,null,null,null];
(statearr_26461[(0)] = cljs$core$async$state_machine__26225__auto__);

(statearr_26461[(1)] = (1));

return statearr_26461;
});
var cljs$core$async$state_machine__26225__auto____1 = (function (state_26444){
while(true){
var ret_value__26226__auto__ = (function (){try{while(true){
var result__26227__auto__ = switch__26224__auto__.call(null,state_26444);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26227__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26227__auto__;
}
break;
}
}catch (e26462){if((e26462 instanceof Object)){
var ex__26228__auto__ = e26462;
var statearr_26463_26481 = state_26444;
(statearr_26463_26481[(5)] = ex__26228__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26444);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26462;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26226__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26482 = state_26444;
state_26444 = G__26482;
continue;
} else {
return ret_value__26226__auto__;
}
break;
}
});
cljs$core$async$state_machine__26225__auto__ = function(state_26444){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__26225__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__26225__auto____1.call(this,state_26444);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__26225__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__26225__auto____0;
cljs$core$async$state_machine__26225__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__26225__auto____1;
return cljs$core$async$state_machine__26225__auto__;
})()
})();
var state__26321__auto__ = (function (){var statearr_26464 = f__26320__auto__.call(null);
(statearr_26464[(6)] = c__26319__auto___26466);

return statearr_26464;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26321__auto__);
}));


return to;
}));

(cljs.core.async.pipe.cljs$lang$maxFixedArity = 3);

cljs.core.async.pipeline_STAR_ = (function cljs$core$async$pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,type){
if((n > (0))){
} else {
throw (new Error("Assert failed: (pos? n)"));
}

var jobs = cljs.core.async.chan.call(null,n);
var results = cljs.core.async.chan.call(null,n);
var process = (function (p__26483){
var vec__26484 = p__26483;
var v = cljs.core.nth.call(null,vec__26484,(0),null);
var p = cljs.core.nth.call(null,vec__26484,(1),null);
var job = vec__26484;
if((job == null)){
cljs.core.async.close_BANG_.call(null,results);

return null;
} else {
var res = cljs.core.async.chan.call(null,(1),xf,ex_handler);
var c__26319__auto___26655 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26320__auto__ = (function (){var switch__26224__auto__ = (function (state_26491){
var state_val_26492 = (state_26491[(1)]);
if((state_val_26492 === (1))){
var state_26491__$1 = state_26491;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26491__$1,(2),res,v);
} else {
if((state_val_26492 === (2))){
var inst_26488 = (state_26491[(2)]);
var inst_26489 = cljs.core.async.close_BANG_.call(null,res);
var state_26491__$1 = (function (){var statearr_26493 = state_26491;
(statearr_26493[(7)] = inst_26488);

return statearr_26493;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26491__$1,inst_26489);
} else {
return null;
}
}
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__26225__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__26225__auto____0 = (function (){
var statearr_26494 = [null,null,null,null,null,null,null,null];
(statearr_26494[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__26225__auto__);

(statearr_26494[(1)] = (1));

return statearr_26494;
});
var cljs$core$async$pipeline_STAR__$_state_machine__26225__auto____1 = (function (state_26491){
while(true){
var ret_value__26226__auto__ = (function (){try{while(true){
var result__26227__auto__ = switch__26224__auto__.call(null,state_26491);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26227__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26227__auto__;
}
break;
}
}catch (e26495){if((e26495 instanceof Object)){
var ex__26228__auto__ = e26495;
var statearr_26496_26656 = state_26491;
(statearr_26496_26656[(5)] = ex__26228__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26491);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26495;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26226__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26657 = state_26491;
state_26491 = G__26657;
continue;
} else {
return ret_value__26226__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__26225__auto__ = function(state_26491){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__26225__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__26225__auto____1.call(this,state_26491);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__26225__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__26225__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__26225__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__26225__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__26225__auto__;
})()
})();
var state__26321__auto__ = (function (){var statearr_26497 = f__26320__auto__.call(null);
(statearr_26497[(6)] = c__26319__auto___26655);

return statearr_26497;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26321__auto__);
}));


cljs.core.async.put_BANG_.call(null,p,res);

return true;
}
});
var async = (function (p__26498){
var vec__26499 = p__26498;
var v = cljs.core.nth.call(null,vec__26499,(0),null);
var p = cljs.core.nth.call(null,vec__26499,(1),null);
var job = vec__26499;
if((job == null)){
cljs.core.async.close_BANG_.call(null,results);

return null;
} else {
var res = cljs.core.async.chan.call(null,(1));
xf.call(null,v,res);

cljs.core.async.put_BANG_.call(null,p,res);

return true;
}
});
var n__4666__auto___26658 = n;
var __26659 = (0);
while(true){
if((__26659 < n__4666__auto___26658)){
var G__26502_26660 = type;
var G__26502_26661__$1 = (((G__26502_26660 instanceof cljs.core.Keyword))?G__26502_26660.fqn:null);
switch (G__26502_26661__$1) {
case "compute":
var c__26319__auto___26663 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (__26659,c__26319__auto___26663,G__26502_26660,G__26502_26661__$1,n__4666__auto___26658,jobs,results,process,async){
return (function (){
var f__26320__auto__ = (function (){var switch__26224__auto__ = ((function (__26659,c__26319__auto___26663,G__26502_26660,G__26502_26661__$1,n__4666__auto___26658,jobs,results,process,async){
return (function (state_26515){
var state_val_26516 = (state_26515[(1)]);
if((state_val_26516 === (1))){
var state_26515__$1 = state_26515;
var statearr_26517_26664 = state_26515__$1;
(statearr_26517_26664[(2)] = null);

(statearr_26517_26664[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26516 === (2))){
var state_26515__$1 = state_26515;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26515__$1,(4),jobs);
} else {
if((state_val_26516 === (3))){
var inst_26513 = (state_26515[(2)]);
var state_26515__$1 = state_26515;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26515__$1,inst_26513);
} else {
if((state_val_26516 === (4))){
var inst_26505 = (state_26515[(2)]);
var inst_26506 = process.call(null,inst_26505);
var state_26515__$1 = state_26515;
if(cljs.core.truth_(inst_26506)){
var statearr_26518_26665 = state_26515__$1;
(statearr_26518_26665[(1)] = (5));

} else {
var statearr_26519_26666 = state_26515__$1;
(statearr_26519_26666[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26516 === (5))){
var state_26515__$1 = state_26515;
var statearr_26520_26667 = state_26515__$1;
(statearr_26520_26667[(2)] = null);

(statearr_26520_26667[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26516 === (6))){
var state_26515__$1 = state_26515;
var statearr_26521_26668 = state_26515__$1;
(statearr_26521_26668[(2)] = null);

(statearr_26521_26668[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26516 === (7))){
var inst_26511 = (state_26515[(2)]);
var state_26515__$1 = state_26515;
var statearr_26522_26669 = state_26515__$1;
(statearr_26522_26669[(2)] = inst_26511);

(statearr_26522_26669[(1)] = (3));


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
});})(__26659,c__26319__auto___26663,G__26502_26660,G__26502_26661__$1,n__4666__auto___26658,jobs,results,process,async))
;
return ((function (__26659,switch__26224__auto__,c__26319__auto___26663,G__26502_26660,G__26502_26661__$1,n__4666__auto___26658,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__26225__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__26225__auto____0 = (function (){
var statearr_26523 = [null,null,null,null,null,null,null];
(statearr_26523[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__26225__auto__);

(statearr_26523[(1)] = (1));

return statearr_26523;
});
var cljs$core$async$pipeline_STAR__$_state_machine__26225__auto____1 = (function (state_26515){
while(true){
var ret_value__26226__auto__ = (function (){try{while(true){
var result__26227__auto__ = switch__26224__auto__.call(null,state_26515);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26227__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26227__auto__;
}
break;
}
}catch (e26524){if((e26524 instanceof Object)){
var ex__26228__auto__ = e26524;
var statearr_26525_26670 = state_26515;
(statearr_26525_26670[(5)] = ex__26228__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26515);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26524;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26226__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26671 = state_26515;
state_26515 = G__26671;
continue;
} else {
return ret_value__26226__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__26225__auto__ = function(state_26515){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__26225__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__26225__auto____1.call(this,state_26515);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__26225__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__26225__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__26225__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__26225__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__26225__auto__;
})()
;})(__26659,switch__26224__auto__,c__26319__auto___26663,G__26502_26660,G__26502_26661__$1,n__4666__auto___26658,jobs,results,process,async))
})();
var state__26321__auto__ = (function (){var statearr_26526 = f__26320__auto__.call(null);
(statearr_26526[(6)] = c__26319__auto___26663);

return statearr_26526;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26321__auto__);
});})(__26659,c__26319__auto___26663,G__26502_26660,G__26502_26661__$1,n__4666__auto___26658,jobs,results,process,async))
);


break;
case "async":
var c__26319__auto___26672 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (__26659,c__26319__auto___26672,G__26502_26660,G__26502_26661__$1,n__4666__auto___26658,jobs,results,process,async){
return (function (){
var f__26320__auto__ = (function (){var switch__26224__auto__ = ((function (__26659,c__26319__auto___26672,G__26502_26660,G__26502_26661__$1,n__4666__auto___26658,jobs,results,process,async){
return (function (state_26539){
var state_val_26540 = (state_26539[(1)]);
if((state_val_26540 === (1))){
var state_26539__$1 = state_26539;
var statearr_26541_26673 = state_26539__$1;
(statearr_26541_26673[(2)] = null);

(statearr_26541_26673[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26540 === (2))){
var state_26539__$1 = state_26539;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26539__$1,(4),jobs);
} else {
if((state_val_26540 === (3))){
var inst_26537 = (state_26539[(2)]);
var state_26539__$1 = state_26539;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26539__$1,inst_26537);
} else {
if((state_val_26540 === (4))){
var inst_26529 = (state_26539[(2)]);
var inst_26530 = async.call(null,inst_26529);
var state_26539__$1 = state_26539;
if(cljs.core.truth_(inst_26530)){
var statearr_26542_26674 = state_26539__$1;
(statearr_26542_26674[(1)] = (5));

} else {
var statearr_26543_26675 = state_26539__$1;
(statearr_26543_26675[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26540 === (5))){
var state_26539__$1 = state_26539;
var statearr_26544_26676 = state_26539__$1;
(statearr_26544_26676[(2)] = null);

(statearr_26544_26676[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26540 === (6))){
var state_26539__$1 = state_26539;
var statearr_26545_26677 = state_26539__$1;
(statearr_26545_26677[(2)] = null);

(statearr_26545_26677[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26540 === (7))){
var inst_26535 = (state_26539[(2)]);
var state_26539__$1 = state_26539;
var statearr_26546_26678 = state_26539__$1;
(statearr_26546_26678[(2)] = inst_26535);

(statearr_26546_26678[(1)] = (3));


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
});})(__26659,c__26319__auto___26672,G__26502_26660,G__26502_26661__$1,n__4666__auto___26658,jobs,results,process,async))
;
return ((function (__26659,switch__26224__auto__,c__26319__auto___26672,G__26502_26660,G__26502_26661__$1,n__4666__auto___26658,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__26225__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__26225__auto____0 = (function (){
var statearr_26547 = [null,null,null,null,null,null,null];
(statearr_26547[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__26225__auto__);

(statearr_26547[(1)] = (1));

return statearr_26547;
});
var cljs$core$async$pipeline_STAR__$_state_machine__26225__auto____1 = (function (state_26539){
while(true){
var ret_value__26226__auto__ = (function (){try{while(true){
var result__26227__auto__ = switch__26224__auto__.call(null,state_26539);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26227__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26227__auto__;
}
break;
}
}catch (e26548){if((e26548 instanceof Object)){
var ex__26228__auto__ = e26548;
var statearr_26549_26679 = state_26539;
(statearr_26549_26679[(5)] = ex__26228__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26539);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26548;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26226__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26680 = state_26539;
state_26539 = G__26680;
continue;
} else {
return ret_value__26226__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__26225__auto__ = function(state_26539){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__26225__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__26225__auto____1.call(this,state_26539);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__26225__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__26225__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__26225__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__26225__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__26225__auto__;
})()
;})(__26659,switch__26224__auto__,c__26319__auto___26672,G__26502_26660,G__26502_26661__$1,n__4666__auto___26658,jobs,results,process,async))
})();
var state__26321__auto__ = (function (){var statearr_26550 = f__26320__auto__.call(null);
(statearr_26550[(6)] = c__26319__auto___26672);

return statearr_26550;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26321__auto__);
});})(__26659,c__26319__auto___26672,G__26502_26660,G__26502_26661__$1,n__4666__auto___26658,jobs,results,process,async))
);


break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__26502_26661__$1)].join('')));

}

var G__26681 = (__26659 + (1));
__26659 = G__26681;
continue;
} else {
}
break;
}

var c__26319__auto___26682 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26320__auto__ = (function (){var switch__26224__auto__ = (function (state_26572){
var state_val_26573 = (state_26572[(1)]);
if((state_val_26573 === (7))){
var inst_26568 = (state_26572[(2)]);
var state_26572__$1 = state_26572;
var statearr_26574_26683 = state_26572__$1;
(statearr_26574_26683[(2)] = inst_26568);

(statearr_26574_26683[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26573 === (1))){
var state_26572__$1 = state_26572;
var statearr_26575_26684 = state_26572__$1;
(statearr_26575_26684[(2)] = null);

(statearr_26575_26684[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26573 === (4))){
var inst_26553 = (state_26572[(7)]);
var inst_26553__$1 = (state_26572[(2)]);
var inst_26554 = (inst_26553__$1 == null);
var state_26572__$1 = (function (){var statearr_26576 = state_26572;
(statearr_26576[(7)] = inst_26553__$1);

return statearr_26576;
})();
if(cljs.core.truth_(inst_26554)){
var statearr_26577_26685 = state_26572__$1;
(statearr_26577_26685[(1)] = (5));

} else {
var statearr_26578_26686 = state_26572__$1;
(statearr_26578_26686[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26573 === (6))){
var inst_26553 = (state_26572[(7)]);
var inst_26558 = (state_26572[(8)]);
var inst_26558__$1 = cljs.core.async.chan.call(null,(1));
var inst_26559 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_26560 = [inst_26553,inst_26558__$1];
var inst_26561 = (new cljs.core.PersistentVector(null,2,(5),inst_26559,inst_26560,null));
var state_26572__$1 = (function (){var statearr_26579 = state_26572;
(statearr_26579[(8)] = inst_26558__$1);

return statearr_26579;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26572__$1,(8),jobs,inst_26561);
} else {
if((state_val_26573 === (3))){
var inst_26570 = (state_26572[(2)]);
var state_26572__$1 = state_26572;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26572__$1,inst_26570);
} else {
if((state_val_26573 === (2))){
var state_26572__$1 = state_26572;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26572__$1,(4),from);
} else {
if((state_val_26573 === (9))){
var inst_26565 = (state_26572[(2)]);
var state_26572__$1 = (function (){var statearr_26580 = state_26572;
(statearr_26580[(9)] = inst_26565);

return statearr_26580;
})();
var statearr_26581_26687 = state_26572__$1;
(statearr_26581_26687[(2)] = null);

(statearr_26581_26687[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26573 === (5))){
var inst_26556 = cljs.core.async.close_BANG_.call(null,jobs);
var state_26572__$1 = state_26572;
var statearr_26582_26688 = state_26572__$1;
(statearr_26582_26688[(2)] = inst_26556);

(statearr_26582_26688[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26573 === (8))){
var inst_26558 = (state_26572[(8)]);
var inst_26563 = (state_26572[(2)]);
var state_26572__$1 = (function (){var statearr_26583 = state_26572;
(statearr_26583[(10)] = inst_26563);

return statearr_26583;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26572__$1,(9),results,inst_26558);
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
var cljs$core$async$pipeline_STAR__$_state_machine__26225__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__26225__auto____0 = (function (){
var statearr_26584 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_26584[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__26225__auto__);

(statearr_26584[(1)] = (1));

return statearr_26584;
});
var cljs$core$async$pipeline_STAR__$_state_machine__26225__auto____1 = (function (state_26572){
while(true){
var ret_value__26226__auto__ = (function (){try{while(true){
var result__26227__auto__ = switch__26224__auto__.call(null,state_26572);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26227__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26227__auto__;
}
break;
}
}catch (e26585){if((e26585 instanceof Object)){
var ex__26228__auto__ = e26585;
var statearr_26586_26689 = state_26572;
(statearr_26586_26689[(5)] = ex__26228__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26572);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26585;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26226__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26690 = state_26572;
state_26572 = G__26690;
continue;
} else {
return ret_value__26226__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__26225__auto__ = function(state_26572){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__26225__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__26225__auto____1.call(this,state_26572);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__26225__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__26225__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__26225__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__26225__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__26225__auto__;
})()
})();
var state__26321__auto__ = (function (){var statearr_26587 = f__26320__auto__.call(null);
(statearr_26587[(6)] = c__26319__auto___26682);

return statearr_26587;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26321__auto__);
}));


var c__26319__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26320__auto__ = (function (){var switch__26224__auto__ = (function (state_26625){
var state_val_26626 = (state_26625[(1)]);
if((state_val_26626 === (7))){
var inst_26621 = (state_26625[(2)]);
var state_26625__$1 = state_26625;
var statearr_26627_26691 = state_26625__$1;
(statearr_26627_26691[(2)] = inst_26621);

(statearr_26627_26691[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26626 === (20))){
var state_26625__$1 = state_26625;
var statearr_26628_26692 = state_26625__$1;
(statearr_26628_26692[(2)] = null);

(statearr_26628_26692[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26626 === (1))){
var state_26625__$1 = state_26625;
var statearr_26629_26693 = state_26625__$1;
(statearr_26629_26693[(2)] = null);

(statearr_26629_26693[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26626 === (4))){
var inst_26590 = (state_26625[(7)]);
var inst_26590__$1 = (state_26625[(2)]);
var inst_26591 = (inst_26590__$1 == null);
var state_26625__$1 = (function (){var statearr_26630 = state_26625;
(statearr_26630[(7)] = inst_26590__$1);

return statearr_26630;
})();
if(cljs.core.truth_(inst_26591)){
var statearr_26631_26694 = state_26625__$1;
(statearr_26631_26694[(1)] = (5));

} else {
var statearr_26632_26695 = state_26625__$1;
(statearr_26632_26695[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26626 === (15))){
var inst_26603 = (state_26625[(8)]);
var state_26625__$1 = state_26625;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26625__$1,(18),to,inst_26603);
} else {
if((state_val_26626 === (21))){
var inst_26616 = (state_26625[(2)]);
var state_26625__$1 = state_26625;
var statearr_26633_26696 = state_26625__$1;
(statearr_26633_26696[(2)] = inst_26616);

(statearr_26633_26696[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26626 === (13))){
var inst_26618 = (state_26625[(2)]);
var state_26625__$1 = (function (){var statearr_26634 = state_26625;
(statearr_26634[(9)] = inst_26618);

return statearr_26634;
})();
var statearr_26635_26697 = state_26625__$1;
(statearr_26635_26697[(2)] = null);

(statearr_26635_26697[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26626 === (6))){
var inst_26590 = (state_26625[(7)]);
var state_26625__$1 = state_26625;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26625__$1,(11),inst_26590);
} else {
if((state_val_26626 === (17))){
var inst_26611 = (state_26625[(2)]);
var state_26625__$1 = state_26625;
if(cljs.core.truth_(inst_26611)){
var statearr_26636_26698 = state_26625__$1;
(statearr_26636_26698[(1)] = (19));

} else {
var statearr_26637_26699 = state_26625__$1;
(statearr_26637_26699[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26626 === (3))){
var inst_26623 = (state_26625[(2)]);
var state_26625__$1 = state_26625;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26625__$1,inst_26623);
} else {
if((state_val_26626 === (12))){
var inst_26600 = (state_26625[(10)]);
var state_26625__$1 = state_26625;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26625__$1,(14),inst_26600);
} else {
if((state_val_26626 === (2))){
var state_26625__$1 = state_26625;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26625__$1,(4),results);
} else {
if((state_val_26626 === (19))){
var state_26625__$1 = state_26625;
var statearr_26638_26700 = state_26625__$1;
(statearr_26638_26700[(2)] = null);

(statearr_26638_26700[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26626 === (11))){
var inst_26600 = (state_26625[(2)]);
var state_26625__$1 = (function (){var statearr_26639 = state_26625;
(statearr_26639[(10)] = inst_26600);

return statearr_26639;
})();
var statearr_26640_26701 = state_26625__$1;
(statearr_26640_26701[(2)] = null);

(statearr_26640_26701[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26626 === (9))){
var state_26625__$1 = state_26625;
var statearr_26641_26702 = state_26625__$1;
(statearr_26641_26702[(2)] = null);

(statearr_26641_26702[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26626 === (5))){
var state_26625__$1 = state_26625;
if(cljs.core.truth_(close_QMARK_)){
var statearr_26642_26703 = state_26625__$1;
(statearr_26642_26703[(1)] = (8));

} else {
var statearr_26643_26704 = state_26625__$1;
(statearr_26643_26704[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26626 === (14))){
var inst_26603 = (state_26625[(8)]);
var inst_26603__$1 = (state_26625[(2)]);
var inst_26604 = (inst_26603__$1 == null);
var inst_26605 = cljs.core.not.call(null,inst_26604);
var state_26625__$1 = (function (){var statearr_26644 = state_26625;
(statearr_26644[(8)] = inst_26603__$1);

return statearr_26644;
})();
if(inst_26605){
var statearr_26645_26705 = state_26625__$1;
(statearr_26645_26705[(1)] = (15));

} else {
var statearr_26646_26706 = state_26625__$1;
(statearr_26646_26706[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26626 === (16))){
var state_26625__$1 = state_26625;
var statearr_26647_26707 = state_26625__$1;
(statearr_26647_26707[(2)] = false);

(statearr_26647_26707[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26626 === (10))){
var inst_26597 = (state_26625[(2)]);
var state_26625__$1 = state_26625;
var statearr_26648_26708 = state_26625__$1;
(statearr_26648_26708[(2)] = inst_26597);

(statearr_26648_26708[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26626 === (18))){
var inst_26608 = (state_26625[(2)]);
var state_26625__$1 = state_26625;
var statearr_26649_26709 = state_26625__$1;
(statearr_26649_26709[(2)] = inst_26608);

(statearr_26649_26709[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26626 === (8))){
var inst_26594 = cljs.core.async.close_BANG_.call(null,to);
var state_26625__$1 = state_26625;
var statearr_26650_26710 = state_26625__$1;
(statearr_26650_26710[(2)] = inst_26594);

(statearr_26650_26710[(1)] = (10));


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
var cljs$core$async$pipeline_STAR__$_state_machine__26225__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__26225__auto____0 = (function (){
var statearr_26651 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_26651[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__26225__auto__);

(statearr_26651[(1)] = (1));

return statearr_26651;
});
var cljs$core$async$pipeline_STAR__$_state_machine__26225__auto____1 = (function (state_26625){
while(true){
var ret_value__26226__auto__ = (function (){try{while(true){
var result__26227__auto__ = switch__26224__auto__.call(null,state_26625);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26227__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26227__auto__;
}
break;
}
}catch (e26652){if((e26652 instanceof Object)){
var ex__26228__auto__ = e26652;
var statearr_26653_26711 = state_26625;
(statearr_26653_26711[(5)] = ex__26228__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26625);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26652;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26226__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26712 = state_26625;
state_26625 = G__26712;
continue;
} else {
return ret_value__26226__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__26225__auto__ = function(state_26625){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__26225__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__26225__auto____1.call(this,state_26625);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__26225__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__26225__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__26225__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__26225__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__26225__auto__;
})()
})();
var state__26321__auto__ = (function (){var statearr_26654 = f__26320__auto__.call(null);
(statearr_26654[(6)] = c__26319__auto__);

return statearr_26654;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26321__auto__);
}));

return c__26319__auto__;
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
var G__26714 = arguments.length;
switch (G__26714) {
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
return cljs.core.async.pipeline_async.call(null,n,to,af,from,true);
}));

(cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5 = (function (n,to,af,from,close_QMARK_){
return cljs.core.async.pipeline_STAR_.call(null,n,to,af,from,close_QMARK_,null,new cljs.core.Keyword(null,"async","async",1050769601));
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
var G__26717 = arguments.length;
switch (G__26717) {
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
return cljs.core.async.pipeline.call(null,n,to,xf,from,true);
}));

(cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5 = (function (n,to,xf,from,close_QMARK_){
return cljs.core.async.pipeline.call(null,n,to,xf,from,close_QMARK_,null);
}));

(cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6 = (function (n,to,xf,from,close_QMARK_,ex_handler){
return cljs.core.async.pipeline_STAR_.call(null,n,to,xf,from,close_QMARK_,ex_handler,new cljs.core.Keyword(null,"compute","compute",1555393130));
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
var G__26720 = arguments.length;
switch (G__26720) {
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
return cljs.core.async.split.call(null,p,ch,null,null);
}));

(cljs.core.async.split.cljs$core$IFn$_invoke$arity$4 = (function (p,ch,t_buf_or_n,f_buf_or_n){
var tc = cljs.core.async.chan.call(null,t_buf_or_n);
var fc = cljs.core.async.chan.call(null,f_buf_or_n);
var c__26319__auto___26769 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26320__auto__ = (function (){var switch__26224__auto__ = (function (state_26746){
var state_val_26747 = (state_26746[(1)]);
if((state_val_26747 === (7))){
var inst_26742 = (state_26746[(2)]);
var state_26746__$1 = state_26746;
var statearr_26748_26770 = state_26746__$1;
(statearr_26748_26770[(2)] = inst_26742);

(statearr_26748_26770[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26747 === (1))){
var state_26746__$1 = state_26746;
var statearr_26749_26771 = state_26746__$1;
(statearr_26749_26771[(2)] = null);

(statearr_26749_26771[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26747 === (4))){
var inst_26723 = (state_26746[(7)]);
var inst_26723__$1 = (state_26746[(2)]);
var inst_26724 = (inst_26723__$1 == null);
var state_26746__$1 = (function (){var statearr_26750 = state_26746;
(statearr_26750[(7)] = inst_26723__$1);

return statearr_26750;
})();
if(cljs.core.truth_(inst_26724)){
var statearr_26751_26772 = state_26746__$1;
(statearr_26751_26772[(1)] = (5));

} else {
var statearr_26752_26773 = state_26746__$1;
(statearr_26752_26773[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26747 === (13))){
var state_26746__$1 = state_26746;
var statearr_26753_26774 = state_26746__$1;
(statearr_26753_26774[(2)] = null);

(statearr_26753_26774[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26747 === (6))){
var inst_26723 = (state_26746[(7)]);
var inst_26729 = p.call(null,inst_26723);
var state_26746__$1 = state_26746;
if(cljs.core.truth_(inst_26729)){
var statearr_26754_26775 = state_26746__$1;
(statearr_26754_26775[(1)] = (9));

} else {
var statearr_26755_26776 = state_26746__$1;
(statearr_26755_26776[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26747 === (3))){
var inst_26744 = (state_26746[(2)]);
var state_26746__$1 = state_26746;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26746__$1,inst_26744);
} else {
if((state_val_26747 === (12))){
var state_26746__$1 = state_26746;
var statearr_26756_26777 = state_26746__$1;
(statearr_26756_26777[(2)] = null);

(statearr_26756_26777[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26747 === (2))){
var state_26746__$1 = state_26746;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26746__$1,(4),ch);
} else {
if((state_val_26747 === (11))){
var inst_26723 = (state_26746[(7)]);
var inst_26733 = (state_26746[(2)]);
var state_26746__$1 = state_26746;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26746__$1,(8),inst_26733,inst_26723);
} else {
if((state_val_26747 === (9))){
var state_26746__$1 = state_26746;
var statearr_26757_26778 = state_26746__$1;
(statearr_26757_26778[(2)] = tc);

(statearr_26757_26778[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26747 === (5))){
var inst_26726 = cljs.core.async.close_BANG_.call(null,tc);
var inst_26727 = cljs.core.async.close_BANG_.call(null,fc);
var state_26746__$1 = (function (){var statearr_26758 = state_26746;
(statearr_26758[(8)] = inst_26726);

return statearr_26758;
})();
var statearr_26759_26779 = state_26746__$1;
(statearr_26759_26779[(2)] = inst_26727);

(statearr_26759_26779[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26747 === (14))){
var inst_26740 = (state_26746[(2)]);
var state_26746__$1 = state_26746;
var statearr_26760_26780 = state_26746__$1;
(statearr_26760_26780[(2)] = inst_26740);

(statearr_26760_26780[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26747 === (10))){
var state_26746__$1 = state_26746;
var statearr_26761_26781 = state_26746__$1;
(statearr_26761_26781[(2)] = fc);

(statearr_26761_26781[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26747 === (8))){
var inst_26735 = (state_26746[(2)]);
var state_26746__$1 = state_26746;
if(cljs.core.truth_(inst_26735)){
var statearr_26762_26782 = state_26746__$1;
(statearr_26762_26782[(1)] = (12));

} else {
var statearr_26763_26783 = state_26746__$1;
(statearr_26763_26783[(1)] = (13));

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
var cljs$core$async$state_machine__26225__auto__ = null;
var cljs$core$async$state_machine__26225__auto____0 = (function (){
var statearr_26764 = [null,null,null,null,null,null,null,null,null];
(statearr_26764[(0)] = cljs$core$async$state_machine__26225__auto__);

(statearr_26764[(1)] = (1));

return statearr_26764;
});
var cljs$core$async$state_machine__26225__auto____1 = (function (state_26746){
while(true){
var ret_value__26226__auto__ = (function (){try{while(true){
var result__26227__auto__ = switch__26224__auto__.call(null,state_26746);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26227__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26227__auto__;
}
break;
}
}catch (e26765){if((e26765 instanceof Object)){
var ex__26228__auto__ = e26765;
var statearr_26766_26784 = state_26746;
(statearr_26766_26784[(5)] = ex__26228__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26746);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26765;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26226__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26785 = state_26746;
state_26746 = G__26785;
continue;
} else {
return ret_value__26226__auto__;
}
break;
}
});
cljs$core$async$state_machine__26225__auto__ = function(state_26746){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__26225__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__26225__auto____1.call(this,state_26746);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__26225__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__26225__auto____0;
cljs$core$async$state_machine__26225__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__26225__auto____1;
return cljs$core$async$state_machine__26225__auto__;
})()
})();
var state__26321__auto__ = (function (){var statearr_26767 = f__26320__auto__.call(null);
(statearr_26767[(6)] = c__26319__auto___26769);

return statearr_26767;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26321__auto__);
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
var c__26319__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26320__auto__ = (function (){var switch__26224__auto__ = (function (state_26806){
var state_val_26807 = (state_26806[(1)]);
if((state_val_26807 === (7))){
var inst_26802 = (state_26806[(2)]);
var state_26806__$1 = state_26806;
var statearr_26808_26826 = state_26806__$1;
(statearr_26808_26826[(2)] = inst_26802);

(statearr_26808_26826[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26807 === (1))){
var inst_26786 = init;
var state_26806__$1 = (function (){var statearr_26809 = state_26806;
(statearr_26809[(7)] = inst_26786);

return statearr_26809;
})();
var statearr_26810_26827 = state_26806__$1;
(statearr_26810_26827[(2)] = null);

(statearr_26810_26827[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26807 === (4))){
var inst_26789 = (state_26806[(8)]);
var inst_26789__$1 = (state_26806[(2)]);
var inst_26790 = (inst_26789__$1 == null);
var state_26806__$1 = (function (){var statearr_26811 = state_26806;
(statearr_26811[(8)] = inst_26789__$1);

return statearr_26811;
})();
if(cljs.core.truth_(inst_26790)){
var statearr_26812_26828 = state_26806__$1;
(statearr_26812_26828[(1)] = (5));

} else {
var statearr_26813_26829 = state_26806__$1;
(statearr_26813_26829[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26807 === (6))){
var inst_26789 = (state_26806[(8)]);
var inst_26786 = (state_26806[(7)]);
var inst_26793 = (state_26806[(9)]);
var inst_26793__$1 = f.call(null,inst_26786,inst_26789);
var inst_26794 = cljs.core.reduced_QMARK_.call(null,inst_26793__$1);
var state_26806__$1 = (function (){var statearr_26814 = state_26806;
(statearr_26814[(9)] = inst_26793__$1);

return statearr_26814;
})();
if(inst_26794){
var statearr_26815_26830 = state_26806__$1;
(statearr_26815_26830[(1)] = (8));

} else {
var statearr_26816_26831 = state_26806__$1;
(statearr_26816_26831[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26807 === (3))){
var inst_26804 = (state_26806[(2)]);
var state_26806__$1 = state_26806;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26806__$1,inst_26804);
} else {
if((state_val_26807 === (2))){
var state_26806__$1 = state_26806;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26806__$1,(4),ch);
} else {
if((state_val_26807 === (9))){
var inst_26793 = (state_26806[(9)]);
var inst_26786 = inst_26793;
var state_26806__$1 = (function (){var statearr_26817 = state_26806;
(statearr_26817[(7)] = inst_26786);

return statearr_26817;
})();
var statearr_26818_26832 = state_26806__$1;
(statearr_26818_26832[(2)] = null);

(statearr_26818_26832[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26807 === (5))){
var inst_26786 = (state_26806[(7)]);
var state_26806__$1 = state_26806;
var statearr_26819_26833 = state_26806__$1;
(statearr_26819_26833[(2)] = inst_26786);

(statearr_26819_26833[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26807 === (10))){
var inst_26800 = (state_26806[(2)]);
var state_26806__$1 = state_26806;
var statearr_26820_26834 = state_26806__$1;
(statearr_26820_26834[(2)] = inst_26800);

(statearr_26820_26834[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26807 === (8))){
var inst_26793 = (state_26806[(9)]);
var inst_26796 = cljs.core.deref.call(null,inst_26793);
var state_26806__$1 = state_26806;
var statearr_26821_26835 = state_26806__$1;
(statearr_26821_26835[(2)] = inst_26796);

(statearr_26821_26835[(1)] = (10));


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
var cljs$core$async$reduce_$_state_machine__26225__auto__ = null;
var cljs$core$async$reduce_$_state_machine__26225__auto____0 = (function (){
var statearr_26822 = [null,null,null,null,null,null,null,null,null,null];
(statearr_26822[(0)] = cljs$core$async$reduce_$_state_machine__26225__auto__);

(statearr_26822[(1)] = (1));

return statearr_26822;
});
var cljs$core$async$reduce_$_state_machine__26225__auto____1 = (function (state_26806){
while(true){
var ret_value__26226__auto__ = (function (){try{while(true){
var result__26227__auto__ = switch__26224__auto__.call(null,state_26806);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26227__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26227__auto__;
}
break;
}
}catch (e26823){if((e26823 instanceof Object)){
var ex__26228__auto__ = e26823;
var statearr_26824_26836 = state_26806;
(statearr_26824_26836[(5)] = ex__26228__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26806);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26823;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26226__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26837 = state_26806;
state_26806 = G__26837;
continue;
} else {
return ret_value__26226__auto__;
}
break;
}
});
cljs$core$async$reduce_$_state_machine__26225__auto__ = function(state_26806){
switch(arguments.length){
case 0:
return cljs$core$async$reduce_$_state_machine__26225__auto____0.call(this);
case 1:
return cljs$core$async$reduce_$_state_machine__26225__auto____1.call(this,state_26806);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$reduce_$_state_machine__26225__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$reduce_$_state_machine__26225__auto____0;
cljs$core$async$reduce_$_state_machine__26225__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$reduce_$_state_machine__26225__auto____1;
return cljs$core$async$reduce_$_state_machine__26225__auto__;
})()
})();
var state__26321__auto__ = (function (){var statearr_26825 = f__26320__auto__.call(null);
(statearr_26825[(6)] = c__26319__auto__);

return statearr_26825;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26321__auto__);
}));

return c__26319__auto__;
});
/**
 * async/reduces a channel with a transformation (xform f).
 *   Returns a channel containing the result.  ch must close before
 *   transduce produces a result.
 */
cljs.core.async.transduce = (function cljs$core$async$transduce(xform,f,init,ch){
var f__$1 = xform.call(null,f);
var c__26319__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26320__auto__ = (function (){var switch__26224__auto__ = (function (state_26843){
var state_val_26844 = (state_26843[(1)]);
if((state_val_26844 === (1))){
var inst_26838 = cljs.core.async.reduce.call(null,f__$1,init,ch);
var state_26843__$1 = state_26843;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26843__$1,(2),inst_26838);
} else {
if((state_val_26844 === (2))){
var inst_26840 = (state_26843[(2)]);
var inst_26841 = f__$1.call(null,inst_26840);
var state_26843__$1 = state_26843;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26843__$1,inst_26841);
} else {
return null;
}
}
});
return (function() {
var cljs$core$async$transduce_$_state_machine__26225__auto__ = null;
var cljs$core$async$transduce_$_state_machine__26225__auto____0 = (function (){
var statearr_26845 = [null,null,null,null,null,null,null];
(statearr_26845[(0)] = cljs$core$async$transduce_$_state_machine__26225__auto__);

(statearr_26845[(1)] = (1));

return statearr_26845;
});
var cljs$core$async$transduce_$_state_machine__26225__auto____1 = (function (state_26843){
while(true){
var ret_value__26226__auto__ = (function (){try{while(true){
var result__26227__auto__ = switch__26224__auto__.call(null,state_26843);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26227__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26227__auto__;
}
break;
}
}catch (e26846){if((e26846 instanceof Object)){
var ex__26228__auto__ = e26846;
var statearr_26847_26849 = state_26843;
(statearr_26847_26849[(5)] = ex__26228__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26843);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26846;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26226__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26850 = state_26843;
state_26843 = G__26850;
continue;
} else {
return ret_value__26226__auto__;
}
break;
}
});
cljs$core$async$transduce_$_state_machine__26225__auto__ = function(state_26843){
switch(arguments.length){
case 0:
return cljs$core$async$transduce_$_state_machine__26225__auto____0.call(this);
case 1:
return cljs$core$async$transduce_$_state_machine__26225__auto____1.call(this,state_26843);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$transduce_$_state_machine__26225__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$transduce_$_state_machine__26225__auto____0;
cljs$core$async$transduce_$_state_machine__26225__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$transduce_$_state_machine__26225__auto____1;
return cljs$core$async$transduce_$_state_machine__26225__auto__;
})()
})();
var state__26321__auto__ = (function (){var statearr_26848 = f__26320__auto__.call(null);
(statearr_26848[(6)] = c__26319__auto__);

return statearr_26848;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26321__auto__);
}));

return c__26319__auto__;
});
/**
 * Puts the contents of coll into the supplied channel.
 * 
 *   By default the channel will be closed after the items are copied,
 *   but can be determined by the close? parameter.
 * 
 *   Returns a channel which will close after the items are copied.
 */
cljs.core.async.onto_chan = (function cljs$core$async$onto_chan(var_args){
var G__26852 = arguments.length;
switch (G__26852) {
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
return cljs.core.async.onto_chan.call(null,ch,coll,true);
}));

(cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
var c__26319__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26320__auto__ = (function (){var switch__26224__auto__ = (function (state_26877){
var state_val_26878 = (state_26877[(1)]);
if((state_val_26878 === (7))){
var inst_26859 = (state_26877[(2)]);
var state_26877__$1 = state_26877;
var statearr_26879_26900 = state_26877__$1;
(statearr_26879_26900[(2)] = inst_26859);

(statearr_26879_26900[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26878 === (1))){
var inst_26853 = cljs.core.seq.call(null,coll);
var inst_26854 = inst_26853;
var state_26877__$1 = (function (){var statearr_26880 = state_26877;
(statearr_26880[(7)] = inst_26854);

return statearr_26880;
})();
var statearr_26881_26901 = state_26877__$1;
(statearr_26881_26901[(2)] = null);

(statearr_26881_26901[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26878 === (4))){
var inst_26854 = (state_26877[(7)]);
var inst_26857 = cljs.core.first.call(null,inst_26854);
var state_26877__$1 = state_26877;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26877__$1,(7),ch,inst_26857);
} else {
if((state_val_26878 === (13))){
var inst_26871 = (state_26877[(2)]);
var state_26877__$1 = state_26877;
var statearr_26882_26902 = state_26877__$1;
(statearr_26882_26902[(2)] = inst_26871);

(statearr_26882_26902[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26878 === (6))){
var inst_26862 = (state_26877[(2)]);
var state_26877__$1 = state_26877;
if(cljs.core.truth_(inst_26862)){
var statearr_26883_26903 = state_26877__$1;
(statearr_26883_26903[(1)] = (8));

} else {
var statearr_26884_26904 = state_26877__$1;
(statearr_26884_26904[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26878 === (3))){
var inst_26875 = (state_26877[(2)]);
var state_26877__$1 = state_26877;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26877__$1,inst_26875);
} else {
if((state_val_26878 === (12))){
var state_26877__$1 = state_26877;
var statearr_26885_26905 = state_26877__$1;
(statearr_26885_26905[(2)] = null);

(statearr_26885_26905[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26878 === (2))){
var inst_26854 = (state_26877[(7)]);
var state_26877__$1 = state_26877;
if(cljs.core.truth_(inst_26854)){
var statearr_26886_26906 = state_26877__$1;
(statearr_26886_26906[(1)] = (4));

} else {
var statearr_26887_26907 = state_26877__$1;
(statearr_26887_26907[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26878 === (11))){
var inst_26868 = cljs.core.async.close_BANG_.call(null,ch);
var state_26877__$1 = state_26877;
var statearr_26888_26908 = state_26877__$1;
(statearr_26888_26908[(2)] = inst_26868);

(statearr_26888_26908[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26878 === (9))){
var state_26877__$1 = state_26877;
if(cljs.core.truth_(close_QMARK_)){
var statearr_26889_26909 = state_26877__$1;
(statearr_26889_26909[(1)] = (11));

} else {
var statearr_26890_26910 = state_26877__$1;
(statearr_26890_26910[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26878 === (5))){
var inst_26854 = (state_26877[(7)]);
var state_26877__$1 = state_26877;
var statearr_26891_26911 = state_26877__$1;
(statearr_26891_26911[(2)] = inst_26854);

(statearr_26891_26911[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26878 === (10))){
var inst_26873 = (state_26877[(2)]);
var state_26877__$1 = state_26877;
var statearr_26892_26912 = state_26877__$1;
(statearr_26892_26912[(2)] = inst_26873);

(statearr_26892_26912[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26878 === (8))){
var inst_26854 = (state_26877[(7)]);
var inst_26864 = cljs.core.next.call(null,inst_26854);
var inst_26854__$1 = inst_26864;
var state_26877__$1 = (function (){var statearr_26893 = state_26877;
(statearr_26893[(7)] = inst_26854__$1);

return statearr_26893;
})();
var statearr_26894_26913 = state_26877__$1;
(statearr_26894_26913[(2)] = null);

(statearr_26894_26913[(1)] = (2));


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
var cljs$core$async$state_machine__26225__auto__ = null;
var cljs$core$async$state_machine__26225__auto____0 = (function (){
var statearr_26895 = [null,null,null,null,null,null,null,null];
(statearr_26895[(0)] = cljs$core$async$state_machine__26225__auto__);

(statearr_26895[(1)] = (1));

return statearr_26895;
});
var cljs$core$async$state_machine__26225__auto____1 = (function (state_26877){
while(true){
var ret_value__26226__auto__ = (function (){try{while(true){
var result__26227__auto__ = switch__26224__auto__.call(null,state_26877);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26227__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26227__auto__;
}
break;
}
}catch (e26896){if((e26896 instanceof Object)){
var ex__26228__auto__ = e26896;
var statearr_26897_26914 = state_26877;
(statearr_26897_26914[(5)] = ex__26228__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26877);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26896;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26226__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26915 = state_26877;
state_26877 = G__26915;
continue;
} else {
return ret_value__26226__auto__;
}
break;
}
});
cljs$core$async$state_machine__26225__auto__ = function(state_26877){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__26225__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__26225__auto____1.call(this,state_26877);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__26225__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__26225__auto____0;
cljs$core$async$state_machine__26225__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__26225__auto____1;
return cljs$core$async$state_machine__26225__auto__;
})()
})();
var state__26321__auto__ = (function (){var statearr_26898 = f__26320__auto__.call(null);
(statearr_26898[(6)] = c__26319__auto__);

return statearr_26898;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26321__auto__);
}));

return c__26319__auto__;
}));

(cljs.core.async.onto_chan.cljs$lang$maxFixedArity = 3);

/**
 * Creates and returns a channel which contains the contents of coll,
 *   closing when exhausted.
 */
cljs.core.async.to_chan = (function cljs$core$async$to_chan(coll){
var ch = cljs.core.async.chan.call(null,cljs.core.bounded_count.call(null,(100),coll));
cljs.core.async.onto_chan.call(null,ch,coll);

return ch;
});

/**
 * @interface
 */
cljs.core.async.Mux = function(){};

cljs.core.async.muxch_STAR_ = (function cljs$core$async$muxch_STAR_(_){
if((((!((_ == null)))) && ((!((_.cljs$core$async$Mux$muxch_STAR_$arity$1 == null)))))){
return _.cljs$core$async$Mux$muxch_STAR_$arity$1(_);
} else {
var x__4487__auto__ = (((_ == null))?null:_);
var m__4488__auto__ = (cljs.core.async.muxch_STAR_[goog.typeOf(x__4487__auto__)]);
if((!((m__4488__auto__ == null)))){
return m__4488__auto__.call(null,_);
} else {
var m__4485__auto__ = (cljs.core.async.muxch_STAR_["_"]);
if((!((m__4485__auto__ == null)))){
return m__4485__auto__.call(null,_);
} else {
throw cljs.core.missing_protocol.call(null,"Mux.muxch*",_);
}
}
}
});


/**
 * @interface
 */
cljs.core.async.Mult = function(){};

cljs.core.async.tap_STAR_ = (function cljs$core$async$tap_STAR_(m,ch,close_QMARK_){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$tap_STAR_$arity$3 == null)))))){
return m.cljs$core$async$Mult$tap_STAR_$arity$3(m,ch,close_QMARK_);
} else {
var x__4487__auto__ = (((m == null))?null:m);
var m__4488__auto__ = (cljs.core.async.tap_STAR_[goog.typeOf(x__4487__auto__)]);
if((!((m__4488__auto__ == null)))){
return m__4488__auto__.call(null,m,ch,close_QMARK_);
} else {
var m__4485__auto__ = (cljs.core.async.tap_STAR_["_"]);
if((!((m__4485__auto__ == null)))){
return m__4485__auto__.call(null,m,ch,close_QMARK_);
} else {
throw cljs.core.missing_protocol.call(null,"Mult.tap*",m);
}
}
}
});

cljs.core.async.untap_STAR_ = (function cljs$core$async$untap_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$untap_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mult$untap_STAR_$arity$2(m,ch);
} else {
var x__4487__auto__ = (((m == null))?null:m);
var m__4488__auto__ = (cljs.core.async.untap_STAR_[goog.typeOf(x__4487__auto__)]);
if((!((m__4488__auto__ == null)))){
return m__4488__auto__.call(null,m,ch);
} else {
var m__4485__auto__ = (cljs.core.async.untap_STAR_["_"]);
if((!((m__4485__auto__ == null)))){
return m__4485__auto__.call(null,m,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Mult.untap*",m);
}
}
}
});

cljs.core.async.untap_all_STAR_ = (function cljs$core$async$untap_all_STAR_(m){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$untap_all_STAR_$arity$1 == null)))))){
return m.cljs$core$async$Mult$untap_all_STAR_$arity$1(m);
} else {
var x__4487__auto__ = (((m == null))?null:m);
var m__4488__auto__ = (cljs.core.async.untap_all_STAR_[goog.typeOf(x__4487__auto__)]);
if((!((m__4488__auto__ == null)))){
return m__4488__auto__.call(null,m);
} else {
var m__4485__auto__ = (cljs.core.async.untap_all_STAR_["_"]);
if((!((m__4485__auto__ == null)))){
return m__4485__auto__.call(null,m);
} else {
throw cljs.core.missing_protocol.call(null,"Mult.untap-all*",m);
}
}
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
var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var m = (function (){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async26916 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Mult}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async26916 = (function (ch,cs,meta26917){
this.ch = ch;
this.cs = cs;
this.meta26917 = meta26917;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async26916.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_26918,meta26917__$1){
var self__ = this;
var _26918__$1 = this;
return (new cljs.core.async.t_cljs$core$async26916(self__.ch,self__.cs,meta26917__$1));
}));

(cljs.core.async.t_cljs$core$async26916.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_26918){
var self__ = this;
var _26918__$1 = this;
return self__.meta26917;
}));

(cljs.core.async.t_cljs$core$async26916.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async26916.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
}));

(cljs.core.async.t_cljs$core$async26916.prototype.cljs$core$async$Mult$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async26916.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = (function (_,ch__$1,close_QMARK_){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch__$1,close_QMARK_);

return null;
}));

(cljs.core.async.t_cljs$core$async26916.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = (function (_,ch__$1){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch__$1);

return null;
}));

(cljs.core.async.t_cljs$core$async26916.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return null;
}));

(cljs.core.async.t_cljs$core$async26916.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"meta26917","meta26917",1151404214,null)], null);
}));

(cljs.core.async.t_cljs$core$async26916.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async26916.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async26916");

(cljs.core.async.t_cljs$core$async26916.cljs$lang$ctorPrWriter = (function (this__4428__auto__,writer__4429__auto__,opt__4430__auto__){
return cljs.core._write.call(null,writer__4429__auto__,"cljs.core.async/t_cljs$core$async26916");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async26916.
 */
cljs.core.async.__GT_t_cljs$core$async26916 = (function cljs$core$async$mult_$___GT_t_cljs$core$async26916(ch__$1,cs__$1,meta26917){
return (new cljs.core.async.t_cljs$core$async26916(ch__$1,cs__$1,meta26917));
});

}

return (new cljs.core.async.t_cljs$core$async26916(ch,cs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var dchan = cljs.core.async.chan.call(null,(1));
var dctr = cljs.core.atom.call(null,null);
var done = (function (_){
if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.call(null,dchan,true);
} else {
return null;
}
});
var c__26319__auto___27138 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26320__auto__ = (function (){var switch__26224__auto__ = (function (state_27053){
var state_val_27054 = (state_27053[(1)]);
if((state_val_27054 === (7))){
var inst_27049 = (state_27053[(2)]);
var state_27053__$1 = state_27053;
var statearr_27055_27139 = state_27053__$1;
(statearr_27055_27139[(2)] = inst_27049);

(statearr_27055_27139[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27054 === (20))){
var inst_26952 = (state_27053[(7)]);
var inst_26964 = cljs.core.first.call(null,inst_26952);
var inst_26965 = cljs.core.nth.call(null,inst_26964,(0),null);
var inst_26966 = cljs.core.nth.call(null,inst_26964,(1),null);
var state_27053__$1 = (function (){var statearr_27056 = state_27053;
(statearr_27056[(8)] = inst_26965);

return statearr_27056;
})();
if(cljs.core.truth_(inst_26966)){
var statearr_27057_27140 = state_27053__$1;
(statearr_27057_27140[(1)] = (22));

} else {
var statearr_27058_27141 = state_27053__$1;
(statearr_27058_27141[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27054 === (27))){
var inst_26996 = (state_27053[(9)]);
var inst_27001 = (state_27053[(10)]);
var inst_26921 = (state_27053[(11)]);
var inst_26994 = (state_27053[(12)]);
var inst_27001__$1 = cljs.core._nth.call(null,inst_26994,inst_26996);
var inst_27002 = cljs.core.async.put_BANG_.call(null,inst_27001__$1,inst_26921,done);
var state_27053__$1 = (function (){var statearr_27059 = state_27053;
(statearr_27059[(10)] = inst_27001__$1);

return statearr_27059;
})();
if(cljs.core.truth_(inst_27002)){
var statearr_27060_27142 = state_27053__$1;
(statearr_27060_27142[(1)] = (30));

} else {
var statearr_27061_27143 = state_27053__$1;
(statearr_27061_27143[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27054 === (1))){
var state_27053__$1 = state_27053;
var statearr_27062_27144 = state_27053__$1;
(statearr_27062_27144[(2)] = null);

(statearr_27062_27144[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27054 === (24))){
var inst_26952 = (state_27053[(7)]);
var inst_26971 = (state_27053[(2)]);
var inst_26972 = cljs.core.next.call(null,inst_26952);
var inst_26930 = inst_26972;
var inst_26931 = null;
var inst_26932 = (0);
var inst_26933 = (0);
var state_27053__$1 = (function (){var statearr_27063 = state_27053;
(statearr_27063[(13)] = inst_26931);

(statearr_27063[(14)] = inst_26933);

(statearr_27063[(15)] = inst_26930);

(statearr_27063[(16)] = inst_26971);

(statearr_27063[(17)] = inst_26932);

return statearr_27063;
})();
var statearr_27064_27145 = state_27053__$1;
(statearr_27064_27145[(2)] = null);

(statearr_27064_27145[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27054 === (39))){
var state_27053__$1 = state_27053;
var statearr_27068_27146 = state_27053__$1;
(statearr_27068_27146[(2)] = null);

(statearr_27068_27146[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27054 === (4))){
var inst_26921 = (state_27053[(11)]);
var inst_26921__$1 = (state_27053[(2)]);
var inst_26922 = (inst_26921__$1 == null);
var state_27053__$1 = (function (){var statearr_27069 = state_27053;
(statearr_27069[(11)] = inst_26921__$1);

return statearr_27069;
})();
if(cljs.core.truth_(inst_26922)){
var statearr_27070_27147 = state_27053__$1;
(statearr_27070_27147[(1)] = (5));

} else {
var statearr_27071_27148 = state_27053__$1;
(statearr_27071_27148[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27054 === (15))){
var inst_26931 = (state_27053[(13)]);
var inst_26933 = (state_27053[(14)]);
var inst_26930 = (state_27053[(15)]);
var inst_26932 = (state_27053[(17)]);
var inst_26948 = (state_27053[(2)]);
var inst_26949 = (inst_26933 + (1));
var tmp27065 = inst_26931;
var tmp27066 = inst_26930;
var tmp27067 = inst_26932;
var inst_26930__$1 = tmp27066;
var inst_26931__$1 = tmp27065;
var inst_26932__$1 = tmp27067;
var inst_26933__$1 = inst_26949;
var state_27053__$1 = (function (){var statearr_27072 = state_27053;
(statearr_27072[(13)] = inst_26931__$1);

(statearr_27072[(14)] = inst_26933__$1);

(statearr_27072[(15)] = inst_26930__$1);

(statearr_27072[(17)] = inst_26932__$1);

(statearr_27072[(18)] = inst_26948);

return statearr_27072;
})();
var statearr_27073_27149 = state_27053__$1;
(statearr_27073_27149[(2)] = null);

(statearr_27073_27149[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27054 === (21))){
var inst_26975 = (state_27053[(2)]);
var state_27053__$1 = state_27053;
var statearr_27077_27150 = state_27053__$1;
(statearr_27077_27150[(2)] = inst_26975);

(statearr_27077_27150[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27054 === (31))){
var inst_27001 = (state_27053[(10)]);
var inst_27005 = done.call(null,null);
var inst_27006 = cljs.core.async.untap_STAR_.call(null,m,inst_27001);
var state_27053__$1 = (function (){var statearr_27078 = state_27053;
(statearr_27078[(19)] = inst_27005);

return statearr_27078;
})();
var statearr_27079_27151 = state_27053__$1;
(statearr_27079_27151[(2)] = inst_27006);

(statearr_27079_27151[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27054 === (32))){
var inst_26996 = (state_27053[(9)]);
var inst_26993 = (state_27053[(20)]);
var inst_26995 = (state_27053[(21)]);
var inst_26994 = (state_27053[(12)]);
var inst_27008 = (state_27053[(2)]);
var inst_27009 = (inst_26996 + (1));
var tmp27074 = inst_26993;
var tmp27075 = inst_26995;
var tmp27076 = inst_26994;
var inst_26993__$1 = tmp27074;
var inst_26994__$1 = tmp27076;
var inst_26995__$1 = tmp27075;
var inst_26996__$1 = inst_27009;
var state_27053__$1 = (function (){var statearr_27080 = state_27053;
(statearr_27080[(9)] = inst_26996__$1);

(statearr_27080[(20)] = inst_26993__$1);

(statearr_27080[(22)] = inst_27008);

(statearr_27080[(21)] = inst_26995__$1);

(statearr_27080[(12)] = inst_26994__$1);

return statearr_27080;
})();
var statearr_27081_27152 = state_27053__$1;
(statearr_27081_27152[(2)] = null);

(statearr_27081_27152[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27054 === (40))){
var inst_27021 = (state_27053[(23)]);
var inst_27025 = done.call(null,null);
var inst_27026 = cljs.core.async.untap_STAR_.call(null,m,inst_27021);
var state_27053__$1 = (function (){var statearr_27082 = state_27053;
(statearr_27082[(24)] = inst_27025);

return statearr_27082;
})();
var statearr_27083_27153 = state_27053__$1;
(statearr_27083_27153[(2)] = inst_27026);

(statearr_27083_27153[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27054 === (33))){
var inst_27012 = (state_27053[(25)]);
var inst_27014 = cljs.core.chunked_seq_QMARK_.call(null,inst_27012);
var state_27053__$1 = state_27053;
if(inst_27014){
var statearr_27084_27154 = state_27053__$1;
(statearr_27084_27154[(1)] = (36));

} else {
var statearr_27085_27155 = state_27053__$1;
(statearr_27085_27155[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27054 === (13))){
var inst_26942 = (state_27053[(26)]);
var inst_26945 = cljs.core.async.close_BANG_.call(null,inst_26942);
var state_27053__$1 = state_27053;
var statearr_27086_27156 = state_27053__$1;
(statearr_27086_27156[(2)] = inst_26945);

(statearr_27086_27156[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27054 === (22))){
var inst_26965 = (state_27053[(8)]);
var inst_26968 = cljs.core.async.close_BANG_.call(null,inst_26965);
var state_27053__$1 = state_27053;
var statearr_27087_27157 = state_27053__$1;
(statearr_27087_27157[(2)] = inst_26968);

(statearr_27087_27157[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27054 === (36))){
var inst_27012 = (state_27053[(25)]);
var inst_27016 = cljs.core.chunk_first.call(null,inst_27012);
var inst_27017 = cljs.core.chunk_rest.call(null,inst_27012);
var inst_27018 = cljs.core.count.call(null,inst_27016);
var inst_26993 = inst_27017;
var inst_26994 = inst_27016;
var inst_26995 = inst_27018;
var inst_26996 = (0);
var state_27053__$1 = (function (){var statearr_27088 = state_27053;
(statearr_27088[(9)] = inst_26996);

(statearr_27088[(20)] = inst_26993);

(statearr_27088[(21)] = inst_26995);

(statearr_27088[(12)] = inst_26994);

return statearr_27088;
})();
var statearr_27089_27158 = state_27053__$1;
(statearr_27089_27158[(2)] = null);

(statearr_27089_27158[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27054 === (41))){
var inst_27012 = (state_27053[(25)]);
var inst_27028 = (state_27053[(2)]);
var inst_27029 = cljs.core.next.call(null,inst_27012);
var inst_26993 = inst_27029;
var inst_26994 = null;
var inst_26995 = (0);
var inst_26996 = (0);
var state_27053__$1 = (function (){var statearr_27090 = state_27053;
(statearr_27090[(27)] = inst_27028);

(statearr_27090[(9)] = inst_26996);

(statearr_27090[(20)] = inst_26993);

(statearr_27090[(21)] = inst_26995);

(statearr_27090[(12)] = inst_26994);

return statearr_27090;
})();
var statearr_27091_27159 = state_27053__$1;
(statearr_27091_27159[(2)] = null);

(statearr_27091_27159[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27054 === (43))){
var state_27053__$1 = state_27053;
var statearr_27092_27160 = state_27053__$1;
(statearr_27092_27160[(2)] = null);

(statearr_27092_27160[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27054 === (29))){
var inst_27037 = (state_27053[(2)]);
var state_27053__$1 = state_27053;
var statearr_27093_27161 = state_27053__$1;
(statearr_27093_27161[(2)] = inst_27037);

(statearr_27093_27161[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27054 === (44))){
var inst_27046 = (state_27053[(2)]);
var state_27053__$1 = (function (){var statearr_27094 = state_27053;
(statearr_27094[(28)] = inst_27046);

return statearr_27094;
})();
var statearr_27095_27162 = state_27053__$1;
(statearr_27095_27162[(2)] = null);

(statearr_27095_27162[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27054 === (6))){
var inst_26985 = (state_27053[(29)]);
var inst_26984 = cljs.core.deref.call(null,cs);
var inst_26985__$1 = cljs.core.keys.call(null,inst_26984);
var inst_26986 = cljs.core.count.call(null,inst_26985__$1);
var inst_26987 = cljs.core.reset_BANG_.call(null,dctr,inst_26986);
var inst_26992 = cljs.core.seq.call(null,inst_26985__$1);
var inst_26993 = inst_26992;
var inst_26994 = null;
var inst_26995 = (0);
var inst_26996 = (0);
var state_27053__$1 = (function (){var statearr_27096 = state_27053;
(statearr_27096[(9)] = inst_26996);

(statearr_27096[(30)] = inst_26987);

(statearr_27096[(20)] = inst_26993);

(statearr_27096[(21)] = inst_26995);

(statearr_27096[(12)] = inst_26994);

(statearr_27096[(29)] = inst_26985__$1);

return statearr_27096;
})();
var statearr_27097_27163 = state_27053__$1;
(statearr_27097_27163[(2)] = null);

(statearr_27097_27163[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27054 === (28))){
var inst_27012 = (state_27053[(25)]);
var inst_26993 = (state_27053[(20)]);
var inst_27012__$1 = cljs.core.seq.call(null,inst_26993);
var state_27053__$1 = (function (){var statearr_27098 = state_27053;
(statearr_27098[(25)] = inst_27012__$1);

return statearr_27098;
})();
if(inst_27012__$1){
var statearr_27099_27164 = state_27053__$1;
(statearr_27099_27164[(1)] = (33));

} else {
var statearr_27100_27165 = state_27053__$1;
(statearr_27100_27165[(1)] = (34));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27054 === (25))){
var inst_26996 = (state_27053[(9)]);
var inst_26995 = (state_27053[(21)]);
var inst_26998 = (inst_26996 < inst_26995);
var inst_26999 = inst_26998;
var state_27053__$1 = state_27053;
if(cljs.core.truth_(inst_26999)){
var statearr_27101_27166 = state_27053__$1;
(statearr_27101_27166[(1)] = (27));

} else {
var statearr_27102_27167 = state_27053__$1;
(statearr_27102_27167[(1)] = (28));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27054 === (34))){
var state_27053__$1 = state_27053;
var statearr_27103_27168 = state_27053__$1;
(statearr_27103_27168[(2)] = null);

(statearr_27103_27168[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27054 === (17))){
var state_27053__$1 = state_27053;
var statearr_27104_27169 = state_27053__$1;
(statearr_27104_27169[(2)] = null);

(statearr_27104_27169[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27054 === (3))){
var inst_27051 = (state_27053[(2)]);
var state_27053__$1 = state_27053;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_27053__$1,inst_27051);
} else {
if((state_val_27054 === (12))){
var inst_26980 = (state_27053[(2)]);
var state_27053__$1 = state_27053;
var statearr_27105_27170 = state_27053__$1;
(statearr_27105_27170[(2)] = inst_26980);

(statearr_27105_27170[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27054 === (2))){
var state_27053__$1 = state_27053;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27053__$1,(4),ch);
} else {
if((state_val_27054 === (23))){
var state_27053__$1 = state_27053;
var statearr_27106_27171 = state_27053__$1;
(statearr_27106_27171[(2)] = null);

(statearr_27106_27171[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27054 === (35))){
var inst_27035 = (state_27053[(2)]);
var state_27053__$1 = state_27053;
var statearr_27107_27172 = state_27053__$1;
(statearr_27107_27172[(2)] = inst_27035);

(statearr_27107_27172[(1)] = (29));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27054 === (19))){
var inst_26952 = (state_27053[(7)]);
var inst_26956 = cljs.core.chunk_first.call(null,inst_26952);
var inst_26957 = cljs.core.chunk_rest.call(null,inst_26952);
var inst_26958 = cljs.core.count.call(null,inst_26956);
var inst_26930 = inst_26957;
var inst_26931 = inst_26956;
var inst_26932 = inst_26958;
var inst_26933 = (0);
var state_27053__$1 = (function (){var statearr_27108 = state_27053;
(statearr_27108[(13)] = inst_26931);

(statearr_27108[(14)] = inst_26933);

(statearr_27108[(15)] = inst_26930);

(statearr_27108[(17)] = inst_26932);

return statearr_27108;
})();
var statearr_27109_27173 = state_27053__$1;
(statearr_27109_27173[(2)] = null);

(statearr_27109_27173[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27054 === (11))){
var inst_26952 = (state_27053[(7)]);
var inst_26930 = (state_27053[(15)]);
var inst_26952__$1 = cljs.core.seq.call(null,inst_26930);
var state_27053__$1 = (function (){var statearr_27110 = state_27053;
(statearr_27110[(7)] = inst_26952__$1);

return statearr_27110;
})();
if(inst_26952__$1){
var statearr_27111_27174 = state_27053__$1;
(statearr_27111_27174[(1)] = (16));

} else {
var statearr_27112_27175 = state_27053__$1;
(statearr_27112_27175[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27054 === (9))){
var inst_26982 = (state_27053[(2)]);
var state_27053__$1 = state_27053;
var statearr_27113_27176 = state_27053__$1;
(statearr_27113_27176[(2)] = inst_26982);

(statearr_27113_27176[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27054 === (5))){
var inst_26928 = cljs.core.deref.call(null,cs);
var inst_26929 = cljs.core.seq.call(null,inst_26928);
var inst_26930 = inst_26929;
var inst_26931 = null;
var inst_26932 = (0);
var inst_26933 = (0);
var state_27053__$1 = (function (){var statearr_27114 = state_27053;
(statearr_27114[(13)] = inst_26931);

(statearr_27114[(14)] = inst_26933);

(statearr_27114[(15)] = inst_26930);

(statearr_27114[(17)] = inst_26932);

return statearr_27114;
})();
var statearr_27115_27177 = state_27053__$1;
(statearr_27115_27177[(2)] = null);

(statearr_27115_27177[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27054 === (14))){
var state_27053__$1 = state_27053;
var statearr_27116_27178 = state_27053__$1;
(statearr_27116_27178[(2)] = null);

(statearr_27116_27178[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27054 === (45))){
var inst_27043 = (state_27053[(2)]);
var state_27053__$1 = state_27053;
var statearr_27117_27179 = state_27053__$1;
(statearr_27117_27179[(2)] = inst_27043);

(statearr_27117_27179[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27054 === (26))){
var inst_26985 = (state_27053[(29)]);
var inst_27039 = (state_27053[(2)]);
var inst_27040 = cljs.core.seq.call(null,inst_26985);
var state_27053__$1 = (function (){var statearr_27118 = state_27053;
(statearr_27118[(31)] = inst_27039);

return statearr_27118;
})();
if(inst_27040){
var statearr_27119_27180 = state_27053__$1;
(statearr_27119_27180[(1)] = (42));

} else {
var statearr_27120_27181 = state_27053__$1;
(statearr_27120_27181[(1)] = (43));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27054 === (16))){
var inst_26952 = (state_27053[(7)]);
var inst_26954 = cljs.core.chunked_seq_QMARK_.call(null,inst_26952);
var state_27053__$1 = state_27053;
if(inst_26954){
var statearr_27121_27182 = state_27053__$1;
(statearr_27121_27182[(1)] = (19));

} else {
var statearr_27122_27183 = state_27053__$1;
(statearr_27122_27183[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27054 === (38))){
var inst_27032 = (state_27053[(2)]);
var state_27053__$1 = state_27053;
var statearr_27123_27184 = state_27053__$1;
(statearr_27123_27184[(2)] = inst_27032);

(statearr_27123_27184[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27054 === (30))){
var state_27053__$1 = state_27053;
var statearr_27124_27185 = state_27053__$1;
(statearr_27124_27185[(2)] = null);

(statearr_27124_27185[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27054 === (10))){
var inst_26931 = (state_27053[(13)]);
var inst_26933 = (state_27053[(14)]);
var inst_26941 = cljs.core._nth.call(null,inst_26931,inst_26933);
var inst_26942 = cljs.core.nth.call(null,inst_26941,(0),null);
var inst_26943 = cljs.core.nth.call(null,inst_26941,(1),null);
var state_27053__$1 = (function (){var statearr_27125 = state_27053;
(statearr_27125[(26)] = inst_26942);

return statearr_27125;
})();
if(cljs.core.truth_(inst_26943)){
var statearr_27126_27186 = state_27053__$1;
(statearr_27126_27186[(1)] = (13));

} else {
var statearr_27127_27187 = state_27053__$1;
(statearr_27127_27187[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27054 === (18))){
var inst_26978 = (state_27053[(2)]);
var state_27053__$1 = state_27053;
var statearr_27128_27188 = state_27053__$1;
(statearr_27128_27188[(2)] = inst_26978);

(statearr_27128_27188[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27054 === (42))){
var state_27053__$1 = state_27053;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27053__$1,(45),dchan);
} else {
if((state_val_27054 === (37))){
var inst_27012 = (state_27053[(25)]);
var inst_27021 = (state_27053[(23)]);
var inst_26921 = (state_27053[(11)]);
var inst_27021__$1 = cljs.core.first.call(null,inst_27012);
var inst_27022 = cljs.core.async.put_BANG_.call(null,inst_27021__$1,inst_26921,done);
var state_27053__$1 = (function (){var statearr_27129 = state_27053;
(statearr_27129[(23)] = inst_27021__$1);

return statearr_27129;
})();
if(cljs.core.truth_(inst_27022)){
var statearr_27130_27189 = state_27053__$1;
(statearr_27130_27189[(1)] = (39));

} else {
var statearr_27131_27190 = state_27053__$1;
(statearr_27131_27190[(1)] = (40));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27054 === (8))){
var inst_26933 = (state_27053[(14)]);
var inst_26932 = (state_27053[(17)]);
var inst_26935 = (inst_26933 < inst_26932);
var inst_26936 = inst_26935;
var state_27053__$1 = state_27053;
if(cljs.core.truth_(inst_26936)){
var statearr_27132_27191 = state_27053__$1;
(statearr_27132_27191[(1)] = (10));

} else {
var statearr_27133_27192 = state_27053__$1;
(statearr_27133_27192[(1)] = (11));

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
var cljs$core$async$mult_$_state_machine__26225__auto__ = null;
var cljs$core$async$mult_$_state_machine__26225__auto____0 = (function (){
var statearr_27134 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_27134[(0)] = cljs$core$async$mult_$_state_machine__26225__auto__);

(statearr_27134[(1)] = (1));

return statearr_27134;
});
var cljs$core$async$mult_$_state_machine__26225__auto____1 = (function (state_27053){
while(true){
var ret_value__26226__auto__ = (function (){try{while(true){
var result__26227__auto__ = switch__26224__auto__.call(null,state_27053);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26227__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26227__auto__;
}
break;
}
}catch (e27135){if((e27135 instanceof Object)){
var ex__26228__auto__ = e27135;
var statearr_27136_27193 = state_27053;
(statearr_27136_27193[(5)] = ex__26228__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27053);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e27135;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26226__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27194 = state_27053;
state_27053 = G__27194;
continue;
} else {
return ret_value__26226__auto__;
}
break;
}
});
cljs$core$async$mult_$_state_machine__26225__auto__ = function(state_27053){
switch(arguments.length){
case 0:
return cljs$core$async$mult_$_state_machine__26225__auto____0.call(this);
case 1:
return cljs$core$async$mult_$_state_machine__26225__auto____1.call(this,state_27053);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mult_$_state_machine__26225__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mult_$_state_machine__26225__auto____0;
cljs$core$async$mult_$_state_machine__26225__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mult_$_state_machine__26225__auto____1;
return cljs$core$async$mult_$_state_machine__26225__auto__;
})()
})();
var state__26321__auto__ = (function (){var statearr_27137 = f__26320__auto__.call(null);
(statearr_27137[(6)] = c__26319__auto___27138);

return statearr_27137;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26321__auto__);
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
var G__27196 = arguments.length;
switch (G__27196) {
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
return cljs.core.async.tap.call(null,mult,ch,true);
}));

(cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3 = (function (mult,ch,close_QMARK_){
cljs.core.async.tap_STAR_.call(null,mult,ch,close_QMARK_);

return ch;
}));

(cljs.core.async.tap.cljs$lang$maxFixedArity = 3);

/**
 * Disconnects a target channel from a mult
 */
cljs.core.async.untap = (function cljs$core$async$untap(mult,ch){
return cljs.core.async.untap_STAR_.call(null,mult,ch);
});
/**
 * Disconnects all target channels from a mult
 */
cljs.core.async.untap_all = (function cljs$core$async$untap_all(mult){
return cljs.core.async.untap_all_STAR_.call(null,mult);
});

/**
 * @interface
 */
cljs.core.async.Mix = function(){};

cljs.core.async.admix_STAR_ = (function cljs$core$async$admix_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$admix_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$admix_STAR_$arity$2(m,ch);
} else {
var x__4487__auto__ = (((m == null))?null:m);
var m__4488__auto__ = (cljs.core.async.admix_STAR_[goog.typeOf(x__4487__auto__)]);
if((!((m__4488__auto__ == null)))){
return m__4488__auto__.call(null,m,ch);
} else {
var m__4485__auto__ = (cljs.core.async.admix_STAR_["_"]);
if((!((m__4485__auto__ == null)))){
return m__4485__auto__.call(null,m,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.admix*",m);
}
}
}
});

cljs.core.async.unmix_STAR_ = (function cljs$core$async$unmix_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$unmix_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$unmix_STAR_$arity$2(m,ch);
} else {
var x__4487__auto__ = (((m == null))?null:m);
var m__4488__auto__ = (cljs.core.async.unmix_STAR_[goog.typeOf(x__4487__auto__)]);
if((!((m__4488__auto__ == null)))){
return m__4488__auto__.call(null,m,ch);
} else {
var m__4485__auto__ = (cljs.core.async.unmix_STAR_["_"]);
if((!((m__4485__auto__ == null)))){
return m__4485__auto__.call(null,m,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.unmix*",m);
}
}
}
});

cljs.core.async.unmix_all_STAR_ = (function cljs$core$async$unmix_all_STAR_(m){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$unmix_all_STAR_$arity$1 == null)))))){
return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1(m);
} else {
var x__4487__auto__ = (((m == null))?null:m);
var m__4488__auto__ = (cljs.core.async.unmix_all_STAR_[goog.typeOf(x__4487__auto__)]);
if((!((m__4488__auto__ == null)))){
return m__4488__auto__.call(null,m);
} else {
var m__4485__auto__ = (cljs.core.async.unmix_all_STAR_["_"]);
if((!((m__4485__auto__ == null)))){
return m__4485__auto__.call(null,m);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.unmix-all*",m);
}
}
}
});

cljs.core.async.toggle_STAR_ = (function cljs$core$async$toggle_STAR_(m,state_map){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$toggle_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$toggle_STAR_$arity$2(m,state_map);
} else {
var x__4487__auto__ = (((m == null))?null:m);
var m__4488__auto__ = (cljs.core.async.toggle_STAR_[goog.typeOf(x__4487__auto__)]);
if((!((m__4488__auto__ == null)))){
return m__4488__auto__.call(null,m,state_map);
} else {
var m__4485__auto__ = (cljs.core.async.toggle_STAR_["_"]);
if((!((m__4485__auto__ == null)))){
return m__4485__auto__.call(null,m,state_map);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.toggle*",m);
}
}
}
});

cljs.core.async.solo_mode_STAR_ = (function cljs$core$async$solo_mode_STAR_(m,mode){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$solo_mode_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2(m,mode);
} else {
var x__4487__auto__ = (((m == null))?null:m);
var m__4488__auto__ = (cljs.core.async.solo_mode_STAR_[goog.typeOf(x__4487__auto__)]);
if((!((m__4488__auto__ == null)))){
return m__4488__auto__.call(null,m,mode);
} else {
var m__4485__auto__ = (cljs.core.async.solo_mode_STAR_["_"]);
if((!((m__4485__auto__ == null)))){
return m__4485__auto__.call(null,m,mode);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.solo-mode*",m);
}
}
}
});

cljs.core.async.ioc_alts_BANG_ = (function cljs$core$async$ioc_alts_BANG_(var_args){
var args__4795__auto__ = [];
var len__4789__auto___27208 = arguments.length;
var i__4790__auto___27209 = (0);
while(true){
if((i__4790__auto___27209 < len__4789__auto___27208)){
args__4795__auto__.push((arguments[i__4790__auto___27209]));

var G__27210 = (i__4790__auto___27209 + (1));
i__4790__auto___27209 = G__27210;
continue;
} else {
}
break;
}

var argseq__4796__auto__ = ((((3) < args__4795__auto__.length))?(new cljs.core.IndexedSeq(args__4795__auto__.slice((3)),(0),null)):null);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__4796__auto__);
});

(cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (state,cont_block,ports,p__27202){
var map__27203 = p__27202;
var map__27203__$1 = (((((!((map__27203 == null))))?(((((map__27203.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__27203.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__27203):map__27203);
var opts = map__27203__$1;
var statearr_27205_27211 = state;
(statearr_27205_27211[(1)] = cont_block);


var temp__5735__auto__ = cljs.core.async.do_alts.call(null,(function (val){
var statearr_27206_27212 = state;
(statearr_27206_27212[(2)] = val);


return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state);
}),ports,opts);
if(cljs.core.truth_(temp__5735__auto__)){
var cb = temp__5735__auto__;
var statearr_27207_27213 = state;
(statearr_27207_27213[(2)] = cljs.core.deref.call(null,cb));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}));

(cljs.core.async.ioc_alts_BANG_.cljs$lang$maxFixedArity = (3));

/** @this {Function} */
(cljs.core.async.ioc_alts_BANG_.cljs$lang$applyTo = (function (seq27198){
var G__27199 = cljs.core.first.call(null,seq27198);
var seq27198__$1 = cljs.core.next.call(null,seq27198);
var G__27200 = cljs.core.first.call(null,seq27198__$1);
var seq27198__$2 = cljs.core.next.call(null,seq27198__$1);
var G__27201 = cljs.core.first.call(null,seq27198__$2);
var seq27198__$3 = cljs.core.next.call(null,seq27198__$2);
var self__4776__auto__ = this;
return self__4776__auto__.cljs$core$IFn$_invoke$arity$variadic(G__27199,G__27200,G__27201,seq27198__$3);
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
var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var solo_modes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pause","pause",-2095325672),null,new cljs.core.Keyword(null,"mute","mute",1151223646),null], null), null);
var attrs = cljs.core.conj.call(null,solo_modes,new cljs.core.Keyword(null,"solo","solo",-316350075));
var solo_mode = cljs.core.atom.call(null,new cljs.core.Keyword(null,"mute","mute",1151223646));
var change = cljs.core.async.chan.call(null);
var changed = (function (){
return cljs.core.async.put_BANG_.call(null,change,true);
});
var pick = (function (attr,chs){
return cljs.core.reduce_kv.call(null,(function (ret,c,v){
if(cljs.core.truth_(attr.call(null,v))){
return cljs.core.conj.call(null,ret,c);
} else {
return ret;
}
}),cljs.core.PersistentHashSet.EMPTY,chs);
});
var calc_state = (function (){
var chs = cljs.core.deref.call(null,cs);
var mode = cljs.core.deref.call(null,solo_mode);
var solos = pick.call(null,new cljs.core.Keyword(null,"solo","solo",-316350075),chs);
var pauses = pick.call(null,new cljs.core.Keyword(null,"pause","pause",-2095325672),chs);
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"solos","solos",1441458643),solos,new cljs.core.Keyword(null,"mutes","mutes",1068806309),pick.call(null,new cljs.core.Keyword(null,"mute","mute",1151223646),chs),new cljs.core.Keyword(null,"reads","reads",-1215067361),cljs.core.conj.call(null,((((cljs.core._EQ_.call(null,mode,new cljs.core.Keyword(null,"pause","pause",-2095325672))) && ((!(cljs.core.empty_QMARK_.call(null,solos))))))?cljs.core.vec.call(null,solos):cljs.core.vec.call(null,cljs.core.remove.call(null,pauses,cljs.core.keys.call(null,chs)))),change)], null);
});
var m = (function (){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async27214 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mix}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async27214 = (function (change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta27215){
this.change = change;
this.solo_mode = solo_mode;
this.pick = pick;
this.cs = cs;
this.calc_state = calc_state;
this.out = out;
this.changed = changed;
this.solo_modes = solo_modes;
this.attrs = attrs;
this.meta27215 = meta27215;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async27214.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_27216,meta27215__$1){
var self__ = this;
var _27216__$1 = this;
return (new cljs.core.async.t_cljs$core$async27214(self__.change,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta27215__$1));
}));

(cljs.core.async.t_cljs$core$async27214.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_27216){
var self__ = this;
var _27216__$1 = this;
return self__.meta27215;
}));

(cljs.core.async.t_cljs$core$async27214.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async27214.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.out;
}));

(cljs.core.async.t_cljs$core$async27214.prototype.cljs$core$async$Mix$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async27214.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);

return self__.changed.call(null);
}));

(cljs.core.async.t_cljs$core$async27214.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch);

return self__.changed.call(null);
}));

(cljs.core.async.t_cljs$core$async27214.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return self__.changed.call(null);
}));

(cljs.core.async.t_cljs$core$async27214.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = (function (_,state_map){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.partial.call(null,cljs.core.merge_with,cljs.core.merge),state_map);

return self__.changed.call(null);
}));

(cljs.core.async.t_cljs$core$async27214.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = (function (_,mode){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.solo_modes.call(null,mode))){
} else {
throw (new Error(["Assert failed: ",["mode must be one of: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.solo_modes)].join(''),"\n","(solo-modes mode)"].join('')));
}

cljs.core.reset_BANG_.call(null,self__.solo_mode,mode);

return self__.changed.call(null);
}));

(cljs.core.async.t_cljs$core$async27214.getBasis = (function (){
return new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"change","change",477485025,null),new cljs.core.Symbol(null,"solo-mode","solo-mode",2031788074,null),new cljs.core.Symbol(null,"pick","pick",1300068175,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"calc-state","calc-state",-349968968,null),new cljs.core.Symbol(null,"out","out",729986010,null),new cljs.core.Symbol(null,"changed","changed",-2083710852,null),new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"attrs","attrs",-450137186,null),new cljs.core.Symbol(null,"meta27215","meta27215",608153883,null)], null);
}));

(cljs.core.async.t_cljs$core$async27214.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async27214.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async27214");

(cljs.core.async.t_cljs$core$async27214.cljs$lang$ctorPrWriter = (function (this__4428__auto__,writer__4429__auto__,opt__4430__auto__){
return cljs.core._write.call(null,writer__4429__auto__,"cljs.core.async/t_cljs$core$async27214");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async27214.
 */
cljs.core.async.__GT_t_cljs$core$async27214 = (function cljs$core$async$mix_$___GT_t_cljs$core$async27214(change__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta27215){
return (new cljs.core.async.t_cljs$core$async27214(change__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta27215));
});

}

return (new cljs.core.async.t_cljs$core$async27214(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__26319__auto___27378 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26320__auto__ = (function (){var switch__26224__auto__ = (function (state_27318){
var state_val_27319 = (state_27318[(1)]);
if((state_val_27319 === (7))){
var inst_27233 = (state_27318[(2)]);
var state_27318__$1 = state_27318;
var statearr_27320_27379 = state_27318__$1;
(statearr_27320_27379[(2)] = inst_27233);

(statearr_27320_27379[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27319 === (20))){
var inst_27245 = (state_27318[(7)]);
var state_27318__$1 = state_27318;
var statearr_27321_27380 = state_27318__$1;
(statearr_27321_27380[(2)] = inst_27245);

(statearr_27321_27380[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27319 === (27))){
var state_27318__$1 = state_27318;
var statearr_27322_27381 = state_27318__$1;
(statearr_27322_27381[(2)] = null);

(statearr_27322_27381[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27319 === (1))){
var inst_27220 = (state_27318[(8)]);
var inst_27220__$1 = calc_state.call(null);
var inst_27222 = (inst_27220__$1 == null);
var inst_27223 = cljs.core.not.call(null,inst_27222);
var state_27318__$1 = (function (){var statearr_27323 = state_27318;
(statearr_27323[(8)] = inst_27220__$1);

return statearr_27323;
})();
if(inst_27223){
var statearr_27324_27382 = state_27318__$1;
(statearr_27324_27382[(1)] = (2));

} else {
var statearr_27325_27383 = state_27318__$1;
(statearr_27325_27383[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27319 === (24))){
var inst_27292 = (state_27318[(9)]);
var inst_27278 = (state_27318[(10)]);
var inst_27269 = (state_27318[(11)]);
var inst_27292__$1 = inst_27269.call(null,inst_27278);
var state_27318__$1 = (function (){var statearr_27326 = state_27318;
(statearr_27326[(9)] = inst_27292__$1);

return statearr_27326;
})();
if(cljs.core.truth_(inst_27292__$1)){
var statearr_27327_27384 = state_27318__$1;
(statearr_27327_27384[(1)] = (29));

} else {
var statearr_27328_27385 = state_27318__$1;
(statearr_27328_27385[(1)] = (30));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27319 === (4))){
var inst_27236 = (state_27318[(2)]);
var state_27318__$1 = state_27318;
if(cljs.core.truth_(inst_27236)){
var statearr_27329_27386 = state_27318__$1;
(statearr_27329_27386[(1)] = (8));

} else {
var statearr_27330_27387 = state_27318__$1;
(statearr_27330_27387[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27319 === (15))){
var inst_27263 = (state_27318[(2)]);
var state_27318__$1 = state_27318;
if(cljs.core.truth_(inst_27263)){
var statearr_27331_27388 = state_27318__$1;
(statearr_27331_27388[(1)] = (19));

} else {
var statearr_27332_27389 = state_27318__$1;
(statearr_27332_27389[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27319 === (21))){
var inst_27268 = (state_27318[(12)]);
var inst_27268__$1 = (state_27318[(2)]);
var inst_27269 = cljs.core.get.call(null,inst_27268__$1,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_27270 = cljs.core.get.call(null,inst_27268__$1,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_27271 = cljs.core.get.call(null,inst_27268__$1,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var state_27318__$1 = (function (){var statearr_27333 = state_27318;
(statearr_27333[(13)] = inst_27270);

(statearr_27333[(12)] = inst_27268__$1);

(statearr_27333[(11)] = inst_27269);

return statearr_27333;
})();
return cljs.core.async.ioc_alts_BANG_.call(null,state_27318__$1,(22),inst_27271);
} else {
if((state_val_27319 === (31))){
var inst_27300 = (state_27318[(2)]);
var state_27318__$1 = state_27318;
if(cljs.core.truth_(inst_27300)){
var statearr_27334_27390 = state_27318__$1;
(statearr_27334_27390[(1)] = (32));

} else {
var statearr_27335_27391 = state_27318__$1;
(statearr_27335_27391[(1)] = (33));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27319 === (32))){
var inst_27277 = (state_27318[(14)]);
var state_27318__$1 = state_27318;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_27318__$1,(35),out,inst_27277);
} else {
if((state_val_27319 === (33))){
var inst_27268 = (state_27318[(12)]);
var inst_27245 = inst_27268;
var state_27318__$1 = (function (){var statearr_27336 = state_27318;
(statearr_27336[(7)] = inst_27245);

return statearr_27336;
})();
var statearr_27337_27392 = state_27318__$1;
(statearr_27337_27392[(2)] = null);

(statearr_27337_27392[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27319 === (13))){
var inst_27245 = (state_27318[(7)]);
var inst_27252 = inst_27245.cljs$lang$protocol_mask$partition0$;
var inst_27253 = (inst_27252 & (64));
var inst_27254 = inst_27245.cljs$core$ISeq$;
var inst_27255 = (cljs.core.PROTOCOL_SENTINEL === inst_27254);
var inst_27256 = ((inst_27253) || (inst_27255));
var state_27318__$1 = state_27318;
if(cljs.core.truth_(inst_27256)){
var statearr_27338_27393 = state_27318__$1;
(statearr_27338_27393[(1)] = (16));

} else {
var statearr_27339_27394 = state_27318__$1;
(statearr_27339_27394[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27319 === (22))){
var inst_27277 = (state_27318[(14)]);
var inst_27278 = (state_27318[(10)]);
var inst_27276 = (state_27318[(2)]);
var inst_27277__$1 = cljs.core.nth.call(null,inst_27276,(0),null);
var inst_27278__$1 = cljs.core.nth.call(null,inst_27276,(1),null);
var inst_27279 = (inst_27277__$1 == null);
var inst_27280 = cljs.core._EQ_.call(null,inst_27278__$1,change);
var inst_27281 = ((inst_27279) || (inst_27280));
var state_27318__$1 = (function (){var statearr_27340 = state_27318;
(statearr_27340[(14)] = inst_27277__$1);

(statearr_27340[(10)] = inst_27278__$1);

return statearr_27340;
})();
if(cljs.core.truth_(inst_27281)){
var statearr_27341_27395 = state_27318__$1;
(statearr_27341_27395[(1)] = (23));

} else {
var statearr_27342_27396 = state_27318__$1;
(statearr_27342_27396[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27319 === (36))){
var inst_27268 = (state_27318[(12)]);
var inst_27245 = inst_27268;
var state_27318__$1 = (function (){var statearr_27343 = state_27318;
(statearr_27343[(7)] = inst_27245);

return statearr_27343;
})();
var statearr_27344_27397 = state_27318__$1;
(statearr_27344_27397[(2)] = null);

(statearr_27344_27397[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27319 === (29))){
var inst_27292 = (state_27318[(9)]);
var state_27318__$1 = state_27318;
var statearr_27345_27398 = state_27318__$1;
(statearr_27345_27398[(2)] = inst_27292);

(statearr_27345_27398[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27319 === (6))){
var state_27318__$1 = state_27318;
var statearr_27346_27399 = state_27318__$1;
(statearr_27346_27399[(2)] = false);

(statearr_27346_27399[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27319 === (28))){
var inst_27288 = (state_27318[(2)]);
var inst_27289 = calc_state.call(null);
var inst_27245 = inst_27289;
var state_27318__$1 = (function (){var statearr_27347 = state_27318;
(statearr_27347[(15)] = inst_27288);

(statearr_27347[(7)] = inst_27245);

return statearr_27347;
})();
var statearr_27348_27400 = state_27318__$1;
(statearr_27348_27400[(2)] = null);

(statearr_27348_27400[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27319 === (25))){
var inst_27314 = (state_27318[(2)]);
var state_27318__$1 = state_27318;
var statearr_27349_27401 = state_27318__$1;
(statearr_27349_27401[(2)] = inst_27314);

(statearr_27349_27401[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27319 === (34))){
var inst_27312 = (state_27318[(2)]);
var state_27318__$1 = state_27318;
var statearr_27350_27402 = state_27318__$1;
(statearr_27350_27402[(2)] = inst_27312);

(statearr_27350_27402[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27319 === (17))){
var state_27318__$1 = state_27318;
var statearr_27351_27403 = state_27318__$1;
(statearr_27351_27403[(2)] = false);

(statearr_27351_27403[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27319 === (3))){
var state_27318__$1 = state_27318;
var statearr_27352_27404 = state_27318__$1;
(statearr_27352_27404[(2)] = false);

(statearr_27352_27404[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27319 === (12))){
var inst_27316 = (state_27318[(2)]);
var state_27318__$1 = state_27318;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_27318__$1,inst_27316);
} else {
if((state_val_27319 === (2))){
var inst_27220 = (state_27318[(8)]);
var inst_27225 = inst_27220.cljs$lang$protocol_mask$partition0$;
var inst_27226 = (inst_27225 & (64));
var inst_27227 = inst_27220.cljs$core$ISeq$;
var inst_27228 = (cljs.core.PROTOCOL_SENTINEL === inst_27227);
var inst_27229 = ((inst_27226) || (inst_27228));
var state_27318__$1 = state_27318;
if(cljs.core.truth_(inst_27229)){
var statearr_27353_27405 = state_27318__$1;
(statearr_27353_27405[(1)] = (5));

} else {
var statearr_27354_27406 = state_27318__$1;
(statearr_27354_27406[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27319 === (23))){
var inst_27277 = (state_27318[(14)]);
var inst_27283 = (inst_27277 == null);
var state_27318__$1 = state_27318;
if(cljs.core.truth_(inst_27283)){
var statearr_27355_27407 = state_27318__$1;
(statearr_27355_27407[(1)] = (26));

} else {
var statearr_27356_27408 = state_27318__$1;
(statearr_27356_27408[(1)] = (27));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27319 === (35))){
var inst_27303 = (state_27318[(2)]);
var state_27318__$1 = state_27318;
if(cljs.core.truth_(inst_27303)){
var statearr_27357_27409 = state_27318__$1;
(statearr_27357_27409[(1)] = (36));

} else {
var statearr_27358_27410 = state_27318__$1;
(statearr_27358_27410[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27319 === (19))){
var inst_27245 = (state_27318[(7)]);
var inst_27265 = cljs.core.apply.call(null,cljs.core.hash_map,inst_27245);
var state_27318__$1 = state_27318;
var statearr_27359_27411 = state_27318__$1;
(statearr_27359_27411[(2)] = inst_27265);

(statearr_27359_27411[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27319 === (11))){
var inst_27245 = (state_27318[(7)]);
var inst_27249 = (inst_27245 == null);
var inst_27250 = cljs.core.not.call(null,inst_27249);
var state_27318__$1 = state_27318;
if(inst_27250){
var statearr_27360_27412 = state_27318__$1;
(statearr_27360_27412[(1)] = (13));

} else {
var statearr_27361_27413 = state_27318__$1;
(statearr_27361_27413[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27319 === (9))){
var inst_27220 = (state_27318[(8)]);
var state_27318__$1 = state_27318;
var statearr_27362_27414 = state_27318__$1;
(statearr_27362_27414[(2)] = inst_27220);

(statearr_27362_27414[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27319 === (5))){
var state_27318__$1 = state_27318;
var statearr_27363_27415 = state_27318__$1;
(statearr_27363_27415[(2)] = true);

(statearr_27363_27415[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27319 === (14))){
var state_27318__$1 = state_27318;
var statearr_27364_27416 = state_27318__$1;
(statearr_27364_27416[(2)] = false);

(statearr_27364_27416[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27319 === (26))){
var inst_27278 = (state_27318[(10)]);
var inst_27285 = cljs.core.swap_BANG_.call(null,cs,cljs.core.dissoc,inst_27278);
var state_27318__$1 = state_27318;
var statearr_27365_27417 = state_27318__$1;
(statearr_27365_27417[(2)] = inst_27285);

(statearr_27365_27417[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27319 === (16))){
var state_27318__$1 = state_27318;
var statearr_27366_27418 = state_27318__$1;
(statearr_27366_27418[(2)] = true);

(statearr_27366_27418[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27319 === (38))){
var inst_27308 = (state_27318[(2)]);
var state_27318__$1 = state_27318;
var statearr_27367_27419 = state_27318__$1;
(statearr_27367_27419[(2)] = inst_27308);

(statearr_27367_27419[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27319 === (30))){
var inst_27270 = (state_27318[(13)]);
var inst_27278 = (state_27318[(10)]);
var inst_27269 = (state_27318[(11)]);
var inst_27295 = cljs.core.empty_QMARK_.call(null,inst_27269);
var inst_27296 = inst_27270.call(null,inst_27278);
var inst_27297 = cljs.core.not.call(null,inst_27296);
var inst_27298 = ((inst_27295) && (inst_27297));
var state_27318__$1 = state_27318;
var statearr_27368_27420 = state_27318__$1;
(statearr_27368_27420[(2)] = inst_27298);

(statearr_27368_27420[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27319 === (10))){
var inst_27220 = (state_27318[(8)]);
var inst_27241 = (state_27318[(2)]);
var inst_27242 = cljs.core.get.call(null,inst_27241,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_27243 = cljs.core.get.call(null,inst_27241,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_27244 = cljs.core.get.call(null,inst_27241,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var inst_27245 = inst_27220;
var state_27318__$1 = (function (){var statearr_27369 = state_27318;
(statearr_27369[(16)] = inst_27243);

(statearr_27369[(17)] = inst_27244);

(statearr_27369[(7)] = inst_27245);

(statearr_27369[(18)] = inst_27242);

return statearr_27369;
})();
var statearr_27370_27421 = state_27318__$1;
(statearr_27370_27421[(2)] = null);

(statearr_27370_27421[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27319 === (18))){
var inst_27260 = (state_27318[(2)]);
var state_27318__$1 = state_27318;
var statearr_27371_27422 = state_27318__$1;
(statearr_27371_27422[(2)] = inst_27260);

(statearr_27371_27422[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27319 === (37))){
var state_27318__$1 = state_27318;
var statearr_27372_27423 = state_27318__$1;
(statearr_27372_27423[(2)] = null);

(statearr_27372_27423[(1)] = (38));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27319 === (8))){
var inst_27220 = (state_27318[(8)]);
var inst_27238 = cljs.core.apply.call(null,cljs.core.hash_map,inst_27220);
var state_27318__$1 = state_27318;
var statearr_27373_27424 = state_27318__$1;
(statearr_27373_27424[(2)] = inst_27238);

(statearr_27373_27424[(1)] = (10));


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
});
return (function() {
var cljs$core$async$mix_$_state_machine__26225__auto__ = null;
var cljs$core$async$mix_$_state_machine__26225__auto____0 = (function (){
var statearr_27374 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_27374[(0)] = cljs$core$async$mix_$_state_machine__26225__auto__);

(statearr_27374[(1)] = (1));

return statearr_27374;
});
var cljs$core$async$mix_$_state_machine__26225__auto____1 = (function (state_27318){
while(true){
var ret_value__26226__auto__ = (function (){try{while(true){
var result__26227__auto__ = switch__26224__auto__.call(null,state_27318);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26227__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26227__auto__;
}
break;
}
}catch (e27375){if((e27375 instanceof Object)){
var ex__26228__auto__ = e27375;
var statearr_27376_27425 = state_27318;
(statearr_27376_27425[(5)] = ex__26228__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27318);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e27375;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26226__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27426 = state_27318;
state_27318 = G__27426;
continue;
} else {
return ret_value__26226__auto__;
}
break;
}
});
cljs$core$async$mix_$_state_machine__26225__auto__ = function(state_27318){
switch(arguments.length){
case 0:
return cljs$core$async$mix_$_state_machine__26225__auto____0.call(this);
case 1:
return cljs$core$async$mix_$_state_machine__26225__auto____1.call(this,state_27318);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mix_$_state_machine__26225__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mix_$_state_machine__26225__auto____0;
cljs$core$async$mix_$_state_machine__26225__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mix_$_state_machine__26225__auto____1;
return cljs$core$async$mix_$_state_machine__26225__auto__;
})()
})();
var state__26321__auto__ = (function (){var statearr_27377 = f__26320__auto__.call(null);
(statearr_27377[(6)] = c__26319__auto___27378);

return statearr_27377;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26321__auto__);
}));


return m;
});
/**
 * Adds ch as an input to the mix
 */
cljs.core.async.admix = (function cljs$core$async$admix(mix,ch){
return cljs.core.async.admix_STAR_.call(null,mix,ch);
});
/**
 * Removes ch as an input to the mix
 */
cljs.core.async.unmix = (function cljs$core$async$unmix(mix,ch){
return cljs.core.async.unmix_STAR_.call(null,mix,ch);
});
/**
 * removes all inputs from the mix
 */
cljs.core.async.unmix_all = (function cljs$core$async$unmix_all(mix){
return cljs.core.async.unmix_all_STAR_.call(null,mix);
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
return cljs.core.async.toggle_STAR_.call(null,mix,state_map);
});
/**
 * Sets the solo mode of the mix. mode must be one of :mute or :pause
 */
cljs.core.async.solo_mode = (function cljs$core$async$solo_mode(mix,mode){
return cljs.core.async.solo_mode_STAR_.call(null,mix,mode);
});

/**
 * @interface
 */
cljs.core.async.Pub = function(){};

cljs.core.async.sub_STAR_ = (function cljs$core$async$sub_STAR_(p,v,ch,close_QMARK_){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$sub_STAR_$arity$4 == null)))))){
return p.cljs$core$async$Pub$sub_STAR_$arity$4(p,v,ch,close_QMARK_);
} else {
var x__4487__auto__ = (((p == null))?null:p);
var m__4488__auto__ = (cljs.core.async.sub_STAR_[goog.typeOf(x__4487__auto__)]);
if((!((m__4488__auto__ == null)))){
return m__4488__auto__.call(null,p,v,ch,close_QMARK_);
} else {
var m__4485__auto__ = (cljs.core.async.sub_STAR_["_"]);
if((!((m__4485__auto__ == null)))){
return m__4485__auto__.call(null,p,v,ch,close_QMARK_);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.sub*",p);
}
}
}
});

cljs.core.async.unsub_STAR_ = (function cljs$core$async$unsub_STAR_(p,v,ch){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_STAR_$arity$3 == null)))))){
return p.cljs$core$async$Pub$unsub_STAR_$arity$3(p,v,ch);
} else {
var x__4487__auto__ = (((p == null))?null:p);
var m__4488__auto__ = (cljs.core.async.unsub_STAR_[goog.typeOf(x__4487__auto__)]);
if((!((m__4488__auto__ == null)))){
return m__4488__auto__.call(null,p,v,ch);
} else {
var m__4485__auto__ = (cljs.core.async.unsub_STAR_["_"]);
if((!((m__4485__auto__ == null)))){
return m__4485__auto__.call(null,p,v,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub*",p);
}
}
}
});

cljs.core.async.unsub_all_STAR_ = (function cljs$core$async$unsub_all_STAR_(var_args){
var G__27428 = arguments.length;
switch (G__27428) {
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
var x__4487__auto__ = (((p == null))?null:p);
var m__4488__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__4487__auto__)]);
if((!((m__4488__auto__ == null)))){
return m__4488__auto__.call(null,p);
} else {
var m__4485__auto__ = (cljs.core.async.unsub_all_STAR_["_"]);
if((!((m__4485__auto__ == null)))){
return m__4485__auto__.call(null,p);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
}
}));

(cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2 = (function (p,v){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$2 == null)))))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else {
var x__4487__auto__ = (((p == null))?null:p);
var m__4488__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__4487__auto__)]);
if((!((m__4488__auto__ == null)))){
return m__4488__auto__.call(null,p,v);
} else {
var m__4485__auto__ = (cljs.core.async.unsub_all_STAR_["_"]);
if((!((m__4485__auto__ == null)))){
return m__4485__auto__.call(null,p,v);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
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
var G__27432 = arguments.length;
switch (G__27432) {
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
return cljs.core.async.pub.call(null,ch,topic_fn,cljs.core.constantly.call(null,null));
}));

(cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3 = (function (ch,topic_fn,buf_fn){
var mults = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var ensure_mult = (function (topic){
var or__4185__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,mults),topic);
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return cljs.core.get.call(null,cljs.core.swap_BANG_.call(null,mults,(function (p1__27430_SHARP_){
if(cljs.core.truth_(p1__27430_SHARP_.call(null,topic))){
return p1__27430_SHARP_;
} else {
return cljs.core.assoc.call(null,p1__27430_SHARP_,topic,cljs.core.async.mult.call(null,cljs.core.async.chan.call(null,buf_fn.call(null,topic))));
}
})),topic);
}
});
var p = (function (){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async27433 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Pub}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async27433 = (function (ch,topic_fn,buf_fn,mults,ensure_mult,meta27434){
this.ch = ch;
this.topic_fn = topic_fn;
this.buf_fn = buf_fn;
this.mults = mults;
this.ensure_mult = ensure_mult;
this.meta27434 = meta27434;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async27433.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_27435,meta27434__$1){
var self__ = this;
var _27435__$1 = this;
return (new cljs.core.async.t_cljs$core$async27433(self__.ch,self__.topic_fn,self__.buf_fn,self__.mults,self__.ensure_mult,meta27434__$1));
}));

(cljs.core.async.t_cljs$core$async27433.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_27435){
var self__ = this;
var _27435__$1 = this;
return self__.meta27434;
}));

(cljs.core.async.t_cljs$core$async27433.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async27433.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
}));

(cljs.core.async.t_cljs$core$async27433.prototype.cljs$core$async$Pub$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async27433.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = (function (p,topic,ch__$1,close_QMARK_){
var self__ = this;
var p__$1 = this;
var m = self__.ensure_mult.call(null,topic);
return cljs.core.async.tap.call(null,m,ch__$1,close_QMARK_);
}));

(cljs.core.async.t_cljs$core$async27433.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = (function (p,topic,ch__$1){
var self__ = this;
var p__$1 = this;
var temp__5735__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,self__.mults),topic);
if(cljs.core.truth_(temp__5735__auto__)){
var m = temp__5735__auto__;
return cljs.core.async.untap.call(null,m,ch__$1);
} else {
return null;
}
}));

(cljs.core.async.t_cljs$core$async27433.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.reset_BANG_.call(null,self__.mults,cljs.core.PersistentArrayMap.EMPTY);
}));

(cljs.core.async.t_cljs$core$async27433.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = (function (_,topic){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.call(null,self__.mults,cljs.core.dissoc,topic);
}));

(cljs.core.async.t_cljs$core$async27433.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"topic-fn","topic-fn",-862449736,null),new cljs.core.Symbol(null,"buf-fn","buf-fn",-1200281591,null),new cljs.core.Symbol(null,"mults","mults",-461114485,null),new cljs.core.Symbol(null,"ensure-mult","ensure-mult",1796584816,null),new cljs.core.Symbol(null,"meta27434","meta27434",352217674,null)], null);
}));

(cljs.core.async.t_cljs$core$async27433.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async27433.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async27433");

(cljs.core.async.t_cljs$core$async27433.cljs$lang$ctorPrWriter = (function (this__4428__auto__,writer__4429__auto__,opt__4430__auto__){
return cljs.core._write.call(null,writer__4429__auto__,"cljs.core.async/t_cljs$core$async27433");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async27433.
 */
cljs.core.async.__GT_t_cljs$core$async27433 = (function cljs$core$async$__GT_t_cljs$core$async27433(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta27434){
return (new cljs.core.async.t_cljs$core$async27433(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta27434));
});

}

return (new cljs.core.async.t_cljs$core$async27433(ch,topic_fn,buf_fn,mults,ensure_mult,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__26319__auto___27553 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26320__auto__ = (function (){var switch__26224__auto__ = (function (state_27507){
var state_val_27508 = (state_27507[(1)]);
if((state_val_27508 === (7))){
var inst_27503 = (state_27507[(2)]);
var state_27507__$1 = state_27507;
var statearr_27509_27554 = state_27507__$1;
(statearr_27509_27554[(2)] = inst_27503);

(statearr_27509_27554[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27508 === (20))){
var state_27507__$1 = state_27507;
var statearr_27510_27555 = state_27507__$1;
(statearr_27510_27555[(2)] = null);

(statearr_27510_27555[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27508 === (1))){
var state_27507__$1 = state_27507;
var statearr_27511_27556 = state_27507__$1;
(statearr_27511_27556[(2)] = null);

(statearr_27511_27556[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27508 === (24))){
var inst_27486 = (state_27507[(7)]);
var inst_27495 = cljs.core.swap_BANG_.call(null,mults,cljs.core.dissoc,inst_27486);
var state_27507__$1 = state_27507;
var statearr_27512_27557 = state_27507__$1;
(statearr_27512_27557[(2)] = inst_27495);

(statearr_27512_27557[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27508 === (4))){
var inst_27438 = (state_27507[(8)]);
var inst_27438__$1 = (state_27507[(2)]);
var inst_27439 = (inst_27438__$1 == null);
var state_27507__$1 = (function (){var statearr_27513 = state_27507;
(statearr_27513[(8)] = inst_27438__$1);

return statearr_27513;
})();
if(cljs.core.truth_(inst_27439)){
var statearr_27514_27558 = state_27507__$1;
(statearr_27514_27558[(1)] = (5));

} else {
var statearr_27515_27559 = state_27507__$1;
(statearr_27515_27559[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27508 === (15))){
var inst_27480 = (state_27507[(2)]);
var state_27507__$1 = state_27507;
var statearr_27516_27560 = state_27507__$1;
(statearr_27516_27560[(2)] = inst_27480);

(statearr_27516_27560[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27508 === (21))){
var inst_27500 = (state_27507[(2)]);
var state_27507__$1 = (function (){var statearr_27517 = state_27507;
(statearr_27517[(9)] = inst_27500);

return statearr_27517;
})();
var statearr_27518_27561 = state_27507__$1;
(statearr_27518_27561[(2)] = null);

(statearr_27518_27561[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27508 === (13))){
var inst_27462 = (state_27507[(10)]);
var inst_27464 = cljs.core.chunked_seq_QMARK_.call(null,inst_27462);
var state_27507__$1 = state_27507;
if(inst_27464){
var statearr_27519_27562 = state_27507__$1;
(statearr_27519_27562[(1)] = (16));

} else {
var statearr_27520_27563 = state_27507__$1;
(statearr_27520_27563[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27508 === (22))){
var inst_27492 = (state_27507[(2)]);
var state_27507__$1 = state_27507;
if(cljs.core.truth_(inst_27492)){
var statearr_27521_27564 = state_27507__$1;
(statearr_27521_27564[(1)] = (23));

} else {
var statearr_27522_27565 = state_27507__$1;
(statearr_27522_27565[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27508 === (6))){
var inst_27438 = (state_27507[(8)]);
var inst_27488 = (state_27507[(11)]);
var inst_27486 = (state_27507[(7)]);
var inst_27486__$1 = topic_fn.call(null,inst_27438);
var inst_27487 = cljs.core.deref.call(null,mults);
var inst_27488__$1 = cljs.core.get.call(null,inst_27487,inst_27486__$1);
var state_27507__$1 = (function (){var statearr_27523 = state_27507;
(statearr_27523[(11)] = inst_27488__$1);

(statearr_27523[(7)] = inst_27486__$1);

return statearr_27523;
})();
if(cljs.core.truth_(inst_27488__$1)){
var statearr_27524_27566 = state_27507__$1;
(statearr_27524_27566[(1)] = (19));

} else {
var statearr_27525_27567 = state_27507__$1;
(statearr_27525_27567[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27508 === (25))){
var inst_27497 = (state_27507[(2)]);
var state_27507__$1 = state_27507;
var statearr_27526_27568 = state_27507__$1;
(statearr_27526_27568[(2)] = inst_27497);

(statearr_27526_27568[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27508 === (17))){
var inst_27462 = (state_27507[(10)]);
var inst_27471 = cljs.core.first.call(null,inst_27462);
var inst_27472 = cljs.core.async.muxch_STAR_.call(null,inst_27471);
var inst_27473 = cljs.core.async.close_BANG_.call(null,inst_27472);
var inst_27474 = cljs.core.next.call(null,inst_27462);
var inst_27448 = inst_27474;
var inst_27449 = null;
var inst_27450 = (0);
var inst_27451 = (0);
var state_27507__$1 = (function (){var statearr_27527 = state_27507;
(statearr_27527[(12)] = inst_27449);

(statearr_27527[(13)] = inst_27450);

(statearr_27527[(14)] = inst_27451);

(statearr_27527[(15)] = inst_27448);

(statearr_27527[(16)] = inst_27473);

return statearr_27527;
})();
var statearr_27528_27569 = state_27507__$1;
(statearr_27528_27569[(2)] = null);

(statearr_27528_27569[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27508 === (3))){
var inst_27505 = (state_27507[(2)]);
var state_27507__$1 = state_27507;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_27507__$1,inst_27505);
} else {
if((state_val_27508 === (12))){
var inst_27482 = (state_27507[(2)]);
var state_27507__$1 = state_27507;
var statearr_27529_27570 = state_27507__$1;
(statearr_27529_27570[(2)] = inst_27482);

(statearr_27529_27570[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27508 === (2))){
var state_27507__$1 = state_27507;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27507__$1,(4),ch);
} else {
if((state_val_27508 === (23))){
var state_27507__$1 = state_27507;
var statearr_27530_27571 = state_27507__$1;
(statearr_27530_27571[(2)] = null);

(statearr_27530_27571[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27508 === (19))){
var inst_27438 = (state_27507[(8)]);
var inst_27488 = (state_27507[(11)]);
var inst_27490 = cljs.core.async.muxch_STAR_.call(null,inst_27488);
var state_27507__$1 = state_27507;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_27507__$1,(22),inst_27490,inst_27438);
} else {
if((state_val_27508 === (11))){
var inst_27462 = (state_27507[(10)]);
var inst_27448 = (state_27507[(15)]);
var inst_27462__$1 = cljs.core.seq.call(null,inst_27448);
var state_27507__$1 = (function (){var statearr_27531 = state_27507;
(statearr_27531[(10)] = inst_27462__$1);

return statearr_27531;
})();
if(inst_27462__$1){
var statearr_27532_27572 = state_27507__$1;
(statearr_27532_27572[(1)] = (13));

} else {
var statearr_27533_27573 = state_27507__$1;
(statearr_27533_27573[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27508 === (9))){
var inst_27484 = (state_27507[(2)]);
var state_27507__$1 = state_27507;
var statearr_27534_27574 = state_27507__$1;
(statearr_27534_27574[(2)] = inst_27484);

(statearr_27534_27574[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27508 === (5))){
var inst_27445 = cljs.core.deref.call(null,mults);
var inst_27446 = cljs.core.vals.call(null,inst_27445);
var inst_27447 = cljs.core.seq.call(null,inst_27446);
var inst_27448 = inst_27447;
var inst_27449 = null;
var inst_27450 = (0);
var inst_27451 = (0);
var state_27507__$1 = (function (){var statearr_27535 = state_27507;
(statearr_27535[(12)] = inst_27449);

(statearr_27535[(13)] = inst_27450);

(statearr_27535[(14)] = inst_27451);

(statearr_27535[(15)] = inst_27448);

return statearr_27535;
})();
var statearr_27536_27575 = state_27507__$1;
(statearr_27536_27575[(2)] = null);

(statearr_27536_27575[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27508 === (14))){
var state_27507__$1 = state_27507;
var statearr_27540_27576 = state_27507__$1;
(statearr_27540_27576[(2)] = null);

(statearr_27540_27576[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27508 === (16))){
var inst_27462 = (state_27507[(10)]);
var inst_27466 = cljs.core.chunk_first.call(null,inst_27462);
var inst_27467 = cljs.core.chunk_rest.call(null,inst_27462);
var inst_27468 = cljs.core.count.call(null,inst_27466);
var inst_27448 = inst_27467;
var inst_27449 = inst_27466;
var inst_27450 = inst_27468;
var inst_27451 = (0);
var state_27507__$1 = (function (){var statearr_27541 = state_27507;
(statearr_27541[(12)] = inst_27449);

(statearr_27541[(13)] = inst_27450);

(statearr_27541[(14)] = inst_27451);

(statearr_27541[(15)] = inst_27448);

return statearr_27541;
})();
var statearr_27542_27577 = state_27507__$1;
(statearr_27542_27577[(2)] = null);

(statearr_27542_27577[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27508 === (10))){
var inst_27449 = (state_27507[(12)]);
var inst_27450 = (state_27507[(13)]);
var inst_27451 = (state_27507[(14)]);
var inst_27448 = (state_27507[(15)]);
var inst_27456 = cljs.core._nth.call(null,inst_27449,inst_27451);
var inst_27457 = cljs.core.async.muxch_STAR_.call(null,inst_27456);
var inst_27458 = cljs.core.async.close_BANG_.call(null,inst_27457);
var inst_27459 = (inst_27451 + (1));
var tmp27537 = inst_27449;
var tmp27538 = inst_27450;
var tmp27539 = inst_27448;
var inst_27448__$1 = tmp27539;
var inst_27449__$1 = tmp27537;
var inst_27450__$1 = tmp27538;
var inst_27451__$1 = inst_27459;
var state_27507__$1 = (function (){var statearr_27543 = state_27507;
(statearr_27543[(12)] = inst_27449__$1);

(statearr_27543[(13)] = inst_27450__$1);

(statearr_27543[(17)] = inst_27458);

(statearr_27543[(14)] = inst_27451__$1);

(statearr_27543[(15)] = inst_27448__$1);

return statearr_27543;
})();
var statearr_27544_27578 = state_27507__$1;
(statearr_27544_27578[(2)] = null);

(statearr_27544_27578[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27508 === (18))){
var inst_27477 = (state_27507[(2)]);
var state_27507__$1 = state_27507;
var statearr_27545_27579 = state_27507__$1;
(statearr_27545_27579[(2)] = inst_27477);

(statearr_27545_27579[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27508 === (8))){
var inst_27450 = (state_27507[(13)]);
var inst_27451 = (state_27507[(14)]);
var inst_27453 = (inst_27451 < inst_27450);
var inst_27454 = inst_27453;
var state_27507__$1 = state_27507;
if(cljs.core.truth_(inst_27454)){
var statearr_27546_27580 = state_27507__$1;
(statearr_27546_27580[(1)] = (10));

} else {
var statearr_27547_27581 = state_27507__$1;
(statearr_27547_27581[(1)] = (11));

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
var cljs$core$async$state_machine__26225__auto__ = null;
var cljs$core$async$state_machine__26225__auto____0 = (function (){
var statearr_27548 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_27548[(0)] = cljs$core$async$state_machine__26225__auto__);

(statearr_27548[(1)] = (1));

return statearr_27548;
});
var cljs$core$async$state_machine__26225__auto____1 = (function (state_27507){
while(true){
var ret_value__26226__auto__ = (function (){try{while(true){
var result__26227__auto__ = switch__26224__auto__.call(null,state_27507);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26227__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26227__auto__;
}
break;
}
}catch (e27549){if((e27549 instanceof Object)){
var ex__26228__auto__ = e27549;
var statearr_27550_27582 = state_27507;
(statearr_27550_27582[(5)] = ex__26228__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27507);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e27549;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26226__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27583 = state_27507;
state_27507 = G__27583;
continue;
} else {
return ret_value__26226__auto__;
}
break;
}
});
cljs$core$async$state_machine__26225__auto__ = function(state_27507){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__26225__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__26225__auto____1.call(this,state_27507);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__26225__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__26225__auto____0;
cljs$core$async$state_machine__26225__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__26225__auto____1;
return cljs$core$async$state_machine__26225__auto__;
})()
})();
var state__26321__auto__ = (function (){var statearr_27551 = f__26320__auto__.call(null);
(statearr_27551[(6)] = c__26319__auto___27553);

return statearr_27551;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26321__auto__);
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
var G__27585 = arguments.length;
switch (G__27585) {
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
return cljs.core.async.sub.call(null,p,topic,ch,true);
}));

(cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4 = (function (p,topic,ch,close_QMARK_){
return cljs.core.async.sub_STAR_.call(null,p,topic,ch,close_QMARK_);
}));

(cljs.core.async.sub.cljs$lang$maxFixedArity = 4);

/**
 * Unsubscribes a channel from a topic of a pub
 */
cljs.core.async.unsub = (function cljs$core$async$unsub(p,topic,ch){
return cljs.core.async.unsub_STAR_.call(null,p,topic,ch);
});
/**
 * Unsubscribes all channels from a pub, or a topic of a pub
 */
cljs.core.async.unsub_all = (function cljs$core$async$unsub_all(var_args){
var G__27588 = arguments.length;
switch (G__27588) {
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
return cljs.core.async.unsub_all_STAR_.call(null,p);
}));

(cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2 = (function (p,topic){
return cljs.core.async.unsub_all_STAR_.call(null,p,topic);
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
var G__27591 = arguments.length;
switch (G__27591) {
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
return cljs.core.async.map.call(null,f,chs,null);
}));

(cljs.core.async.map.cljs$core$IFn$_invoke$arity$3 = (function (f,chs,buf_or_n){
var chs__$1 = cljs.core.vec.call(null,chs);
var out = cljs.core.async.chan.call(null,buf_or_n);
var cnt = cljs.core.count.call(null,chs__$1);
var rets = cljs.core.object_array.call(null,cnt);
var dchan = cljs.core.async.chan.call(null,(1));
var dctr = cljs.core.atom.call(null,null);
var done = cljs.core.mapv.call(null,(function (i){
return (function (ret){
(rets[i] = ret);

if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.call(null,dchan,rets.slice((0)));
} else {
return null;
}
});
}),cljs.core.range.call(null,cnt));
var c__26319__auto___27658 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26320__auto__ = (function (){var switch__26224__auto__ = (function (state_27630){
var state_val_27631 = (state_27630[(1)]);
if((state_val_27631 === (7))){
var state_27630__$1 = state_27630;
var statearr_27632_27659 = state_27630__$1;
(statearr_27632_27659[(2)] = null);

(statearr_27632_27659[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27631 === (1))){
var state_27630__$1 = state_27630;
var statearr_27633_27660 = state_27630__$1;
(statearr_27633_27660[(2)] = null);

(statearr_27633_27660[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27631 === (4))){
var inst_27594 = (state_27630[(7)]);
var inst_27596 = (inst_27594 < cnt);
var state_27630__$1 = state_27630;
if(cljs.core.truth_(inst_27596)){
var statearr_27634_27661 = state_27630__$1;
(statearr_27634_27661[(1)] = (6));

} else {
var statearr_27635_27662 = state_27630__$1;
(statearr_27635_27662[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27631 === (15))){
var inst_27626 = (state_27630[(2)]);
var state_27630__$1 = state_27630;
var statearr_27636_27663 = state_27630__$1;
(statearr_27636_27663[(2)] = inst_27626);

(statearr_27636_27663[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27631 === (13))){
var inst_27619 = cljs.core.async.close_BANG_.call(null,out);
var state_27630__$1 = state_27630;
var statearr_27637_27664 = state_27630__$1;
(statearr_27637_27664[(2)] = inst_27619);

(statearr_27637_27664[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27631 === (6))){
var state_27630__$1 = state_27630;
var statearr_27638_27665 = state_27630__$1;
(statearr_27638_27665[(2)] = null);

(statearr_27638_27665[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27631 === (3))){
var inst_27628 = (state_27630[(2)]);
var state_27630__$1 = state_27630;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_27630__$1,inst_27628);
} else {
if((state_val_27631 === (12))){
var inst_27616 = (state_27630[(8)]);
var inst_27616__$1 = (state_27630[(2)]);
var inst_27617 = cljs.core.some.call(null,cljs.core.nil_QMARK_,inst_27616__$1);
var state_27630__$1 = (function (){var statearr_27639 = state_27630;
(statearr_27639[(8)] = inst_27616__$1);

return statearr_27639;
})();
if(cljs.core.truth_(inst_27617)){
var statearr_27640_27666 = state_27630__$1;
(statearr_27640_27666[(1)] = (13));

} else {
var statearr_27641_27667 = state_27630__$1;
(statearr_27641_27667[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27631 === (2))){
var inst_27593 = cljs.core.reset_BANG_.call(null,dctr,cnt);
var inst_27594 = (0);
var state_27630__$1 = (function (){var statearr_27642 = state_27630;
(statearr_27642[(9)] = inst_27593);

(statearr_27642[(7)] = inst_27594);

return statearr_27642;
})();
var statearr_27643_27668 = state_27630__$1;
(statearr_27643_27668[(2)] = null);

(statearr_27643_27668[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27631 === (11))){
var inst_27594 = (state_27630[(7)]);
var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_27630,(10),Object,null,(9));
var inst_27603 = chs__$1.call(null,inst_27594);
var inst_27604 = done.call(null,inst_27594);
var inst_27605 = cljs.core.async.take_BANG_.call(null,inst_27603,inst_27604);
var state_27630__$1 = state_27630;
var statearr_27644_27669 = state_27630__$1;
(statearr_27644_27669[(2)] = inst_27605);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27630__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27631 === (9))){
var inst_27594 = (state_27630[(7)]);
var inst_27607 = (state_27630[(2)]);
var inst_27608 = (inst_27594 + (1));
var inst_27594__$1 = inst_27608;
var state_27630__$1 = (function (){var statearr_27645 = state_27630;
(statearr_27645[(10)] = inst_27607);

(statearr_27645[(7)] = inst_27594__$1);

return statearr_27645;
})();
var statearr_27646_27670 = state_27630__$1;
(statearr_27646_27670[(2)] = null);

(statearr_27646_27670[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27631 === (5))){
var inst_27614 = (state_27630[(2)]);
var state_27630__$1 = (function (){var statearr_27647 = state_27630;
(statearr_27647[(11)] = inst_27614);

return statearr_27647;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27630__$1,(12),dchan);
} else {
if((state_val_27631 === (14))){
var inst_27616 = (state_27630[(8)]);
var inst_27621 = cljs.core.apply.call(null,f,inst_27616);
var state_27630__$1 = state_27630;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_27630__$1,(16),out,inst_27621);
} else {
if((state_val_27631 === (16))){
var inst_27623 = (state_27630[(2)]);
var state_27630__$1 = (function (){var statearr_27648 = state_27630;
(statearr_27648[(12)] = inst_27623);

return statearr_27648;
})();
var statearr_27649_27671 = state_27630__$1;
(statearr_27649_27671[(2)] = null);

(statearr_27649_27671[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27631 === (10))){
var inst_27598 = (state_27630[(2)]);
var inst_27599 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);
var state_27630__$1 = (function (){var statearr_27650 = state_27630;
(statearr_27650[(13)] = inst_27598);

return statearr_27650;
})();
var statearr_27651_27672 = state_27630__$1;
(statearr_27651_27672[(2)] = inst_27599);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27630__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27631 === (8))){
var inst_27612 = (state_27630[(2)]);
var state_27630__$1 = state_27630;
var statearr_27652_27673 = state_27630__$1;
(statearr_27652_27673[(2)] = inst_27612);

(statearr_27652_27673[(1)] = (5));


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
});
return (function() {
var cljs$core$async$state_machine__26225__auto__ = null;
var cljs$core$async$state_machine__26225__auto____0 = (function (){
var statearr_27653 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_27653[(0)] = cljs$core$async$state_machine__26225__auto__);

(statearr_27653[(1)] = (1));

return statearr_27653;
});
var cljs$core$async$state_machine__26225__auto____1 = (function (state_27630){
while(true){
var ret_value__26226__auto__ = (function (){try{while(true){
var result__26227__auto__ = switch__26224__auto__.call(null,state_27630);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26227__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26227__auto__;
}
break;
}
}catch (e27654){if((e27654 instanceof Object)){
var ex__26228__auto__ = e27654;
var statearr_27655_27674 = state_27630;
(statearr_27655_27674[(5)] = ex__26228__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27630);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e27654;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26226__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27675 = state_27630;
state_27630 = G__27675;
continue;
} else {
return ret_value__26226__auto__;
}
break;
}
});
cljs$core$async$state_machine__26225__auto__ = function(state_27630){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__26225__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__26225__auto____1.call(this,state_27630);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__26225__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__26225__auto____0;
cljs$core$async$state_machine__26225__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__26225__auto____1;
return cljs$core$async$state_machine__26225__auto__;
})()
})();
var state__26321__auto__ = (function (){var statearr_27656 = f__26320__auto__.call(null);
(statearr_27656[(6)] = c__26319__auto___27658);

return statearr_27656;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26321__auto__);
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
var G__27678 = arguments.length;
switch (G__27678) {
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
return cljs.core.async.merge.call(null,chs,null);
}));

(cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2 = (function (chs,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__26319__auto___27732 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26320__auto__ = (function (){var switch__26224__auto__ = (function (state_27710){
var state_val_27711 = (state_27710[(1)]);
if((state_val_27711 === (7))){
var inst_27690 = (state_27710[(7)]);
var inst_27689 = (state_27710[(8)]);
var inst_27689__$1 = (state_27710[(2)]);
var inst_27690__$1 = cljs.core.nth.call(null,inst_27689__$1,(0),null);
var inst_27691 = cljs.core.nth.call(null,inst_27689__$1,(1),null);
var inst_27692 = (inst_27690__$1 == null);
var state_27710__$1 = (function (){var statearr_27712 = state_27710;
(statearr_27712[(9)] = inst_27691);

(statearr_27712[(7)] = inst_27690__$1);

(statearr_27712[(8)] = inst_27689__$1);

return statearr_27712;
})();
if(cljs.core.truth_(inst_27692)){
var statearr_27713_27733 = state_27710__$1;
(statearr_27713_27733[(1)] = (8));

} else {
var statearr_27714_27734 = state_27710__$1;
(statearr_27714_27734[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27711 === (1))){
var inst_27679 = cljs.core.vec.call(null,chs);
var inst_27680 = inst_27679;
var state_27710__$1 = (function (){var statearr_27715 = state_27710;
(statearr_27715[(10)] = inst_27680);

return statearr_27715;
})();
var statearr_27716_27735 = state_27710__$1;
(statearr_27716_27735[(2)] = null);

(statearr_27716_27735[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27711 === (4))){
var inst_27680 = (state_27710[(10)]);
var state_27710__$1 = state_27710;
return cljs.core.async.ioc_alts_BANG_.call(null,state_27710__$1,(7),inst_27680);
} else {
if((state_val_27711 === (6))){
var inst_27706 = (state_27710[(2)]);
var state_27710__$1 = state_27710;
var statearr_27717_27736 = state_27710__$1;
(statearr_27717_27736[(2)] = inst_27706);

(statearr_27717_27736[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27711 === (3))){
var inst_27708 = (state_27710[(2)]);
var state_27710__$1 = state_27710;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_27710__$1,inst_27708);
} else {
if((state_val_27711 === (2))){
var inst_27680 = (state_27710[(10)]);
var inst_27682 = cljs.core.count.call(null,inst_27680);
var inst_27683 = (inst_27682 > (0));
var state_27710__$1 = state_27710;
if(cljs.core.truth_(inst_27683)){
var statearr_27719_27737 = state_27710__$1;
(statearr_27719_27737[(1)] = (4));

} else {
var statearr_27720_27738 = state_27710__$1;
(statearr_27720_27738[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27711 === (11))){
var inst_27680 = (state_27710[(10)]);
var inst_27699 = (state_27710[(2)]);
var tmp27718 = inst_27680;
var inst_27680__$1 = tmp27718;
var state_27710__$1 = (function (){var statearr_27721 = state_27710;
(statearr_27721[(11)] = inst_27699);

(statearr_27721[(10)] = inst_27680__$1);

return statearr_27721;
})();
var statearr_27722_27739 = state_27710__$1;
(statearr_27722_27739[(2)] = null);

(statearr_27722_27739[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27711 === (9))){
var inst_27690 = (state_27710[(7)]);
var state_27710__$1 = state_27710;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_27710__$1,(11),out,inst_27690);
} else {
if((state_val_27711 === (5))){
var inst_27704 = cljs.core.async.close_BANG_.call(null,out);
var state_27710__$1 = state_27710;
var statearr_27723_27740 = state_27710__$1;
(statearr_27723_27740[(2)] = inst_27704);

(statearr_27723_27740[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27711 === (10))){
var inst_27702 = (state_27710[(2)]);
var state_27710__$1 = state_27710;
var statearr_27724_27741 = state_27710__$1;
(statearr_27724_27741[(2)] = inst_27702);

(statearr_27724_27741[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27711 === (8))){
var inst_27691 = (state_27710[(9)]);
var inst_27690 = (state_27710[(7)]);
var inst_27680 = (state_27710[(10)]);
var inst_27689 = (state_27710[(8)]);
var inst_27694 = (function (){var cs = inst_27680;
var vec__27685 = inst_27689;
var v = inst_27690;
var c = inst_27691;
return (function (p1__27676_SHARP_){
return cljs.core.not_EQ_.call(null,c,p1__27676_SHARP_);
});
})();
var inst_27695 = cljs.core.filterv.call(null,inst_27694,inst_27680);
var inst_27680__$1 = inst_27695;
var state_27710__$1 = (function (){var statearr_27725 = state_27710;
(statearr_27725[(10)] = inst_27680__$1);

return statearr_27725;
})();
var statearr_27726_27742 = state_27710__$1;
(statearr_27726_27742[(2)] = null);

(statearr_27726_27742[(1)] = (2));


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
var cljs$core$async$state_machine__26225__auto__ = null;
var cljs$core$async$state_machine__26225__auto____0 = (function (){
var statearr_27727 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_27727[(0)] = cljs$core$async$state_machine__26225__auto__);

(statearr_27727[(1)] = (1));

return statearr_27727;
});
var cljs$core$async$state_machine__26225__auto____1 = (function (state_27710){
while(true){
var ret_value__26226__auto__ = (function (){try{while(true){
var result__26227__auto__ = switch__26224__auto__.call(null,state_27710);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26227__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26227__auto__;
}
break;
}
}catch (e27728){if((e27728 instanceof Object)){
var ex__26228__auto__ = e27728;
var statearr_27729_27743 = state_27710;
(statearr_27729_27743[(5)] = ex__26228__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27710);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e27728;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26226__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27744 = state_27710;
state_27710 = G__27744;
continue;
} else {
return ret_value__26226__auto__;
}
break;
}
});
cljs$core$async$state_machine__26225__auto__ = function(state_27710){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__26225__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__26225__auto____1.call(this,state_27710);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__26225__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__26225__auto____0;
cljs$core$async$state_machine__26225__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__26225__auto____1;
return cljs$core$async$state_machine__26225__auto__;
})()
})();
var state__26321__auto__ = (function (){var statearr_27730 = f__26320__auto__.call(null);
(statearr_27730[(6)] = c__26319__auto___27732);

return statearr_27730;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26321__auto__);
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
return cljs.core.async.reduce.call(null,cljs.core.conj,coll,ch);
});
/**
 * Returns a channel that will return, at most, n items from ch. After n items
 * have been returned, or ch has been closed, the return chanel will close.
 * 
 *   The output channel is unbuffered by default, unless buf-or-n is given.
 */
cljs.core.async.take = (function cljs$core$async$take(var_args){
var G__27746 = arguments.length;
switch (G__27746) {
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
return cljs.core.async.take.call(null,n,ch,null);
}));

(cljs.core.async.take.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__26319__auto___27791 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26320__auto__ = (function (){var switch__26224__auto__ = (function (state_27770){
var state_val_27771 = (state_27770[(1)]);
if((state_val_27771 === (7))){
var inst_27752 = (state_27770[(7)]);
var inst_27752__$1 = (state_27770[(2)]);
var inst_27753 = (inst_27752__$1 == null);
var inst_27754 = cljs.core.not.call(null,inst_27753);
var state_27770__$1 = (function (){var statearr_27772 = state_27770;
(statearr_27772[(7)] = inst_27752__$1);

return statearr_27772;
})();
if(inst_27754){
var statearr_27773_27792 = state_27770__$1;
(statearr_27773_27792[(1)] = (8));

} else {
var statearr_27774_27793 = state_27770__$1;
(statearr_27774_27793[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27771 === (1))){
var inst_27747 = (0);
var state_27770__$1 = (function (){var statearr_27775 = state_27770;
(statearr_27775[(8)] = inst_27747);

return statearr_27775;
})();
var statearr_27776_27794 = state_27770__$1;
(statearr_27776_27794[(2)] = null);

(statearr_27776_27794[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27771 === (4))){
var state_27770__$1 = state_27770;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27770__$1,(7),ch);
} else {
if((state_val_27771 === (6))){
var inst_27765 = (state_27770[(2)]);
var state_27770__$1 = state_27770;
var statearr_27777_27795 = state_27770__$1;
(statearr_27777_27795[(2)] = inst_27765);

(statearr_27777_27795[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27771 === (3))){
var inst_27767 = (state_27770[(2)]);
var inst_27768 = cljs.core.async.close_BANG_.call(null,out);
var state_27770__$1 = (function (){var statearr_27778 = state_27770;
(statearr_27778[(9)] = inst_27767);

return statearr_27778;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_27770__$1,inst_27768);
} else {
if((state_val_27771 === (2))){
var inst_27747 = (state_27770[(8)]);
var inst_27749 = (inst_27747 < n);
var state_27770__$1 = state_27770;
if(cljs.core.truth_(inst_27749)){
var statearr_27779_27796 = state_27770__$1;
(statearr_27779_27796[(1)] = (4));

} else {
var statearr_27780_27797 = state_27770__$1;
(statearr_27780_27797[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27771 === (11))){
var inst_27747 = (state_27770[(8)]);
var inst_27757 = (state_27770[(2)]);
var inst_27758 = (inst_27747 + (1));
var inst_27747__$1 = inst_27758;
var state_27770__$1 = (function (){var statearr_27781 = state_27770;
(statearr_27781[(10)] = inst_27757);

(statearr_27781[(8)] = inst_27747__$1);

return statearr_27781;
})();
var statearr_27782_27798 = state_27770__$1;
(statearr_27782_27798[(2)] = null);

(statearr_27782_27798[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27771 === (9))){
var state_27770__$1 = state_27770;
var statearr_27783_27799 = state_27770__$1;
(statearr_27783_27799[(2)] = null);

(statearr_27783_27799[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27771 === (5))){
var state_27770__$1 = state_27770;
var statearr_27784_27800 = state_27770__$1;
(statearr_27784_27800[(2)] = null);

(statearr_27784_27800[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27771 === (10))){
var inst_27762 = (state_27770[(2)]);
var state_27770__$1 = state_27770;
var statearr_27785_27801 = state_27770__$1;
(statearr_27785_27801[(2)] = inst_27762);

(statearr_27785_27801[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27771 === (8))){
var inst_27752 = (state_27770[(7)]);
var state_27770__$1 = state_27770;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_27770__$1,(11),out,inst_27752);
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
var cljs$core$async$state_machine__26225__auto__ = null;
var cljs$core$async$state_machine__26225__auto____0 = (function (){
var statearr_27786 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_27786[(0)] = cljs$core$async$state_machine__26225__auto__);

(statearr_27786[(1)] = (1));

return statearr_27786;
});
var cljs$core$async$state_machine__26225__auto____1 = (function (state_27770){
while(true){
var ret_value__26226__auto__ = (function (){try{while(true){
var result__26227__auto__ = switch__26224__auto__.call(null,state_27770);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26227__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26227__auto__;
}
break;
}
}catch (e27787){if((e27787 instanceof Object)){
var ex__26228__auto__ = e27787;
var statearr_27788_27802 = state_27770;
(statearr_27788_27802[(5)] = ex__26228__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27770);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e27787;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26226__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27803 = state_27770;
state_27770 = G__27803;
continue;
} else {
return ret_value__26226__auto__;
}
break;
}
});
cljs$core$async$state_machine__26225__auto__ = function(state_27770){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__26225__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__26225__auto____1.call(this,state_27770);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__26225__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__26225__auto____0;
cljs$core$async$state_machine__26225__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__26225__auto____1;
return cljs$core$async$state_machine__26225__auto__;
})()
})();
var state__26321__auto__ = (function (){var statearr_27789 = f__26320__auto__.call(null);
(statearr_27789[(6)] = c__26319__auto___27791);

return statearr_27789;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26321__auto__);
}));


return out;
}));

(cljs.core.async.take.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_LT_ = (function cljs$core$async$map_LT_(f,ch){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async27805 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async27805 = (function (f,ch,meta27806){
this.f = f;
this.ch = ch;
this.meta27806 = meta27806;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async27805.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_27807,meta27806__$1){
var self__ = this;
var _27807__$1 = this;
return (new cljs.core.async.t_cljs$core$async27805(self__.f,self__.ch,meta27806__$1));
}));

(cljs.core.async.t_cljs$core$async27805.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_27807){
var self__ = this;
var _27807__$1 = this;
return self__.meta27806;
}));

(cljs.core.async.t_cljs$core$async27805.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async27805.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
}));

(cljs.core.async.t_cljs$core$async27805.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
}));

(cljs.core.async.t_cljs$core$async27805.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async27805.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,(function (){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async27808 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async27808 = (function (f,ch,meta27806,_,fn1,meta27809){
this.f = f;
this.ch = ch;
this.meta27806 = meta27806;
this._ = _;
this.fn1 = fn1;
this.meta27809 = meta27809;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async27808.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_27810,meta27809__$1){
var self__ = this;
var _27810__$1 = this;
return (new cljs.core.async.t_cljs$core$async27808(self__.f,self__.ch,self__.meta27806,self__._,self__.fn1,meta27809__$1));
}));

(cljs.core.async.t_cljs$core$async27808.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_27810){
var self__ = this;
var _27810__$1 = this;
return self__.meta27809;
}));

(cljs.core.async.t_cljs$core$async27808.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async27808.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.fn1);
}));

(cljs.core.async.t_cljs$core$async27808.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async27808.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
var f1 = cljs.core.async.impl.protocols.commit.call(null,self__.fn1);
return (function (p1__27804_SHARP_){
return f1.call(null,(((p1__27804_SHARP_ == null))?null:self__.f.call(null,p1__27804_SHARP_)));
});
}));

(cljs.core.async.t_cljs$core$async27808.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta27806","meta27806",1338367866,null),cljs.core.with_meta(new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol("cljs.core.async","t_cljs$core$async27805","cljs.core.async/t_cljs$core$async27805",-1524347454,null)], null)),new cljs.core.Symbol(null,"fn1","fn1",895834444,null),new cljs.core.Symbol(null,"meta27809","meta27809",-548095230,null)], null);
}));

(cljs.core.async.t_cljs$core$async27808.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async27808.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async27808");

(cljs.core.async.t_cljs$core$async27808.cljs$lang$ctorPrWriter = (function (this__4428__auto__,writer__4429__auto__,opt__4430__auto__){
return cljs.core._write.call(null,writer__4429__auto__,"cljs.core.async/t_cljs$core$async27808");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async27808.
 */
cljs.core.async.__GT_t_cljs$core$async27808 = (function cljs$core$async$map_LT__$___GT_t_cljs$core$async27808(f__$1,ch__$1,meta27806__$1,___$2,fn1__$1,meta27809){
return (new cljs.core.async.t_cljs$core$async27808(f__$1,ch__$1,meta27806__$1,___$2,fn1__$1,meta27809));
});

}

return (new cljs.core.async.t_cljs$core$async27808(self__.f,self__.ch,self__.meta27806,___$1,fn1,cljs.core.PersistentArrayMap.EMPTY));
})()
);
if(cljs.core.truth_((function (){var and__4174__auto__ = ret;
if(cljs.core.truth_(and__4174__auto__)){
return (!((cljs.core.deref.call(null,ret) == null)));
} else {
return and__4174__auto__;
}
})())){
return cljs.core.async.impl.channels.box.call(null,self__.f.call(null,cljs.core.deref.call(null,ret)));
} else {
return ret;
}
}));

(cljs.core.async.t_cljs$core$async27805.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async27805.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
}));

(cljs.core.async.t_cljs$core$async27805.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta27806","meta27806",1338367866,null)], null);
}));

(cljs.core.async.t_cljs$core$async27805.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async27805.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async27805");

(cljs.core.async.t_cljs$core$async27805.cljs$lang$ctorPrWriter = (function (this__4428__auto__,writer__4429__auto__,opt__4430__auto__){
return cljs.core._write.call(null,writer__4429__auto__,"cljs.core.async/t_cljs$core$async27805");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async27805.
 */
cljs.core.async.__GT_t_cljs$core$async27805 = (function cljs$core$async$map_LT__$___GT_t_cljs$core$async27805(f__$1,ch__$1,meta27806){
return (new cljs.core.async.t_cljs$core$async27805(f__$1,ch__$1,meta27806));
});

}

return (new cljs.core.async.t_cljs$core$async27805(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_GT_ = (function cljs$core$async$map_GT_(f,ch){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async27811 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async27811 = (function (f,ch,meta27812){
this.f = f;
this.ch = ch;
this.meta27812 = meta27812;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async27811.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_27813,meta27812__$1){
var self__ = this;
var _27813__$1 = this;
return (new cljs.core.async.t_cljs$core$async27811(self__.f,self__.ch,meta27812__$1));
}));

(cljs.core.async.t_cljs$core$async27811.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_27813){
var self__ = this;
var _27813__$1 = this;
return self__.meta27812;
}));

(cljs.core.async.t_cljs$core$async27811.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async27811.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
}));

(cljs.core.async.t_cljs$core$async27811.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async27811.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
}));

(cljs.core.async.t_cljs$core$async27811.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async27811.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,self__.f.call(null,val),fn1);
}));

(cljs.core.async.t_cljs$core$async27811.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta27812","meta27812",-838787120,null)], null);
}));

(cljs.core.async.t_cljs$core$async27811.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async27811.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async27811");

(cljs.core.async.t_cljs$core$async27811.cljs$lang$ctorPrWriter = (function (this__4428__auto__,writer__4429__auto__,opt__4430__auto__){
return cljs.core._write.call(null,writer__4429__auto__,"cljs.core.async/t_cljs$core$async27811");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async27811.
 */
cljs.core.async.__GT_t_cljs$core$async27811 = (function cljs$core$async$map_GT__$___GT_t_cljs$core$async27811(f__$1,ch__$1,meta27812){
return (new cljs.core.async.t_cljs$core$async27811(f__$1,ch__$1,meta27812));
});

}

return (new cljs.core.async.t_cljs$core$async27811(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_GT_ = (function cljs$core$async$filter_GT_(p,ch){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async27814 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async27814 = (function (p,ch,meta27815){
this.p = p;
this.ch = ch;
this.meta27815 = meta27815;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async27814.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_27816,meta27815__$1){
var self__ = this;
var _27816__$1 = this;
return (new cljs.core.async.t_cljs$core$async27814(self__.p,self__.ch,meta27815__$1));
}));

(cljs.core.async.t_cljs$core$async27814.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_27816){
var self__ = this;
var _27816__$1 = this;
return self__.meta27815;
}));

(cljs.core.async.t_cljs$core$async27814.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async27814.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
}));

(cljs.core.async.t_cljs$core$async27814.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
}));

(cljs.core.async.t_cljs$core$async27814.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async27814.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
}));

(cljs.core.async.t_cljs$core$async27814.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async27814.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.p.call(null,val))){
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
} else {
return cljs.core.async.impl.channels.box.call(null,cljs.core.not.call(null,cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch)));
}
}));

(cljs.core.async.t_cljs$core$async27814.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta27815","meta27815",-496751264,null)], null);
}));

(cljs.core.async.t_cljs$core$async27814.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async27814.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async27814");

(cljs.core.async.t_cljs$core$async27814.cljs$lang$ctorPrWriter = (function (this__4428__auto__,writer__4429__auto__,opt__4430__auto__){
return cljs.core._write.call(null,writer__4429__auto__,"cljs.core.async/t_cljs$core$async27814");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async27814.
 */
cljs.core.async.__GT_t_cljs$core$async27814 = (function cljs$core$async$filter_GT__$___GT_t_cljs$core$async27814(p__$1,ch__$1,meta27815){
return (new cljs.core.async.t_cljs$core$async27814(p__$1,ch__$1,meta27815));
});

}

return (new cljs.core.async.t_cljs$core$async27814(p,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_GT_ = (function cljs$core$async$remove_GT_(p,ch){
return cljs.core.async.filter_GT_.call(null,cljs.core.complement.call(null,p),ch);
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_LT_ = (function cljs$core$async$filter_LT_(var_args){
var G__27818 = arguments.length;
switch (G__27818) {
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
return cljs.core.async.filter_LT_.call(null,p,ch,null);
}));

(cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__26319__auto___27858 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26320__auto__ = (function (){var switch__26224__auto__ = (function (state_27839){
var state_val_27840 = (state_27839[(1)]);
if((state_val_27840 === (7))){
var inst_27835 = (state_27839[(2)]);
var state_27839__$1 = state_27839;
var statearr_27841_27859 = state_27839__$1;
(statearr_27841_27859[(2)] = inst_27835);

(statearr_27841_27859[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27840 === (1))){
var state_27839__$1 = state_27839;
var statearr_27842_27860 = state_27839__$1;
(statearr_27842_27860[(2)] = null);

(statearr_27842_27860[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27840 === (4))){
var inst_27821 = (state_27839[(7)]);
var inst_27821__$1 = (state_27839[(2)]);
var inst_27822 = (inst_27821__$1 == null);
var state_27839__$1 = (function (){var statearr_27843 = state_27839;
(statearr_27843[(7)] = inst_27821__$1);

return statearr_27843;
})();
if(cljs.core.truth_(inst_27822)){
var statearr_27844_27861 = state_27839__$1;
(statearr_27844_27861[(1)] = (5));

} else {
var statearr_27845_27862 = state_27839__$1;
(statearr_27845_27862[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27840 === (6))){
var inst_27821 = (state_27839[(7)]);
var inst_27826 = p.call(null,inst_27821);
var state_27839__$1 = state_27839;
if(cljs.core.truth_(inst_27826)){
var statearr_27846_27863 = state_27839__$1;
(statearr_27846_27863[(1)] = (8));

} else {
var statearr_27847_27864 = state_27839__$1;
(statearr_27847_27864[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27840 === (3))){
var inst_27837 = (state_27839[(2)]);
var state_27839__$1 = state_27839;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_27839__$1,inst_27837);
} else {
if((state_val_27840 === (2))){
var state_27839__$1 = state_27839;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27839__$1,(4),ch);
} else {
if((state_val_27840 === (11))){
var inst_27829 = (state_27839[(2)]);
var state_27839__$1 = state_27839;
var statearr_27848_27865 = state_27839__$1;
(statearr_27848_27865[(2)] = inst_27829);

(statearr_27848_27865[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27840 === (9))){
var state_27839__$1 = state_27839;
var statearr_27849_27866 = state_27839__$1;
(statearr_27849_27866[(2)] = null);

(statearr_27849_27866[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27840 === (5))){
var inst_27824 = cljs.core.async.close_BANG_.call(null,out);
var state_27839__$1 = state_27839;
var statearr_27850_27867 = state_27839__$1;
(statearr_27850_27867[(2)] = inst_27824);

(statearr_27850_27867[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27840 === (10))){
var inst_27832 = (state_27839[(2)]);
var state_27839__$1 = (function (){var statearr_27851 = state_27839;
(statearr_27851[(8)] = inst_27832);

return statearr_27851;
})();
var statearr_27852_27868 = state_27839__$1;
(statearr_27852_27868[(2)] = null);

(statearr_27852_27868[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27840 === (8))){
var inst_27821 = (state_27839[(7)]);
var state_27839__$1 = state_27839;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_27839__$1,(11),out,inst_27821);
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
var cljs$core$async$state_machine__26225__auto__ = null;
var cljs$core$async$state_machine__26225__auto____0 = (function (){
var statearr_27853 = [null,null,null,null,null,null,null,null,null];
(statearr_27853[(0)] = cljs$core$async$state_machine__26225__auto__);

(statearr_27853[(1)] = (1));

return statearr_27853;
});
var cljs$core$async$state_machine__26225__auto____1 = (function (state_27839){
while(true){
var ret_value__26226__auto__ = (function (){try{while(true){
var result__26227__auto__ = switch__26224__auto__.call(null,state_27839);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26227__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26227__auto__;
}
break;
}
}catch (e27854){if((e27854 instanceof Object)){
var ex__26228__auto__ = e27854;
var statearr_27855_27869 = state_27839;
(statearr_27855_27869[(5)] = ex__26228__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27839);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e27854;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26226__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27870 = state_27839;
state_27839 = G__27870;
continue;
} else {
return ret_value__26226__auto__;
}
break;
}
});
cljs$core$async$state_machine__26225__auto__ = function(state_27839){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__26225__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__26225__auto____1.call(this,state_27839);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__26225__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__26225__auto____0;
cljs$core$async$state_machine__26225__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__26225__auto____1;
return cljs$core$async$state_machine__26225__auto__;
})()
})();
var state__26321__auto__ = (function (){var statearr_27856 = f__26320__auto__.call(null);
(statearr_27856[(6)] = c__26319__auto___27858);

return statearr_27856;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26321__auto__);
}));


return out;
}));

(cljs.core.async.filter_LT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_LT_ = (function cljs$core$async$remove_LT_(var_args){
var G__27872 = arguments.length;
switch (G__27872) {
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
return cljs.core.async.remove_LT_.call(null,p,ch,null);
}));

(cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
return cljs.core.async.filter_LT_.call(null,cljs.core.complement.call(null,p),ch,buf_or_n);
}));

(cljs.core.async.remove_LT_.cljs$lang$maxFixedArity = 3);

cljs.core.async.mapcat_STAR_ = (function cljs$core$async$mapcat_STAR_(f,in$,out){
var c__26319__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26320__auto__ = (function (){var switch__26224__auto__ = (function (state_27935){
var state_val_27936 = (state_27935[(1)]);
if((state_val_27936 === (7))){
var inst_27931 = (state_27935[(2)]);
var state_27935__$1 = state_27935;
var statearr_27937_27975 = state_27935__$1;
(statearr_27937_27975[(2)] = inst_27931);

(statearr_27937_27975[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27936 === (20))){
var inst_27901 = (state_27935[(7)]);
var inst_27912 = (state_27935[(2)]);
var inst_27913 = cljs.core.next.call(null,inst_27901);
var inst_27887 = inst_27913;
var inst_27888 = null;
var inst_27889 = (0);
var inst_27890 = (0);
var state_27935__$1 = (function (){var statearr_27938 = state_27935;
(statearr_27938[(8)] = inst_27889);

(statearr_27938[(9)] = inst_27887);

(statearr_27938[(10)] = inst_27912);

(statearr_27938[(11)] = inst_27890);

(statearr_27938[(12)] = inst_27888);

return statearr_27938;
})();
var statearr_27939_27976 = state_27935__$1;
(statearr_27939_27976[(2)] = null);

(statearr_27939_27976[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27936 === (1))){
var state_27935__$1 = state_27935;
var statearr_27940_27977 = state_27935__$1;
(statearr_27940_27977[(2)] = null);

(statearr_27940_27977[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27936 === (4))){
var inst_27876 = (state_27935[(13)]);
var inst_27876__$1 = (state_27935[(2)]);
var inst_27877 = (inst_27876__$1 == null);
var state_27935__$1 = (function (){var statearr_27941 = state_27935;
(statearr_27941[(13)] = inst_27876__$1);

return statearr_27941;
})();
if(cljs.core.truth_(inst_27877)){
var statearr_27942_27978 = state_27935__$1;
(statearr_27942_27978[(1)] = (5));

} else {
var statearr_27943_27979 = state_27935__$1;
(statearr_27943_27979[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27936 === (15))){
var state_27935__$1 = state_27935;
var statearr_27947_27980 = state_27935__$1;
(statearr_27947_27980[(2)] = null);

(statearr_27947_27980[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27936 === (21))){
var state_27935__$1 = state_27935;
var statearr_27948_27981 = state_27935__$1;
(statearr_27948_27981[(2)] = null);

(statearr_27948_27981[(1)] = (23));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27936 === (13))){
var inst_27889 = (state_27935[(8)]);
var inst_27887 = (state_27935[(9)]);
var inst_27890 = (state_27935[(11)]);
var inst_27888 = (state_27935[(12)]);
var inst_27897 = (state_27935[(2)]);
var inst_27898 = (inst_27890 + (1));
var tmp27944 = inst_27889;
var tmp27945 = inst_27887;
var tmp27946 = inst_27888;
var inst_27887__$1 = tmp27945;
var inst_27888__$1 = tmp27946;
var inst_27889__$1 = tmp27944;
var inst_27890__$1 = inst_27898;
var state_27935__$1 = (function (){var statearr_27949 = state_27935;
(statearr_27949[(8)] = inst_27889__$1);

(statearr_27949[(9)] = inst_27887__$1);

(statearr_27949[(11)] = inst_27890__$1);

(statearr_27949[(14)] = inst_27897);

(statearr_27949[(12)] = inst_27888__$1);

return statearr_27949;
})();
var statearr_27950_27982 = state_27935__$1;
(statearr_27950_27982[(2)] = null);

(statearr_27950_27982[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27936 === (22))){
var state_27935__$1 = state_27935;
var statearr_27951_27983 = state_27935__$1;
(statearr_27951_27983[(2)] = null);

(statearr_27951_27983[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27936 === (6))){
var inst_27876 = (state_27935[(13)]);
var inst_27885 = f.call(null,inst_27876);
var inst_27886 = cljs.core.seq.call(null,inst_27885);
var inst_27887 = inst_27886;
var inst_27888 = null;
var inst_27889 = (0);
var inst_27890 = (0);
var state_27935__$1 = (function (){var statearr_27952 = state_27935;
(statearr_27952[(8)] = inst_27889);

(statearr_27952[(9)] = inst_27887);

(statearr_27952[(11)] = inst_27890);

(statearr_27952[(12)] = inst_27888);

return statearr_27952;
})();
var statearr_27953_27984 = state_27935__$1;
(statearr_27953_27984[(2)] = null);

(statearr_27953_27984[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27936 === (17))){
var inst_27901 = (state_27935[(7)]);
var inst_27905 = cljs.core.chunk_first.call(null,inst_27901);
var inst_27906 = cljs.core.chunk_rest.call(null,inst_27901);
var inst_27907 = cljs.core.count.call(null,inst_27905);
var inst_27887 = inst_27906;
var inst_27888 = inst_27905;
var inst_27889 = inst_27907;
var inst_27890 = (0);
var state_27935__$1 = (function (){var statearr_27954 = state_27935;
(statearr_27954[(8)] = inst_27889);

(statearr_27954[(9)] = inst_27887);

(statearr_27954[(11)] = inst_27890);

(statearr_27954[(12)] = inst_27888);

return statearr_27954;
})();
var statearr_27955_27985 = state_27935__$1;
(statearr_27955_27985[(2)] = null);

(statearr_27955_27985[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27936 === (3))){
var inst_27933 = (state_27935[(2)]);
var state_27935__$1 = state_27935;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_27935__$1,inst_27933);
} else {
if((state_val_27936 === (12))){
var inst_27921 = (state_27935[(2)]);
var state_27935__$1 = state_27935;
var statearr_27956_27986 = state_27935__$1;
(statearr_27956_27986[(2)] = inst_27921);

(statearr_27956_27986[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27936 === (2))){
var state_27935__$1 = state_27935;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27935__$1,(4),in$);
} else {
if((state_val_27936 === (23))){
var inst_27929 = (state_27935[(2)]);
var state_27935__$1 = state_27935;
var statearr_27957_27987 = state_27935__$1;
(statearr_27957_27987[(2)] = inst_27929);

(statearr_27957_27987[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27936 === (19))){
var inst_27916 = (state_27935[(2)]);
var state_27935__$1 = state_27935;
var statearr_27958_27988 = state_27935__$1;
(statearr_27958_27988[(2)] = inst_27916);

(statearr_27958_27988[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27936 === (11))){
var inst_27887 = (state_27935[(9)]);
var inst_27901 = (state_27935[(7)]);
var inst_27901__$1 = cljs.core.seq.call(null,inst_27887);
var state_27935__$1 = (function (){var statearr_27959 = state_27935;
(statearr_27959[(7)] = inst_27901__$1);

return statearr_27959;
})();
if(inst_27901__$1){
var statearr_27960_27989 = state_27935__$1;
(statearr_27960_27989[(1)] = (14));

} else {
var statearr_27961_27990 = state_27935__$1;
(statearr_27961_27990[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27936 === (9))){
var inst_27923 = (state_27935[(2)]);
var inst_27924 = cljs.core.async.impl.protocols.closed_QMARK_.call(null,out);
var state_27935__$1 = (function (){var statearr_27962 = state_27935;
(statearr_27962[(15)] = inst_27923);

return statearr_27962;
})();
if(cljs.core.truth_(inst_27924)){
var statearr_27963_27991 = state_27935__$1;
(statearr_27963_27991[(1)] = (21));

} else {
var statearr_27964_27992 = state_27935__$1;
(statearr_27964_27992[(1)] = (22));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27936 === (5))){
var inst_27879 = cljs.core.async.close_BANG_.call(null,out);
var state_27935__$1 = state_27935;
var statearr_27965_27993 = state_27935__$1;
(statearr_27965_27993[(2)] = inst_27879);

(statearr_27965_27993[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27936 === (14))){
var inst_27901 = (state_27935[(7)]);
var inst_27903 = cljs.core.chunked_seq_QMARK_.call(null,inst_27901);
var state_27935__$1 = state_27935;
if(inst_27903){
var statearr_27966_27994 = state_27935__$1;
(statearr_27966_27994[(1)] = (17));

} else {
var statearr_27967_27995 = state_27935__$1;
(statearr_27967_27995[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27936 === (16))){
var inst_27919 = (state_27935[(2)]);
var state_27935__$1 = state_27935;
var statearr_27968_27996 = state_27935__$1;
(statearr_27968_27996[(2)] = inst_27919);

(statearr_27968_27996[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27936 === (10))){
var inst_27890 = (state_27935[(11)]);
var inst_27888 = (state_27935[(12)]);
var inst_27895 = cljs.core._nth.call(null,inst_27888,inst_27890);
var state_27935__$1 = state_27935;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_27935__$1,(13),out,inst_27895);
} else {
if((state_val_27936 === (18))){
var inst_27901 = (state_27935[(7)]);
var inst_27910 = cljs.core.first.call(null,inst_27901);
var state_27935__$1 = state_27935;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_27935__$1,(20),out,inst_27910);
} else {
if((state_val_27936 === (8))){
var inst_27889 = (state_27935[(8)]);
var inst_27890 = (state_27935[(11)]);
var inst_27892 = (inst_27890 < inst_27889);
var inst_27893 = inst_27892;
var state_27935__$1 = state_27935;
if(cljs.core.truth_(inst_27893)){
var statearr_27969_27997 = state_27935__$1;
(statearr_27969_27997[(1)] = (10));

} else {
var statearr_27970_27998 = state_27935__$1;
(statearr_27970_27998[(1)] = (11));

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
var cljs$core$async$mapcat_STAR__$_state_machine__26225__auto__ = null;
var cljs$core$async$mapcat_STAR__$_state_machine__26225__auto____0 = (function (){
var statearr_27971 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_27971[(0)] = cljs$core$async$mapcat_STAR__$_state_machine__26225__auto__);

(statearr_27971[(1)] = (1));

return statearr_27971;
});
var cljs$core$async$mapcat_STAR__$_state_machine__26225__auto____1 = (function (state_27935){
while(true){
var ret_value__26226__auto__ = (function (){try{while(true){
var result__26227__auto__ = switch__26224__auto__.call(null,state_27935);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26227__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26227__auto__;
}
break;
}
}catch (e27972){if((e27972 instanceof Object)){
var ex__26228__auto__ = e27972;
var statearr_27973_27999 = state_27935;
(statearr_27973_27999[(5)] = ex__26228__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27935);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e27972;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26226__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__28000 = state_27935;
state_27935 = G__28000;
continue;
} else {
return ret_value__26226__auto__;
}
break;
}
});
cljs$core$async$mapcat_STAR__$_state_machine__26225__auto__ = function(state_27935){
switch(arguments.length){
case 0:
return cljs$core$async$mapcat_STAR__$_state_machine__26225__auto____0.call(this);
case 1:
return cljs$core$async$mapcat_STAR__$_state_machine__26225__auto____1.call(this,state_27935);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mapcat_STAR__$_state_machine__26225__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mapcat_STAR__$_state_machine__26225__auto____0;
cljs$core$async$mapcat_STAR__$_state_machine__26225__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mapcat_STAR__$_state_machine__26225__auto____1;
return cljs$core$async$mapcat_STAR__$_state_machine__26225__auto__;
})()
})();
var state__26321__auto__ = (function (){var statearr_27974 = f__26320__auto__.call(null);
(statearr_27974[(6)] = c__26319__auto__);

return statearr_27974;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26321__auto__);
}));

return c__26319__auto__;
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_LT_ = (function cljs$core$async$mapcat_LT_(var_args){
var G__28002 = arguments.length;
switch (G__28002) {
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
return cljs.core.async.mapcat_LT_.call(null,f,in$,null);
}));

(cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3 = (function (f,in$,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
cljs.core.async.mapcat_STAR_.call(null,f,in$,out);

return out;
}));

(cljs.core.async.mapcat_LT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_GT_ = (function cljs$core$async$mapcat_GT_(var_args){
var G__28005 = arguments.length;
switch (G__28005) {
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
return cljs.core.async.mapcat_GT_.call(null,f,out,null);
}));

(cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3 = (function (f,out,buf_or_n){
var in$ = cljs.core.async.chan.call(null,buf_or_n);
cljs.core.async.mapcat_STAR_.call(null,f,in$,out);

return in$;
}));

(cljs.core.async.mapcat_GT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.unique = (function cljs$core$async$unique(var_args){
var G__28008 = arguments.length;
switch (G__28008) {
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
return cljs.core.async.unique.call(null,ch,null);
}));

(cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2 = (function (ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__26319__auto___28055 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26320__auto__ = (function (){var switch__26224__auto__ = (function (state_28032){
var state_val_28033 = (state_28032[(1)]);
if((state_val_28033 === (7))){
var inst_28027 = (state_28032[(2)]);
var state_28032__$1 = state_28032;
var statearr_28034_28056 = state_28032__$1;
(statearr_28034_28056[(2)] = inst_28027);

(statearr_28034_28056[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28033 === (1))){
var inst_28009 = null;
var state_28032__$1 = (function (){var statearr_28035 = state_28032;
(statearr_28035[(7)] = inst_28009);

return statearr_28035;
})();
var statearr_28036_28057 = state_28032__$1;
(statearr_28036_28057[(2)] = null);

(statearr_28036_28057[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28033 === (4))){
var inst_28012 = (state_28032[(8)]);
var inst_28012__$1 = (state_28032[(2)]);
var inst_28013 = (inst_28012__$1 == null);
var inst_28014 = cljs.core.not.call(null,inst_28013);
var state_28032__$1 = (function (){var statearr_28037 = state_28032;
(statearr_28037[(8)] = inst_28012__$1);

return statearr_28037;
})();
if(inst_28014){
var statearr_28038_28058 = state_28032__$1;
(statearr_28038_28058[(1)] = (5));

} else {
var statearr_28039_28059 = state_28032__$1;
(statearr_28039_28059[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28033 === (6))){
var state_28032__$1 = state_28032;
var statearr_28040_28060 = state_28032__$1;
(statearr_28040_28060[(2)] = null);

(statearr_28040_28060[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28033 === (3))){
var inst_28029 = (state_28032[(2)]);
var inst_28030 = cljs.core.async.close_BANG_.call(null,out);
var state_28032__$1 = (function (){var statearr_28041 = state_28032;
(statearr_28041[(9)] = inst_28029);

return statearr_28041;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_28032__$1,inst_28030);
} else {
if((state_val_28033 === (2))){
var state_28032__$1 = state_28032;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_28032__$1,(4),ch);
} else {
if((state_val_28033 === (11))){
var inst_28012 = (state_28032[(8)]);
var inst_28021 = (state_28032[(2)]);
var inst_28009 = inst_28012;
var state_28032__$1 = (function (){var statearr_28042 = state_28032;
(statearr_28042[(7)] = inst_28009);

(statearr_28042[(10)] = inst_28021);

return statearr_28042;
})();
var statearr_28043_28061 = state_28032__$1;
(statearr_28043_28061[(2)] = null);

(statearr_28043_28061[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28033 === (9))){
var inst_28012 = (state_28032[(8)]);
var state_28032__$1 = state_28032;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_28032__$1,(11),out,inst_28012);
} else {
if((state_val_28033 === (5))){
var inst_28009 = (state_28032[(7)]);
var inst_28012 = (state_28032[(8)]);
var inst_28016 = cljs.core._EQ_.call(null,inst_28012,inst_28009);
var state_28032__$1 = state_28032;
if(inst_28016){
var statearr_28045_28062 = state_28032__$1;
(statearr_28045_28062[(1)] = (8));

} else {
var statearr_28046_28063 = state_28032__$1;
(statearr_28046_28063[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28033 === (10))){
var inst_28024 = (state_28032[(2)]);
var state_28032__$1 = state_28032;
var statearr_28047_28064 = state_28032__$1;
(statearr_28047_28064[(2)] = inst_28024);

(statearr_28047_28064[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28033 === (8))){
var inst_28009 = (state_28032[(7)]);
var tmp28044 = inst_28009;
var inst_28009__$1 = tmp28044;
var state_28032__$1 = (function (){var statearr_28048 = state_28032;
(statearr_28048[(7)] = inst_28009__$1);

return statearr_28048;
})();
var statearr_28049_28065 = state_28032__$1;
(statearr_28049_28065[(2)] = null);

(statearr_28049_28065[(1)] = (2));


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
var cljs$core$async$state_machine__26225__auto__ = null;
var cljs$core$async$state_machine__26225__auto____0 = (function (){
var statearr_28050 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_28050[(0)] = cljs$core$async$state_machine__26225__auto__);

(statearr_28050[(1)] = (1));

return statearr_28050;
});
var cljs$core$async$state_machine__26225__auto____1 = (function (state_28032){
while(true){
var ret_value__26226__auto__ = (function (){try{while(true){
var result__26227__auto__ = switch__26224__auto__.call(null,state_28032);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26227__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26227__auto__;
}
break;
}
}catch (e28051){if((e28051 instanceof Object)){
var ex__26228__auto__ = e28051;
var statearr_28052_28066 = state_28032;
(statearr_28052_28066[(5)] = ex__26228__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_28032);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e28051;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26226__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__28067 = state_28032;
state_28032 = G__28067;
continue;
} else {
return ret_value__26226__auto__;
}
break;
}
});
cljs$core$async$state_machine__26225__auto__ = function(state_28032){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__26225__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__26225__auto____1.call(this,state_28032);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__26225__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__26225__auto____0;
cljs$core$async$state_machine__26225__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__26225__auto____1;
return cljs$core$async$state_machine__26225__auto__;
})()
})();
var state__26321__auto__ = (function (){var statearr_28053 = f__26320__auto__.call(null);
(statearr_28053[(6)] = c__26319__auto___28055);

return statearr_28053;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26321__auto__);
}));


return out;
}));

(cljs.core.async.unique.cljs$lang$maxFixedArity = 2);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition = (function cljs$core$async$partition(var_args){
var G__28069 = arguments.length;
switch (G__28069) {
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
return cljs.core.async.partition.call(null,n,ch,null);
}));

(cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__26319__auto___28135 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26320__auto__ = (function (){var switch__26224__auto__ = (function (state_28107){
var state_val_28108 = (state_28107[(1)]);
if((state_val_28108 === (7))){
var inst_28103 = (state_28107[(2)]);
var state_28107__$1 = state_28107;
var statearr_28109_28136 = state_28107__$1;
(statearr_28109_28136[(2)] = inst_28103);

(statearr_28109_28136[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28108 === (1))){
var inst_28070 = (new Array(n));
var inst_28071 = inst_28070;
var inst_28072 = (0);
var state_28107__$1 = (function (){var statearr_28110 = state_28107;
(statearr_28110[(7)] = inst_28071);

(statearr_28110[(8)] = inst_28072);

return statearr_28110;
})();
var statearr_28111_28137 = state_28107__$1;
(statearr_28111_28137[(2)] = null);

(statearr_28111_28137[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28108 === (4))){
var inst_28075 = (state_28107[(9)]);
var inst_28075__$1 = (state_28107[(2)]);
var inst_28076 = (inst_28075__$1 == null);
var inst_28077 = cljs.core.not.call(null,inst_28076);
var state_28107__$1 = (function (){var statearr_28112 = state_28107;
(statearr_28112[(9)] = inst_28075__$1);

return statearr_28112;
})();
if(inst_28077){
var statearr_28113_28138 = state_28107__$1;
(statearr_28113_28138[(1)] = (5));

} else {
var statearr_28114_28139 = state_28107__$1;
(statearr_28114_28139[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28108 === (15))){
var inst_28097 = (state_28107[(2)]);
var state_28107__$1 = state_28107;
var statearr_28115_28140 = state_28107__$1;
(statearr_28115_28140[(2)] = inst_28097);

(statearr_28115_28140[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28108 === (13))){
var state_28107__$1 = state_28107;
var statearr_28116_28141 = state_28107__$1;
(statearr_28116_28141[(2)] = null);

(statearr_28116_28141[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28108 === (6))){
var inst_28072 = (state_28107[(8)]);
var inst_28093 = (inst_28072 > (0));
var state_28107__$1 = state_28107;
if(cljs.core.truth_(inst_28093)){
var statearr_28117_28142 = state_28107__$1;
(statearr_28117_28142[(1)] = (12));

} else {
var statearr_28118_28143 = state_28107__$1;
(statearr_28118_28143[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28108 === (3))){
var inst_28105 = (state_28107[(2)]);
var state_28107__$1 = state_28107;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_28107__$1,inst_28105);
} else {
if((state_val_28108 === (12))){
var inst_28071 = (state_28107[(7)]);
var inst_28095 = cljs.core.vec.call(null,inst_28071);
var state_28107__$1 = state_28107;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_28107__$1,(15),out,inst_28095);
} else {
if((state_val_28108 === (2))){
var state_28107__$1 = state_28107;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_28107__$1,(4),ch);
} else {
if((state_val_28108 === (11))){
var inst_28087 = (state_28107[(2)]);
var inst_28088 = (new Array(n));
var inst_28071 = inst_28088;
var inst_28072 = (0);
var state_28107__$1 = (function (){var statearr_28119 = state_28107;
(statearr_28119[(7)] = inst_28071);

(statearr_28119[(10)] = inst_28087);

(statearr_28119[(8)] = inst_28072);

return statearr_28119;
})();
var statearr_28120_28144 = state_28107__$1;
(statearr_28120_28144[(2)] = null);

(statearr_28120_28144[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28108 === (9))){
var inst_28071 = (state_28107[(7)]);
var inst_28085 = cljs.core.vec.call(null,inst_28071);
var state_28107__$1 = state_28107;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_28107__$1,(11),out,inst_28085);
} else {
if((state_val_28108 === (5))){
var inst_28071 = (state_28107[(7)]);
var inst_28080 = (state_28107[(11)]);
var inst_28075 = (state_28107[(9)]);
var inst_28072 = (state_28107[(8)]);
var inst_28079 = (inst_28071[inst_28072] = inst_28075);
var inst_28080__$1 = (inst_28072 + (1));
var inst_28081 = (inst_28080__$1 < n);
var state_28107__$1 = (function (){var statearr_28121 = state_28107;
(statearr_28121[(11)] = inst_28080__$1);

(statearr_28121[(12)] = inst_28079);

return statearr_28121;
})();
if(cljs.core.truth_(inst_28081)){
var statearr_28122_28145 = state_28107__$1;
(statearr_28122_28145[(1)] = (8));

} else {
var statearr_28123_28146 = state_28107__$1;
(statearr_28123_28146[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28108 === (14))){
var inst_28100 = (state_28107[(2)]);
var inst_28101 = cljs.core.async.close_BANG_.call(null,out);
var state_28107__$1 = (function (){var statearr_28125 = state_28107;
(statearr_28125[(13)] = inst_28100);

return statearr_28125;
})();
var statearr_28126_28147 = state_28107__$1;
(statearr_28126_28147[(2)] = inst_28101);

(statearr_28126_28147[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28108 === (10))){
var inst_28091 = (state_28107[(2)]);
var state_28107__$1 = state_28107;
var statearr_28127_28148 = state_28107__$1;
(statearr_28127_28148[(2)] = inst_28091);

(statearr_28127_28148[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28108 === (8))){
var inst_28071 = (state_28107[(7)]);
var inst_28080 = (state_28107[(11)]);
var tmp28124 = inst_28071;
var inst_28071__$1 = tmp28124;
var inst_28072 = inst_28080;
var state_28107__$1 = (function (){var statearr_28128 = state_28107;
(statearr_28128[(7)] = inst_28071__$1);

(statearr_28128[(8)] = inst_28072);

return statearr_28128;
})();
var statearr_28129_28149 = state_28107__$1;
(statearr_28129_28149[(2)] = null);

(statearr_28129_28149[(1)] = (2));


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
var cljs$core$async$state_machine__26225__auto__ = null;
var cljs$core$async$state_machine__26225__auto____0 = (function (){
var statearr_28130 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_28130[(0)] = cljs$core$async$state_machine__26225__auto__);

(statearr_28130[(1)] = (1));

return statearr_28130;
});
var cljs$core$async$state_machine__26225__auto____1 = (function (state_28107){
while(true){
var ret_value__26226__auto__ = (function (){try{while(true){
var result__26227__auto__ = switch__26224__auto__.call(null,state_28107);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26227__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26227__auto__;
}
break;
}
}catch (e28131){if((e28131 instanceof Object)){
var ex__26228__auto__ = e28131;
var statearr_28132_28150 = state_28107;
(statearr_28132_28150[(5)] = ex__26228__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_28107);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e28131;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26226__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__28151 = state_28107;
state_28107 = G__28151;
continue;
} else {
return ret_value__26226__auto__;
}
break;
}
});
cljs$core$async$state_machine__26225__auto__ = function(state_28107){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__26225__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__26225__auto____1.call(this,state_28107);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__26225__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__26225__auto____0;
cljs$core$async$state_machine__26225__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__26225__auto____1;
return cljs$core$async$state_machine__26225__auto__;
})()
})();
var state__26321__auto__ = (function (){var statearr_28133 = f__26320__auto__.call(null);
(statearr_28133[(6)] = c__26319__auto___28135);

return statearr_28133;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26321__auto__);
}));


return out;
}));

(cljs.core.async.partition.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition_by = (function cljs$core$async$partition_by(var_args){
var G__28153 = arguments.length;
switch (G__28153) {
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
return cljs.core.async.partition_by.call(null,f,ch,null);
}));

(cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3 = (function (f,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__26319__auto___28223 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26320__auto__ = (function (){var switch__26224__auto__ = (function (state_28195){
var state_val_28196 = (state_28195[(1)]);
if((state_val_28196 === (7))){
var inst_28191 = (state_28195[(2)]);
var state_28195__$1 = state_28195;
var statearr_28197_28224 = state_28195__$1;
(statearr_28197_28224[(2)] = inst_28191);

(statearr_28197_28224[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28196 === (1))){
var inst_28154 = [];
var inst_28155 = inst_28154;
var inst_28156 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123);
var state_28195__$1 = (function (){var statearr_28198 = state_28195;
(statearr_28198[(7)] = inst_28155);

(statearr_28198[(8)] = inst_28156);

return statearr_28198;
})();
var statearr_28199_28225 = state_28195__$1;
(statearr_28199_28225[(2)] = null);

(statearr_28199_28225[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28196 === (4))){
var inst_28159 = (state_28195[(9)]);
var inst_28159__$1 = (state_28195[(2)]);
var inst_28160 = (inst_28159__$1 == null);
var inst_28161 = cljs.core.not.call(null,inst_28160);
var state_28195__$1 = (function (){var statearr_28200 = state_28195;
(statearr_28200[(9)] = inst_28159__$1);

return statearr_28200;
})();
if(inst_28161){
var statearr_28201_28226 = state_28195__$1;
(statearr_28201_28226[(1)] = (5));

} else {
var statearr_28202_28227 = state_28195__$1;
(statearr_28202_28227[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28196 === (15))){
var inst_28185 = (state_28195[(2)]);
var state_28195__$1 = state_28195;
var statearr_28203_28228 = state_28195__$1;
(statearr_28203_28228[(2)] = inst_28185);

(statearr_28203_28228[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28196 === (13))){
var state_28195__$1 = state_28195;
var statearr_28204_28229 = state_28195__$1;
(statearr_28204_28229[(2)] = null);

(statearr_28204_28229[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28196 === (6))){
var inst_28155 = (state_28195[(7)]);
var inst_28180 = inst_28155.length;
var inst_28181 = (inst_28180 > (0));
var state_28195__$1 = state_28195;
if(cljs.core.truth_(inst_28181)){
var statearr_28205_28230 = state_28195__$1;
(statearr_28205_28230[(1)] = (12));

} else {
var statearr_28206_28231 = state_28195__$1;
(statearr_28206_28231[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28196 === (3))){
var inst_28193 = (state_28195[(2)]);
var state_28195__$1 = state_28195;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_28195__$1,inst_28193);
} else {
if((state_val_28196 === (12))){
var inst_28155 = (state_28195[(7)]);
var inst_28183 = cljs.core.vec.call(null,inst_28155);
var state_28195__$1 = state_28195;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_28195__$1,(15),out,inst_28183);
} else {
if((state_val_28196 === (2))){
var state_28195__$1 = state_28195;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_28195__$1,(4),ch);
} else {
if((state_val_28196 === (11))){
var inst_28163 = (state_28195[(10)]);
var inst_28159 = (state_28195[(9)]);
var inst_28173 = (state_28195[(2)]);
var inst_28174 = [];
var inst_28175 = inst_28174.push(inst_28159);
var inst_28155 = inst_28174;
var inst_28156 = inst_28163;
var state_28195__$1 = (function (){var statearr_28207 = state_28195;
(statearr_28207[(11)] = inst_28175);

(statearr_28207[(12)] = inst_28173);

(statearr_28207[(7)] = inst_28155);

(statearr_28207[(8)] = inst_28156);

return statearr_28207;
})();
var statearr_28208_28232 = state_28195__$1;
(statearr_28208_28232[(2)] = null);

(statearr_28208_28232[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28196 === (9))){
var inst_28155 = (state_28195[(7)]);
var inst_28171 = cljs.core.vec.call(null,inst_28155);
var state_28195__$1 = state_28195;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_28195__$1,(11),out,inst_28171);
} else {
if((state_val_28196 === (5))){
var inst_28163 = (state_28195[(10)]);
var inst_28159 = (state_28195[(9)]);
var inst_28156 = (state_28195[(8)]);
var inst_28163__$1 = f.call(null,inst_28159);
var inst_28164 = cljs.core._EQ_.call(null,inst_28163__$1,inst_28156);
var inst_28165 = cljs.core.keyword_identical_QMARK_.call(null,inst_28156,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123));
var inst_28166 = ((inst_28164) || (inst_28165));
var state_28195__$1 = (function (){var statearr_28209 = state_28195;
(statearr_28209[(10)] = inst_28163__$1);

return statearr_28209;
})();
if(cljs.core.truth_(inst_28166)){
var statearr_28210_28233 = state_28195__$1;
(statearr_28210_28233[(1)] = (8));

} else {
var statearr_28211_28234 = state_28195__$1;
(statearr_28211_28234[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28196 === (14))){
var inst_28188 = (state_28195[(2)]);
var inst_28189 = cljs.core.async.close_BANG_.call(null,out);
var state_28195__$1 = (function (){var statearr_28213 = state_28195;
(statearr_28213[(13)] = inst_28188);

return statearr_28213;
})();
var statearr_28214_28235 = state_28195__$1;
(statearr_28214_28235[(2)] = inst_28189);

(statearr_28214_28235[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28196 === (10))){
var inst_28178 = (state_28195[(2)]);
var state_28195__$1 = state_28195;
var statearr_28215_28236 = state_28195__$1;
(statearr_28215_28236[(2)] = inst_28178);

(statearr_28215_28236[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28196 === (8))){
var inst_28163 = (state_28195[(10)]);
var inst_28155 = (state_28195[(7)]);
var inst_28159 = (state_28195[(9)]);
var inst_28168 = inst_28155.push(inst_28159);
var tmp28212 = inst_28155;
var inst_28155__$1 = tmp28212;
var inst_28156 = inst_28163;
var state_28195__$1 = (function (){var statearr_28216 = state_28195;
(statearr_28216[(7)] = inst_28155__$1);

(statearr_28216[(8)] = inst_28156);

(statearr_28216[(14)] = inst_28168);

return statearr_28216;
})();
var statearr_28217_28237 = state_28195__$1;
(statearr_28217_28237[(2)] = null);

(statearr_28217_28237[(1)] = (2));


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
var cljs$core$async$state_machine__26225__auto__ = null;
var cljs$core$async$state_machine__26225__auto____0 = (function (){
var statearr_28218 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_28218[(0)] = cljs$core$async$state_machine__26225__auto__);

(statearr_28218[(1)] = (1));

return statearr_28218;
});
var cljs$core$async$state_machine__26225__auto____1 = (function (state_28195){
while(true){
var ret_value__26226__auto__ = (function (){try{while(true){
var result__26227__auto__ = switch__26224__auto__.call(null,state_28195);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26227__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26227__auto__;
}
break;
}
}catch (e28219){if((e28219 instanceof Object)){
var ex__26228__auto__ = e28219;
var statearr_28220_28238 = state_28195;
(statearr_28220_28238[(5)] = ex__26228__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_28195);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e28219;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26226__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__28239 = state_28195;
state_28195 = G__28239;
continue;
} else {
return ret_value__26226__auto__;
}
break;
}
});
cljs$core$async$state_machine__26225__auto__ = function(state_28195){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__26225__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__26225__auto____1.call(this,state_28195);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__26225__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__26225__auto____0;
cljs$core$async$state_machine__26225__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__26225__auto____1;
return cljs$core$async$state_machine__26225__auto__;
})()
})();
var state__26321__auto__ = (function (){var statearr_28221 = f__26320__auto__.call(null);
(statearr_28221[(6)] = c__26319__auto___28223);

return statearr_28221;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26321__auto__);
}));


return out;
}));

(cljs.core.async.partition_by.cljs$lang$maxFixedArity = 3);


//# sourceMappingURL=async.js.map
