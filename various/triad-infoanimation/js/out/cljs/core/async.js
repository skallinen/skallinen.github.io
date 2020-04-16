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
var G__26741 = arguments.length;
switch (G__26741) {
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
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async26742 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async26742 = (function (f,blockable,meta26743){
this.f = f;
this.blockable = blockable;
this.meta26743 = meta26743;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async26742.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_26744,meta26743__$1){
var self__ = this;
var _26744__$1 = this;
return (new cljs.core.async.t_cljs$core$async26742(self__.f,self__.blockable,meta26743__$1));
}));

(cljs.core.async.t_cljs$core$async26742.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_26744){
var self__ = this;
var _26744__$1 = this;
return self__.meta26743;
}));

(cljs.core.async.t_cljs$core$async26742.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async26742.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async26742.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.blockable;
}));

(cljs.core.async.t_cljs$core$async26742.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.f;
}));

(cljs.core.async.t_cljs$core$async26742.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"blockable","blockable",-28395259,null),new cljs.core.Symbol(null,"meta26743","meta26743",-1236250536,null)], null);
}));

(cljs.core.async.t_cljs$core$async26742.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async26742.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async26742");

(cljs.core.async.t_cljs$core$async26742.cljs$lang$ctorPrWriter = (function (this__4428__auto__,writer__4429__auto__,opt__4430__auto__){
return cljs.core._write.call(null,writer__4429__auto__,"cljs.core.async/t_cljs$core$async26742");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async26742.
 */
cljs.core.async.__GT_t_cljs$core$async26742 = (function cljs$core$async$__GT_t_cljs$core$async26742(f__$1,blockable__$1,meta26743){
return (new cljs.core.async.t_cljs$core$async26742(f__$1,blockable__$1,meta26743));
});

}

return (new cljs.core.async.t_cljs$core$async26742(f,blockable,cljs.core.PersistentArrayMap.EMPTY));
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
var G__26748 = arguments.length;
switch (G__26748) {
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
var G__26751 = arguments.length;
switch (G__26751) {
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
var G__26754 = arguments.length;
switch (G__26754) {
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
var val_26756 = cljs.core.deref.call(null,ret);
if(cljs.core.truth_(on_caller_QMARK_)){
fn1.call(null,val_26756);
} else {
cljs.core.async.impl.dispatch.run.call(null,(function (){
return fn1.call(null,val_26756);
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
var G__26758 = arguments.length;
switch (G__26758) {
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
var n__4666__auto___26760 = n;
var x_26761 = (0);
while(true){
if((x_26761 < n__4666__auto___26760)){
(a[x_26761] = (0));

var G__26762 = (x_26761 + (1));
x_26761 = G__26762;
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

var G__26763 = (i + (1));
i = G__26763;
continue;
}
break;
}
});
cljs.core.async.alt_flag = (function cljs$core$async$alt_flag(){
var flag = cljs.core.atom.call(null,true);
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async26764 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async26764 = (function (flag,meta26765){
this.flag = flag;
this.meta26765 = meta26765;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async26764.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_26766,meta26765__$1){
var self__ = this;
var _26766__$1 = this;
return (new cljs.core.async.t_cljs$core$async26764(self__.flag,meta26765__$1));
}));

(cljs.core.async.t_cljs$core$async26764.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_26766){
var self__ = this;
var _26766__$1 = this;
return self__.meta26765;
}));

(cljs.core.async.t_cljs$core$async26764.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async26764.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.deref.call(null,self__.flag);
}));

(cljs.core.async.t_cljs$core$async26764.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async26764.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.flag,null);

return true;
}));

(cljs.core.async.t_cljs$core$async26764.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"meta26765","meta26765",-1033722780,null)], null);
}));

(cljs.core.async.t_cljs$core$async26764.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async26764.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async26764");

(cljs.core.async.t_cljs$core$async26764.cljs$lang$ctorPrWriter = (function (this__4428__auto__,writer__4429__auto__,opt__4430__auto__){
return cljs.core._write.call(null,writer__4429__auto__,"cljs.core.async/t_cljs$core$async26764");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async26764.
 */
cljs.core.async.__GT_t_cljs$core$async26764 = (function cljs$core$async$alt_flag_$___GT_t_cljs$core$async26764(flag__$1,meta26765){
return (new cljs.core.async.t_cljs$core$async26764(flag__$1,meta26765));
});

}

return (new cljs.core.async.t_cljs$core$async26764(flag,cljs.core.PersistentArrayMap.EMPTY));
});
cljs.core.async.alt_handler = (function cljs$core$async$alt_handler(flag,cb){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async26767 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async26767 = (function (flag,cb,meta26768){
this.flag = flag;
this.cb = cb;
this.meta26768 = meta26768;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async26767.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_26769,meta26768__$1){
var self__ = this;
var _26769__$1 = this;
return (new cljs.core.async.t_cljs$core$async26767(self__.flag,self__.cb,meta26768__$1));
}));

(cljs.core.async.t_cljs$core$async26767.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_26769){
var self__ = this;
var _26769__$1 = this;
return self__.meta26768;
}));

(cljs.core.async.t_cljs$core$async26767.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async26767.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.flag);
}));

(cljs.core.async.t_cljs$core$async26767.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async26767.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.async.impl.protocols.commit.call(null,self__.flag);

return self__.cb;
}));

(cljs.core.async.t_cljs$core$async26767.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null),new cljs.core.Symbol(null,"meta26768","meta26768",-952309446,null)], null);
}));

(cljs.core.async.t_cljs$core$async26767.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async26767.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async26767");

(cljs.core.async.t_cljs$core$async26767.cljs$lang$ctorPrWriter = (function (this__4428__auto__,writer__4429__auto__,opt__4430__auto__){
return cljs.core._write.call(null,writer__4429__auto__,"cljs.core.async/t_cljs$core$async26767");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async26767.
 */
cljs.core.async.__GT_t_cljs$core$async26767 = (function cljs$core$async$alt_handler_$___GT_t_cljs$core$async26767(flag__$1,cb__$1,meta26768){
return (new cljs.core.async.t_cljs$core$async26767(flag__$1,cb__$1,meta26768));
});

}

return (new cljs.core.async.t_cljs$core$async26767(flag,cb,cljs.core.PersistentArrayMap.EMPTY));
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
return (function (p1__26770_SHARP_){
return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__26770_SHARP_,wport], null));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.alt_handler.call(null,flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__26771_SHARP_){
return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__26771_SHARP_,port], null));
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
var G__26772 = (i + (1));
i = G__26772;
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
var len__4789__auto___26778 = arguments.length;
var i__4790__auto___26779 = (0);
while(true){
if((i__4790__auto___26779 < len__4789__auto___26778)){
args__4795__auto__.push((arguments[i__4790__auto___26779]));

var G__26780 = (i__4790__auto___26779 + (1));
i__4790__auto___26779 = G__26780;
continue;
} else {
}
break;
}

var argseq__4796__auto__ = ((((1) < args__4795__auto__.length))?(new cljs.core.IndexedSeq(args__4795__auto__.slice((1)),(0),null)):null);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__4796__auto__);
});

(cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ports,p__26775){
var map__26776 = p__26775;
var map__26776__$1 = (((((!((map__26776 == null))))?(((((map__26776.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__26776.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__26776):map__26776);
var opts = map__26776__$1;
throw (new Error("alts! used not in (go ...) block"));
}));

(cljs.core.async.alts_BANG_.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(cljs.core.async.alts_BANG_.cljs$lang$applyTo = (function (seq26773){
var G__26774 = cljs.core.first.call(null,seq26773);
var seq26773__$1 = cljs.core.next.call(null,seq26773);
var self__4776__auto__ = this;
return self__4776__auto__.cljs$core$IFn$_invoke$arity$variadic(G__26774,seq26773__$1);
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
var G__26782 = arguments.length;
switch (G__26782) {
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
var c__26681__auto___26828 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26682__auto__ = (function (){var switch__26586__auto__ = (function (state_26806){
var state_val_26807 = (state_26806[(1)]);
if((state_val_26807 === (7))){
var inst_26802 = (state_26806[(2)]);
var state_26806__$1 = state_26806;
var statearr_26808_26829 = state_26806__$1;
(statearr_26808_26829[(2)] = inst_26802);

(statearr_26808_26829[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26807 === (1))){
var state_26806__$1 = state_26806;
var statearr_26809_26830 = state_26806__$1;
(statearr_26809_26830[(2)] = null);

(statearr_26809_26830[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26807 === (4))){
var inst_26785 = (state_26806[(7)]);
var inst_26785__$1 = (state_26806[(2)]);
var inst_26786 = (inst_26785__$1 == null);
var state_26806__$1 = (function (){var statearr_26810 = state_26806;
(statearr_26810[(7)] = inst_26785__$1);

return statearr_26810;
})();
if(cljs.core.truth_(inst_26786)){
var statearr_26811_26831 = state_26806__$1;
(statearr_26811_26831[(1)] = (5));

} else {
var statearr_26812_26832 = state_26806__$1;
(statearr_26812_26832[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26807 === (13))){
var state_26806__$1 = state_26806;
var statearr_26813_26833 = state_26806__$1;
(statearr_26813_26833[(2)] = null);

(statearr_26813_26833[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26807 === (6))){
var inst_26785 = (state_26806[(7)]);
var state_26806__$1 = state_26806;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26806__$1,(11),to,inst_26785);
} else {
if((state_val_26807 === (3))){
var inst_26804 = (state_26806[(2)]);
var state_26806__$1 = state_26806;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26806__$1,inst_26804);
} else {
if((state_val_26807 === (12))){
var state_26806__$1 = state_26806;
var statearr_26814_26834 = state_26806__$1;
(statearr_26814_26834[(2)] = null);

(statearr_26814_26834[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26807 === (2))){
var state_26806__$1 = state_26806;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26806__$1,(4),from);
} else {
if((state_val_26807 === (11))){
var inst_26795 = (state_26806[(2)]);
var state_26806__$1 = state_26806;
if(cljs.core.truth_(inst_26795)){
var statearr_26815_26835 = state_26806__$1;
(statearr_26815_26835[(1)] = (12));

} else {
var statearr_26816_26836 = state_26806__$1;
(statearr_26816_26836[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26807 === (9))){
var state_26806__$1 = state_26806;
var statearr_26817_26837 = state_26806__$1;
(statearr_26817_26837[(2)] = null);

(statearr_26817_26837[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26807 === (5))){
var state_26806__$1 = state_26806;
if(cljs.core.truth_(close_QMARK_)){
var statearr_26818_26838 = state_26806__$1;
(statearr_26818_26838[(1)] = (8));

} else {
var statearr_26819_26839 = state_26806__$1;
(statearr_26819_26839[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26807 === (14))){
var inst_26800 = (state_26806[(2)]);
var state_26806__$1 = state_26806;
var statearr_26820_26840 = state_26806__$1;
(statearr_26820_26840[(2)] = inst_26800);

(statearr_26820_26840[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26807 === (10))){
var inst_26792 = (state_26806[(2)]);
var state_26806__$1 = state_26806;
var statearr_26821_26841 = state_26806__$1;
(statearr_26821_26841[(2)] = inst_26792);

(statearr_26821_26841[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26807 === (8))){
var inst_26789 = cljs.core.async.close_BANG_.call(null,to);
var state_26806__$1 = state_26806;
var statearr_26822_26842 = state_26806__$1;
(statearr_26822_26842[(2)] = inst_26789);

(statearr_26822_26842[(1)] = (10));


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
var cljs$core$async$state_machine__26587__auto__ = null;
var cljs$core$async$state_machine__26587__auto____0 = (function (){
var statearr_26823 = [null,null,null,null,null,null,null,null];
(statearr_26823[(0)] = cljs$core$async$state_machine__26587__auto__);

(statearr_26823[(1)] = (1));

return statearr_26823;
});
var cljs$core$async$state_machine__26587__auto____1 = (function (state_26806){
while(true){
var ret_value__26588__auto__ = (function (){try{while(true){
var result__26589__auto__ = switch__26586__auto__.call(null,state_26806);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26589__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26589__auto__;
}
break;
}
}catch (e26824){if((e26824 instanceof Object)){
var ex__26590__auto__ = e26824;
var statearr_26825_26843 = state_26806;
(statearr_26825_26843[(5)] = ex__26590__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26806);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26824;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26844 = state_26806;
state_26806 = G__26844;
continue;
} else {
return ret_value__26588__auto__;
}
break;
}
});
cljs$core$async$state_machine__26587__auto__ = function(state_26806){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__26587__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__26587__auto____1.call(this,state_26806);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__26587__auto____0;
cljs$core$async$state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__26587__auto____1;
return cljs$core$async$state_machine__26587__auto__;
})()
})();
var state__26683__auto__ = (function (){var statearr_26826 = f__26682__auto__.call(null);
(statearr_26826[(6)] = c__26681__auto___26828);

return statearr_26826;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26683__auto__);
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
var process = (function (p__26845){
var vec__26846 = p__26845;
var v = cljs.core.nth.call(null,vec__26846,(0),null);
var p = cljs.core.nth.call(null,vec__26846,(1),null);
var job = vec__26846;
if((job == null)){
cljs.core.async.close_BANG_.call(null,results);

return null;
} else {
var res = cljs.core.async.chan.call(null,(1),xf,ex_handler);
var c__26681__auto___27017 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26682__auto__ = (function (){var switch__26586__auto__ = (function (state_26853){
var state_val_26854 = (state_26853[(1)]);
if((state_val_26854 === (1))){
var state_26853__$1 = state_26853;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26853__$1,(2),res,v);
} else {
if((state_val_26854 === (2))){
var inst_26850 = (state_26853[(2)]);
var inst_26851 = cljs.core.async.close_BANG_.call(null,res);
var state_26853__$1 = (function (){var statearr_26855 = state_26853;
(statearr_26855[(7)] = inst_26850);

return statearr_26855;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26853__$1,inst_26851);
} else {
return null;
}
}
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__26587__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__26587__auto____0 = (function (){
var statearr_26856 = [null,null,null,null,null,null,null,null];
(statearr_26856[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__26587__auto__);

(statearr_26856[(1)] = (1));

return statearr_26856;
});
var cljs$core$async$pipeline_STAR__$_state_machine__26587__auto____1 = (function (state_26853){
while(true){
var ret_value__26588__auto__ = (function (){try{while(true){
var result__26589__auto__ = switch__26586__auto__.call(null,state_26853);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26589__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26589__auto__;
}
break;
}
}catch (e26857){if((e26857 instanceof Object)){
var ex__26590__auto__ = e26857;
var statearr_26858_27018 = state_26853;
(statearr_26858_27018[(5)] = ex__26590__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26853);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26857;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27019 = state_26853;
state_26853 = G__27019;
continue;
} else {
return ret_value__26588__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__26587__auto__ = function(state_26853){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__26587__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__26587__auto____1.call(this,state_26853);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__26587__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__26587__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__26587__auto__;
})()
})();
var state__26683__auto__ = (function (){var statearr_26859 = f__26682__auto__.call(null);
(statearr_26859[(6)] = c__26681__auto___27017);

return statearr_26859;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26683__auto__);
}));


cljs.core.async.put_BANG_.call(null,p,res);

return true;
}
});
var async = (function (p__26860){
var vec__26861 = p__26860;
var v = cljs.core.nth.call(null,vec__26861,(0),null);
var p = cljs.core.nth.call(null,vec__26861,(1),null);
var job = vec__26861;
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
var n__4666__auto___27020 = n;
var __27021 = (0);
while(true){
if((__27021 < n__4666__auto___27020)){
var G__26864_27022 = type;
var G__26864_27023__$1 = (((G__26864_27022 instanceof cljs.core.Keyword))?G__26864_27022.fqn:null);
switch (G__26864_27023__$1) {
case "compute":
var c__26681__auto___27025 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (__27021,c__26681__auto___27025,G__26864_27022,G__26864_27023__$1,n__4666__auto___27020,jobs,results,process,async){
return (function (){
var f__26682__auto__ = (function (){var switch__26586__auto__ = ((function (__27021,c__26681__auto___27025,G__26864_27022,G__26864_27023__$1,n__4666__auto___27020,jobs,results,process,async){
return (function (state_26877){
var state_val_26878 = (state_26877[(1)]);
if((state_val_26878 === (1))){
var state_26877__$1 = state_26877;
var statearr_26879_27026 = state_26877__$1;
(statearr_26879_27026[(2)] = null);

(statearr_26879_27026[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26878 === (2))){
var state_26877__$1 = state_26877;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26877__$1,(4),jobs);
} else {
if((state_val_26878 === (3))){
var inst_26875 = (state_26877[(2)]);
var state_26877__$1 = state_26877;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26877__$1,inst_26875);
} else {
if((state_val_26878 === (4))){
var inst_26867 = (state_26877[(2)]);
var inst_26868 = process.call(null,inst_26867);
var state_26877__$1 = state_26877;
if(cljs.core.truth_(inst_26868)){
var statearr_26880_27027 = state_26877__$1;
(statearr_26880_27027[(1)] = (5));

} else {
var statearr_26881_27028 = state_26877__$1;
(statearr_26881_27028[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26878 === (5))){
var state_26877__$1 = state_26877;
var statearr_26882_27029 = state_26877__$1;
(statearr_26882_27029[(2)] = null);

(statearr_26882_27029[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26878 === (6))){
var state_26877__$1 = state_26877;
var statearr_26883_27030 = state_26877__$1;
(statearr_26883_27030[(2)] = null);

(statearr_26883_27030[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26878 === (7))){
var inst_26873 = (state_26877[(2)]);
var state_26877__$1 = state_26877;
var statearr_26884_27031 = state_26877__$1;
(statearr_26884_27031[(2)] = inst_26873);

(statearr_26884_27031[(1)] = (3));


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
});})(__27021,c__26681__auto___27025,G__26864_27022,G__26864_27023__$1,n__4666__auto___27020,jobs,results,process,async))
;
return ((function (__27021,switch__26586__auto__,c__26681__auto___27025,G__26864_27022,G__26864_27023__$1,n__4666__auto___27020,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__26587__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__26587__auto____0 = (function (){
var statearr_26885 = [null,null,null,null,null,null,null];
(statearr_26885[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__26587__auto__);

(statearr_26885[(1)] = (1));

return statearr_26885;
});
var cljs$core$async$pipeline_STAR__$_state_machine__26587__auto____1 = (function (state_26877){
while(true){
var ret_value__26588__auto__ = (function (){try{while(true){
var result__26589__auto__ = switch__26586__auto__.call(null,state_26877);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26589__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26589__auto__;
}
break;
}
}catch (e26886){if((e26886 instanceof Object)){
var ex__26590__auto__ = e26886;
var statearr_26887_27032 = state_26877;
(statearr_26887_27032[(5)] = ex__26590__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26877);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26886;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27033 = state_26877;
state_26877 = G__27033;
continue;
} else {
return ret_value__26588__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__26587__auto__ = function(state_26877){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__26587__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__26587__auto____1.call(this,state_26877);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__26587__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__26587__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__26587__auto__;
})()
;})(__27021,switch__26586__auto__,c__26681__auto___27025,G__26864_27022,G__26864_27023__$1,n__4666__auto___27020,jobs,results,process,async))
})();
var state__26683__auto__ = (function (){var statearr_26888 = f__26682__auto__.call(null);
(statearr_26888[(6)] = c__26681__auto___27025);

return statearr_26888;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26683__auto__);
});})(__27021,c__26681__auto___27025,G__26864_27022,G__26864_27023__$1,n__4666__auto___27020,jobs,results,process,async))
);


break;
case "async":
var c__26681__auto___27034 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (__27021,c__26681__auto___27034,G__26864_27022,G__26864_27023__$1,n__4666__auto___27020,jobs,results,process,async){
return (function (){
var f__26682__auto__ = (function (){var switch__26586__auto__ = ((function (__27021,c__26681__auto___27034,G__26864_27022,G__26864_27023__$1,n__4666__auto___27020,jobs,results,process,async){
return (function (state_26901){
var state_val_26902 = (state_26901[(1)]);
if((state_val_26902 === (1))){
var state_26901__$1 = state_26901;
var statearr_26903_27035 = state_26901__$1;
(statearr_26903_27035[(2)] = null);

(statearr_26903_27035[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26902 === (2))){
var state_26901__$1 = state_26901;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26901__$1,(4),jobs);
} else {
if((state_val_26902 === (3))){
var inst_26899 = (state_26901[(2)]);
var state_26901__$1 = state_26901;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26901__$1,inst_26899);
} else {
if((state_val_26902 === (4))){
var inst_26891 = (state_26901[(2)]);
var inst_26892 = async.call(null,inst_26891);
var state_26901__$1 = state_26901;
if(cljs.core.truth_(inst_26892)){
var statearr_26904_27036 = state_26901__$1;
(statearr_26904_27036[(1)] = (5));

} else {
var statearr_26905_27037 = state_26901__$1;
(statearr_26905_27037[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26902 === (5))){
var state_26901__$1 = state_26901;
var statearr_26906_27038 = state_26901__$1;
(statearr_26906_27038[(2)] = null);

(statearr_26906_27038[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26902 === (6))){
var state_26901__$1 = state_26901;
var statearr_26907_27039 = state_26901__$1;
(statearr_26907_27039[(2)] = null);

(statearr_26907_27039[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26902 === (7))){
var inst_26897 = (state_26901[(2)]);
var state_26901__$1 = state_26901;
var statearr_26908_27040 = state_26901__$1;
(statearr_26908_27040[(2)] = inst_26897);

(statearr_26908_27040[(1)] = (3));


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
});})(__27021,c__26681__auto___27034,G__26864_27022,G__26864_27023__$1,n__4666__auto___27020,jobs,results,process,async))
;
return ((function (__27021,switch__26586__auto__,c__26681__auto___27034,G__26864_27022,G__26864_27023__$1,n__4666__auto___27020,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__26587__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__26587__auto____0 = (function (){
var statearr_26909 = [null,null,null,null,null,null,null];
(statearr_26909[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__26587__auto__);

(statearr_26909[(1)] = (1));

return statearr_26909;
});
var cljs$core$async$pipeline_STAR__$_state_machine__26587__auto____1 = (function (state_26901){
while(true){
var ret_value__26588__auto__ = (function (){try{while(true){
var result__26589__auto__ = switch__26586__auto__.call(null,state_26901);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26589__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26589__auto__;
}
break;
}
}catch (e26910){if((e26910 instanceof Object)){
var ex__26590__auto__ = e26910;
var statearr_26911_27041 = state_26901;
(statearr_26911_27041[(5)] = ex__26590__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26901);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26910;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27042 = state_26901;
state_26901 = G__27042;
continue;
} else {
return ret_value__26588__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__26587__auto__ = function(state_26901){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__26587__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__26587__auto____1.call(this,state_26901);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__26587__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__26587__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__26587__auto__;
})()
;})(__27021,switch__26586__auto__,c__26681__auto___27034,G__26864_27022,G__26864_27023__$1,n__4666__auto___27020,jobs,results,process,async))
})();
var state__26683__auto__ = (function (){var statearr_26912 = f__26682__auto__.call(null);
(statearr_26912[(6)] = c__26681__auto___27034);

return statearr_26912;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26683__auto__);
});})(__27021,c__26681__auto___27034,G__26864_27022,G__26864_27023__$1,n__4666__auto___27020,jobs,results,process,async))
);


break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__26864_27023__$1)].join('')));

}

var G__27043 = (__27021 + (1));
__27021 = G__27043;
continue;
} else {
}
break;
}

var c__26681__auto___27044 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26682__auto__ = (function (){var switch__26586__auto__ = (function (state_26934){
var state_val_26935 = (state_26934[(1)]);
if((state_val_26935 === (7))){
var inst_26930 = (state_26934[(2)]);
var state_26934__$1 = state_26934;
var statearr_26936_27045 = state_26934__$1;
(statearr_26936_27045[(2)] = inst_26930);

(statearr_26936_27045[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26935 === (1))){
var state_26934__$1 = state_26934;
var statearr_26937_27046 = state_26934__$1;
(statearr_26937_27046[(2)] = null);

(statearr_26937_27046[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26935 === (4))){
var inst_26915 = (state_26934[(7)]);
var inst_26915__$1 = (state_26934[(2)]);
var inst_26916 = (inst_26915__$1 == null);
var state_26934__$1 = (function (){var statearr_26938 = state_26934;
(statearr_26938[(7)] = inst_26915__$1);

return statearr_26938;
})();
if(cljs.core.truth_(inst_26916)){
var statearr_26939_27047 = state_26934__$1;
(statearr_26939_27047[(1)] = (5));

} else {
var statearr_26940_27048 = state_26934__$1;
(statearr_26940_27048[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26935 === (6))){
var inst_26920 = (state_26934[(8)]);
var inst_26915 = (state_26934[(7)]);
var inst_26920__$1 = cljs.core.async.chan.call(null,(1));
var inst_26921 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_26922 = [inst_26915,inst_26920__$1];
var inst_26923 = (new cljs.core.PersistentVector(null,2,(5),inst_26921,inst_26922,null));
var state_26934__$1 = (function (){var statearr_26941 = state_26934;
(statearr_26941[(8)] = inst_26920__$1);

return statearr_26941;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26934__$1,(8),jobs,inst_26923);
} else {
if((state_val_26935 === (3))){
var inst_26932 = (state_26934[(2)]);
var state_26934__$1 = state_26934;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26934__$1,inst_26932);
} else {
if((state_val_26935 === (2))){
var state_26934__$1 = state_26934;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26934__$1,(4),from);
} else {
if((state_val_26935 === (9))){
var inst_26927 = (state_26934[(2)]);
var state_26934__$1 = (function (){var statearr_26942 = state_26934;
(statearr_26942[(9)] = inst_26927);

return statearr_26942;
})();
var statearr_26943_27049 = state_26934__$1;
(statearr_26943_27049[(2)] = null);

(statearr_26943_27049[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26935 === (5))){
var inst_26918 = cljs.core.async.close_BANG_.call(null,jobs);
var state_26934__$1 = state_26934;
var statearr_26944_27050 = state_26934__$1;
(statearr_26944_27050[(2)] = inst_26918);

(statearr_26944_27050[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26935 === (8))){
var inst_26920 = (state_26934[(8)]);
var inst_26925 = (state_26934[(2)]);
var state_26934__$1 = (function (){var statearr_26945 = state_26934;
(statearr_26945[(10)] = inst_26925);

return statearr_26945;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26934__$1,(9),results,inst_26920);
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
var cljs$core$async$pipeline_STAR__$_state_machine__26587__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__26587__auto____0 = (function (){
var statearr_26946 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_26946[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__26587__auto__);

(statearr_26946[(1)] = (1));

return statearr_26946;
});
var cljs$core$async$pipeline_STAR__$_state_machine__26587__auto____1 = (function (state_26934){
while(true){
var ret_value__26588__auto__ = (function (){try{while(true){
var result__26589__auto__ = switch__26586__auto__.call(null,state_26934);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26589__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26589__auto__;
}
break;
}
}catch (e26947){if((e26947 instanceof Object)){
var ex__26590__auto__ = e26947;
var statearr_26948_27051 = state_26934;
(statearr_26948_27051[(5)] = ex__26590__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26934);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26947;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27052 = state_26934;
state_26934 = G__27052;
continue;
} else {
return ret_value__26588__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__26587__auto__ = function(state_26934){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__26587__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__26587__auto____1.call(this,state_26934);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__26587__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__26587__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__26587__auto__;
})()
})();
var state__26683__auto__ = (function (){var statearr_26949 = f__26682__auto__.call(null);
(statearr_26949[(6)] = c__26681__auto___27044);

return statearr_26949;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26683__auto__);
}));


var c__26681__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26682__auto__ = (function (){var switch__26586__auto__ = (function (state_26987){
var state_val_26988 = (state_26987[(1)]);
if((state_val_26988 === (7))){
var inst_26983 = (state_26987[(2)]);
var state_26987__$1 = state_26987;
var statearr_26989_27053 = state_26987__$1;
(statearr_26989_27053[(2)] = inst_26983);

(statearr_26989_27053[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26988 === (20))){
var state_26987__$1 = state_26987;
var statearr_26990_27054 = state_26987__$1;
(statearr_26990_27054[(2)] = null);

(statearr_26990_27054[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26988 === (1))){
var state_26987__$1 = state_26987;
var statearr_26991_27055 = state_26987__$1;
(statearr_26991_27055[(2)] = null);

(statearr_26991_27055[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26988 === (4))){
var inst_26952 = (state_26987[(7)]);
var inst_26952__$1 = (state_26987[(2)]);
var inst_26953 = (inst_26952__$1 == null);
var state_26987__$1 = (function (){var statearr_26992 = state_26987;
(statearr_26992[(7)] = inst_26952__$1);

return statearr_26992;
})();
if(cljs.core.truth_(inst_26953)){
var statearr_26993_27056 = state_26987__$1;
(statearr_26993_27056[(1)] = (5));

} else {
var statearr_26994_27057 = state_26987__$1;
(statearr_26994_27057[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26988 === (15))){
var inst_26965 = (state_26987[(8)]);
var state_26987__$1 = state_26987;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26987__$1,(18),to,inst_26965);
} else {
if((state_val_26988 === (21))){
var inst_26978 = (state_26987[(2)]);
var state_26987__$1 = state_26987;
var statearr_26995_27058 = state_26987__$1;
(statearr_26995_27058[(2)] = inst_26978);

(statearr_26995_27058[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26988 === (13))){
var inst_26980 = (state_26987[(2)]);
var state_26987__$1 = (function (){var statearr_26996 = state_26987;
(statearr_26996[(9)] = inst_26980);

return statearr_26996;
})();
var statearr_26997_27059 = state_26987__$1;
(statearr_26997_27059[(2)] = null);

(statearr_26997_27059[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26988 === (6))){
var inst_26952 = (state_26987[(7)]);
var state_26987__$1 = state_26987;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26987__$1,(11),inst_26952);
} else {
if((state_val_26988 === (17))){
var inst_26973 = (state_26987[(2)]);
var state_26987__$1 = state_26987;
if(cljs.core.truth_(inst_26973)){
var statearr_26998_27060 = state_26987__$1;
(statearr_26998_27060[(1)] = (19));

} else {
var statearr_26999_27061 = state_26987__$1;
(statearr_26999_27061[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26988 === (3))){
var inst_26985 = (state_26987[(2)]);
var state_26987__$1 = state_26987;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26987__$1,inst_26985);
} else {
if((state_val_26988 === (12))){
var inst_26962 = (state_26987[(10)]);
var state_26987__$1 = state_26987;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26987__$1,(14),inst_26962);
} else {
if((state_val_26988 === (2))){
var state_26987__$1 = state_26987;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26987__$1,(4),results);
} else {
if((state_val_26988 === (19))){
var state_26987__$1 = state_26987;
var statearr_27000_27062 = state_26987__$1;
(statearr_27000_27062[(2)] = null);

(statearr_27000_27062[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26988 === (11))){
var inst_26962 = (state_26987[(2)]);
var state_26987__$1 = (function (){var statearr_27001 = state_26987;
(statearr_27001[(10)] = inst_26962);

return statearr_27001;
})();
var statearr_27002_27063 = state_26987__$1;
(statearr_27002_27063[(2)] = null);

(statearr_27002_27063[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26988 === (9))){
var state_26987__$1 = state_26987;
var statearr_27003_27064 = state_26987__$1;
(statearr_27003_27064[(2)] = null);

(statearr_27003_27064[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26988 === (5))){
var state_26987__$1 = state_26987;
if(cljs.core.truth_(close_QMARK_)){
var statearr_27004_27065 = state_26987__$1;
(statearr_27004_27065[(1)] = (8));

} else {
var statearr_27005_27066 = state_26987__$1;
(statearr_27005_27066[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26988 === (14))){
var inst_26965 = (state_26987[(8)]);
var inst_26965__$1 = (state_26987[(2)]);
var inst_26966 = (inst_26965__$1 == null);
var inst_26967 = cljs.core.not.call(null,inst_26966);
var state_26987__$1 = (function (){var statearr_27006 = state_26987;
(statearr_27006[(8)] = inst_26965__$1);

return statearr_27006;
})();
if(inst_26967){
var statearr_27007_27067 = state_26987__$1;
(statearr_27007_27067[(1)] = (15));

} else {
var statearr_27008_27068 = state_26987__$1;
(statearr_27008_27068[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26988 === (16))){
var state_26987__$1 = state_26987;
var statearr_27009_27069 = state_26987__$1;
(statearr_27009_27069[(2)] = false);

(statearr_27009_27069[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26988 === (10))){
var inst_26959 = (state_26987[(2)]);
var state_26987__$1 = state_26987;
var statearr_27010_27070 = state_26987__$1;
(statearr_27010_27070[(2)] = inst_26959);

(statearr_27010_27070[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26988 === (18))){
var inst_26970 = (state_26987[(2)]);
var state_26987__$1 = state_26987;
var statearr_27011_27071 = state_26987__$1;
(statearr_27011_27071[(2)] = inst_26970);

(statearr_27011_27071[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26988 === (8))){
var inst_26956 = cljs.core.async.close_BANG_.call(null,to);
var state_26987__$1 = state_26987;
var statearr_27012_27072 = state_26987__$1;
(statearr_27012_27072[(2)] = inst_26956);

(statearr_27012_27072[(1)] = (10));


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
var cljs$core$async$pipeline_STAR__$_state_machine__26587__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__26587__auto____0 = (function (){
var statearr_27013 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_27013[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__26587__auto__);

(statearr_27013[(1)] = (1));

return statearr_27013;
});
var cljs$core$async$pipeline_STAR__$_state_machine__26587__auto____1 = (function (state_26987){
while(true){
var ret_value__26588__auto__ = (function (){try{while(true){
var result__26589__auto__ = switch__26586__auto__.call(null,state_26987);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26589__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26589__auto__;
}
break;
}
}catch (e27014){if((e27014 instanceof Object)){
var ex__26590__auto__ = e27014;
var statearr_27015_27073 = state_26987;
(statearr_27015_27073[(5)] = ex__26590__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26987);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e27014;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27074 = state_26987;
state_26987 = G__27074;
continue;
} else {
return ret_value__26588__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__26587__auto__ = function(state_26987){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__26587__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__26587__auto____1.call(this,state_26987);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__26587__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__26587__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__26587__auto__;
})()
})();
var state__26683__auto__ = (function (){var statearr_27016 = f__26682__auto__.call(null);
(statearr_27016[(6)] = c__26681__auto__);

return statearr_27016;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26683__auto__);
}));

return c__26681__auto__;
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
var G__27076 = arguments.length;
switch (G__27076) {
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
var G__27079 = arguments.length;
switch (G__27079) {
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
var G__27082 = arguments.length;
switch (G__27082) {
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
var c__26681__auto___27131 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26682__auto__ = (function (){var switch__26586__auto__ = (function (state_27108){
var state_val_27109 = (state_27108[(1)]);
if((state_val_27109 === (7))){
var inst_27104 = (state_27108[(2)]);
var state_27108__$1 = state_27108;
var statearr_27110_27132 = state_27108__$1;
(statearr_27110_27132[(2)] = inst_27104);

(statearr_27110_27132[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27109 === (1))){
var state_27108__$1 = state_27108;
var statearr_27111_27133 = state_27108__$1;
(statearr_27111_27133[(2)] = null);

(statearr_27111_27133[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27109 === (4))){
var inst_27085 = (state_27108[(7)]);
var inst_27085__$1 = (state_27108[(2)]);
var inst_27086 = (inst_27085__$1 == null);
var state_27108__$1 = (function (){var statearr_27112 = state_27108;
(statearr_27112[(7)] = inst_27085__$1);

return statearr_27112;
})();
if(cljs.core.truth_(inst_27086)){
var statearr_27113_27134 = state_27108__$1;
(statearr_27113_27134[(1)] = (5));

} else {
var statearr_27114_27135 = state_27108__$1;
(statearr_27114_27135[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27109 === (13))){
var state_27108__$1 = state_27108;
var statearr_27115_27136 = state_27108__$1;
(statearr_27115_27136[(2)] = null);

(statearr_27115_27136[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27109 === (6))){
var inst_27085 = (state_27108[(7)]);
var inst_27091 = p.call(null,inst_27085);
var state_27108__$1 = state_27108;
if(cljs.core.truth_(inst_27091)){
var statearr_27116_27137 = state_27108__$1;
(statearr_27116_27137[(1)] = (9));

} else {
var statearr_27117_27138 = state_27108__$1;
(statearr_27117_27138[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27109 === (3))){
var inst_27106 = (state_27108[(2)]);
var state_27108__$1 = state_27108;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_27108__$1,inst_27106);
} else {
if((state_val_27109 === (12))){
var state_27108__$1 = state_27108;
var statearr_27118_27139 = state_27108__$1;
(statearr_27118_27139[(2)] = null);

(statearr_27118_27139[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27109 === (2))){
var state_27108__$1 = state_27108;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27108__$1,(4),ch);
} else {
if((state_val_27109 === (11))){
var inst_27085 = (state_27108[(7)]);
var inst_27095 = (state_27108[(2)]);
var state_27108__$1 = state_27108;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_27108__$1,(8),inst_27095,inst_27085);
} else {
if((state_val_27109 === (9))){
var state_27108__$1 = state_27108;
var statearr_27119_27140 = state_27108__$1;
(statearr_27119_27140[(2)] = tc);

(statearr_27119_27140[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27109 === (5))){
var inst_27088 = cljs.core.async.close_BANG_.call(null,tc);
var inst_27089 = cljs.core.async.close_BANG_.call(null,fc);
var state_27108__$1 = (function (){var statearr_27120 = state_27108;
(statearr_27120[(8)] = inst_27088);

return statearr_27120;
})();
var statearr_27121_27141 = state_27108__$1;
(statearr_27121_27141[(2)] = inst_27089);

(statearr_27121_27141[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27109 === (14))){
var inst_27102 = (state_27108[(2)]);
var state_27108__$1 = state_27108;
var statearr_27122_27142 = state_27108__$1;
(statearr_27122_27142[(2)] = inst_27102);

(statearr_27122_27142[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27109 === (10))){
var state_27108__$1 = state_27108;
var statearr_27123_27143 = state_27108__$1;
(statearr_27123_27143[(2)] = fc);

(statearr_27123_27143[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27109 === (8))){
var inst_27097 = (state_27108[(2)]);
var state_27108__$1 = state_27108;
if(cljs.core.truth_(inst_27097)){
var statearr_27124_27144 = state_27108__$1;
(statearr_27124_27144[(1)] = (12));

} else {
var statearr_27125_27145 = state_27108__$1;
(statearr_27125_27145[(1)] = (13));

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
var cljs$core$async$state_machine__26587__auto__ = null;
var cljs$core$async$state_machine__26587__auto____0 = (function (){
var statearr_27126 = [null,null,null,null,null,null,null,null,null];
(statearr_27126[(0)] = cljs$core$async$state_machine__26587__auto__);

(statearr_27126[(1)] = (1));

return statearr_27126;
});
var cljs$core$async$state_machine__26587__auto____1 = (function (state_27108){
while(true){
var ret_value__26588__auto__ = (function (){try{while(true){
var result__26589__auto__ = switch__26586__auto__.call(null,state_27108);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26589__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26589__auto__;
}
break;
}
}catch (e27127){if((e27127 instanceof Object)){
var ex__26590__auto__ = e27127;
var statearr_27128_27146 = state_27108;
(statearr_27128_27146[(5)] = ex__26590__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27108);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e27127;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27147 = state_27108;
state_27108 = G__27147;
continue;
} else {
return ret_value__26588__auto__;
}
break;
}
});
cljs$core$async$state_machine__26587__auto__ = function(state_27108){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__26587__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__26587__auto____1.call(this,state_27108);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__26587__auto____0;
cljs$core$async$state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__26587__auto____1;
return cljs$core$async$state_machine__26587__auto__;
})()
})();
var state__26683__auto__ = (function (){var statearr_27129 = f__26682__auto__.call(null);
(statearr_27129[(6)] = c__26681__auto___27131);

return statearr_27129;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26683__auto__);
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
var c__26681__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26682__auto__ = (function (){var switch__26586__auto__ = (function (state_27168){
var state_val_27169 = (state_27168[(1)]);
if((state_val_27169 === (7))){
var inst_27164 = (state_27168[(2)]);
var state_27168__$1 = state_27168;
var statearr_27170_27188 = state_27168__$1;
(statearr_27170_27188[(2)] = inst_27164);

(statearr_27170_27188[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27169 === (1))){
var inst_27148 = init;
var state_27168__$1 = (function (){var statearr_27171 = state_27168;
(statearr_27171[(7)] = inst_27148);

return statearr_27171;
})();
var statearr_27172_27189 = state_27168__$1;
(statearr_27172_27189[(2)] = null);

(statearr_27172_27189[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27169 === (4))){
var inst_27151 = (state_27168[(8)]);
var inst_27151__$1 = (state_27168[(2)]);
var inst_27152 = (inst_27151__$1 == null);
var state_27168__$1 = (function (){var statearr_27173 = state_27168;
(statearr_27173[(8)] = inst_27151__$1);

return statearr_27173;
})();
if(cljs.core.truth_(inst_27152)){
var statearr_27174_27190 = state_27168__$1;
(statearr_27174_27190[(1)] = (5));

} else {
var statearr_27175_27191 = state_27168__$1;
(statearr_27175_27191[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27169 === (6))){
var inst_27148 = (state_27168[(7)]);
var inst_27151 = (state_27168[(8)]);
var inst_27155 = (state_27168[(9)]);
var inst_27155__$1 = f.call(null,inst_27148,inst_27151);
var inst_27156 = cljs.core.reduced_QMARK_.call(null,inst_27155__$1);
var state_27168__$1 = (function (){var statearr_27176 = state_27168;
(statearr_27176[(9)] = inst_27155__$1);

return statearr_27176;
})();
if(inst_27156){
var statearr_27177_27192 = state_27168__$1;
(statearr_27177_27192[(1)] = (8));

} else {
var statearr_27178_27193 = state_27168__$1;
(statearr_27178_27193[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27169 === (3))){
var inst_27166 = (state_27168[(2)]);
var state_27168__$1 = state_27168;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_27168__$1,inst_27166);
} else {
if((state_val_27169 === (2))){
var state_27168__$1 = state_27168;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27168__$1,(4),ch);
} else {
if((state_val_27169 === (9))){
var inst_27155 = (state_27168[(9)]);
var inst_27148 = inst_27155;
var state_27168__$1 = (function (){var statearr_27179 = state_27168;
(statearr_27179[(7)] = inst_27148);

return statearr_27179;
})();
var statearr_27180_27194 = state_27168__$1;
(statearr_27180_27194[(2)] = null);

(statearr_27180_27194[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27169 === (5))){
var inst_27148 = (state_27168[(7)]);
var state_27168__$1 = state_27168;
var statearr_27181_27195 = state_27168__$1;
(statearr_27181_27195[(2)] = inst_27148);

(statearr_27181_27195[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27169 === (10))){
var inst_27162 = (state_27168[(2)]);
var state_27168__$1 = state_27168;
var statearr_27182_27196 = state_27168__$1;
(statearr_27182_27196[(2)] = inst_27162);

(statearr_27182_27196[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27169 === (8))){
var inst_27155 = (state_27168[(9)]);
var inst_27158 = cljs.core.deref.call(null,inst_27155);
var state_27168__$1 = state_27168;
var statearr_27183_27197 = state_27168__$1;
(statearr_27183_27197[(2)] = inst_27158);

(statearr_27183_27197[(1)] = (10));


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
var cljs$core$async$reduce_$_state_machine__26587__auto__ = null;
var cljs$core$async$reduce_$_state_machine__26587__auto____0 = (function (){
var statearr_27184 = [null,null,null,null,null,null,null,null,null,null];
(statearr_27184[(0)] = cljs$core$async$reduce_$_state_machine__26587__auto__);

(statearr_27184[(1)] = (1));

return statearr_27184;
});
var cljs$core$async$reduce_$_state_machine__26587__auto____1 = (function (state_27168){
while(true){
var ret_value__26588__auto__ = (function (){try{while(true){
var result__26589__auto__ = switch__26586__auto__.call(null,state_27168);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26589__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26589__auto__;
}
break;
}
}catch (e27185){if((e27185 instanceof Object)){
var ex__26590__auto__ = e27185;
var statearr_27186_27198 = state_27168;
(statearr_27186_27198[(5)] = ex__26590__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27168);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e27185;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27199 = state_27168;
state_27168 = G__27199;
continue;
} else {
return ret_value__26588__auto__;
}
break;
}
});
cljs$core$async$reduce_$_state_machine__26587__auto__ = function(state_27168){
switch(arguments.length){
case 0:
return cljs$core$async$reduce_$_state_machine__26587__auto____0.call(this);
case 1:
return cljs$core$async$reduce_$_state_machine__26587__auto____1.call(this,state_27168);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$reduce_$_state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$reduce_$_state_machine__26587__auto____0;
cljs$core$async$reduce_$_state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$reduce_$_state_machine__26587__auto____1;
return cljs$core$async$reduce_$_state_machine__26587__auto__;
})()
})();
var state__26683__auto__ = (function (){var statearr_27187 = f__26682__auto__.call(null);
(statearr_27187[(6)] = c__26681__auto__);

return statearr_27187;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26683__auto__);
}));

return c__26681__auto__;
});
/**
 * async/reduces a channel with a transformation (xform f).
 *   Returns a channel containing the result.  ch must close before
 *   transduce produces a result.
 */
cljs.core.async.transduce = (function cljs$core$async$transduce(xform,f,init,ch){
var f__$1 = xform.call(null,f);
var c__26681__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26682__auto__ = (function (){var switch__26586__auto__ = (function (state_27205){
var state_val_27206 = (state_27205[(1)]);
if((state_val_27206 === (1))){
var inst_27200 = cljs.core.async.reduce.call(null,f__$1,init,ch);
var state_27205__$1 = state_27205;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27205__$1,(2),inst_27200);
} else {
if((state_val_27206 === (2))){
var inst_27202 = (state_27205[(2)]);
var inst_27203 = f__$1.call(null,inst_27202);
var state_27205__$1 = state_27205;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_27205__$1,inst_27203);
} else {
return null;
}
}
});
return (function() {
var cljs$core$async$transduce_$_state_machine__26587__auto__ = null;
var cljs$core$async$transduce_$_state_machine__26587__auto____0 = (function (){
var statearr_27207 = [null,null,null,null,null,null,null];
(statearr_27207[(0)] = cljs$core$async$transduce_$_state_machine__26587__auto__);

(statearr_27207[(1)] = (1));

return statearr_27207;
});
var cljs$core$async$transduce_$_state_machine__26587__auto____1 = (function (state_27205){
while(true){
var ret_value__26588__auto__ = (function (){try{while(true){
var result__26589__auto__ = switch__26586__auto__.call(null,state_27205);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26589__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26589__auto__;
}
break;
}
}catch (e27208){if((e27208 instanceof Object)){
var ex__26590__auto__ = e27208;
var statearr_27209_27211 = state_27205;
(statearr_27209_27211[(5)] = ex__26590__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27205);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e27208;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27212 = state_27205;
state_27205 = G__27212;
continue;
} else {
return ret_value__26588__auto__;
}
break;
}
});
cljs$core$async$transduce_$_state_machine__26587__auto__ = function(state_27205){
switch(arguments.length){
case 0:
return cljs$core$async$transduce_$_state_machine__26587__auto____0.call(this);
case 1:
return cljs$core$async$transduce_$_state_machine__26587__auto____1.call(this,state_27205);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$transduce_$_state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$transduce_$_state_machine__26587__auto____0;
cljs$core$async$transduce_$_state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$transduce_$_state_machine__26587__auto____1;
return cljs$core$async$transduce_$_state_machine__26587__auto__;
})()
})();
var state__26683__auto__ = (function (){var statearr_27210 = f__26682__auto__.call(null);
(statearr_27210[(6)] = c__26681__auto__);

return statearr_27210;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26683__auto__);
}));

return c__26681__auto__;
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
var G__27214 = arguments.length;
switch (G__27214) {
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
var c__26681__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26682__auto__ = (function (){var switch__26586__auto__ = (function (state_27239){
var state_val_27240 = (state_27239[(1)]);
if((state_val_27240 === (7))){
var inst_27221 = (state_27239[(2)]);
var state_27239__$1 = state_27239;
var statearr_27241_27262 = state_27239__$1;
(statearr_27241_27262[(2)] = inst_27221);

(statearr_27241_27262[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27240 === (1))){
var inst_27215 = cljs.core.seq.call(null,coll);
var inst_27216 = inst_27215;
var state_27239__$1 = (function (){var statearr_27242 = state_27239;
(statearr_27242[(7)] = inst_27216);

return statearr_27242;
})();
var statearr_27243_27263 = state_27239__$1;
(statearr_27243_27263[(2)] = null);

(statearr_27243_27263[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27240 === (4))){
var inst_27216 = (state_27239[(7)]);
var inst_27219 = cljs.core.first.call(null,inst_27216);
var state_27239__$1 = state_27239;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_27239__$1,(7),ch,inst_27219);
} else {
if((state_val_27240 === (13))){
var inst_27233 = (state_27239[(2)]);
var state_27239__$1 = state_27239;
var statearr_27244_27264 = state_27239__$1;
(statearr_27244_27264[(2)] = inst_27233);

(statearr_27244_27264[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27240 === (6))){
var inst_27224 = (state_27239[(2)]);
var state_27239__$1 = state_27239;
if(cljs.core.truth_(inst_27224)){
var statearr_27245_27265 = state_27239__$1;
(statearr_27245_27265[(1)] = (8));

} else {
var statearr_27246_27266 = state_27239__$1;
(statearr_27246_27266[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27240 === (3))){
var inst_27237 = (state_27239[(2)]);
var state_27239__$1 = state_27239;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_27239__$1,inst_27237);
} else {
if((state_val_27240 === (12))){
var state_27239__$1 = state_27239;
var statearr_27247_27267 = state_27239__$1;
(statearr_27247_27267[(2)] = null);

(statearr_27247_27267[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27240 === (2))){
var inst_27216 = (state_27239[(7)]);
var state_27239__$1 = state_27239;
if(cljs.core.truth_(inst_27216)){
var statearr_27248_27268 = state_27239__$1;
(statearr_27248_27268[(1)] = (4));

} else {
var statearr_27249_27269 = state_27239__$1;
(statearr_27249_27269[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27240 === (11))){
var inst_27230 = cljs.core.async.close_BANG_.call(null,ch);
var state_27239__$1 = state_27239;
var statearr_27250_27270 = state_27239__$1;
(statearr_27250_27270[(2)] = inst_27230);

(statearr_27250_27270[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27240 === (9))){
var state_27239__$1 = state_27239;
if(cljs.core.truth_(close_QMARK_)){
var statearr_27251_27271 = state_27239__$1;
(statearr_27251_27271[(1)] = (11));

} else {
var statearr_27252_27272 = state_27239__$1;
(statearr_27252_27272[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27240 === (5))){
var inst_27216 = (state_27239[(7)]);
var state_27239__$1 = state_27239;
var statearr_27253_27273 = state_27239__$1;
(statearr_27253_27273[(2)] = inst_27216);

(statearr_27253_27273[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27240 === (10))){
var inst_27235 = (state_27239[(2)]);
var state_27239__$1 = state_27239;
var statearr_27254_27274 = state_27239__$1;
(statearr_27254_27274[(2)] = inst_27235);

(statearr_27254_27274[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27240 === (8))){
var inst_27216 = (state_27239[(7)]);
var inst_27226 = cljs.core.next.call(null,inst_27216);
var inst_27216__$1 = inst_27226;
var state_27239__$1 = (function (){var statearr_27255 = state_27239;
(statearr_27255[(7)] = inst_27216__$1);

return statearr_27255;
})();
var statearr_27256_27275 = state_27239__$1;
(statearr_27256_27275[(2)] = null);

(statearr_27256_27275[(1)] = (2));


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
var cljs$core$async$state_machine__26587__auto__ = null;
var cljs$core$async$state_machine__26587__auto____0 = (function (){
var statearr_27257 = [null,null,null,null,null,null,null,null];
(statearr_27257[(0)] = cljs$core$async$state_machine__26587__auto__);

(statearr_27257[(1)] = (1));

return statearr_27257;
});
var cljs$core$async$state_machine__26587__auto____1 = (function (state_27239){
while(true){
var ret_value__26588__auto__ = (function (){try{while(true){
var result__26589__auto__ = switch__26586__auto__.call(null,state_27239);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26589__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26589__auto__;
}
break;
}
}catch (e27258){if((e27258 instanceof Object)){
var ex__26590__auto__ = e27258;
var statearr_27259_27276 = state_27239;
(statearr_27259_27276[(5)] = ex__26590__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27239);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e27258;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27277 = state_27239;
state_27239 = G__27277;
continue;
} else {
return ret_value__26588__auto__;
}
break;
}
});
cljs$core$async$state_machine__26587__auto__ = function(state_27239){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__26587__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__26587__auto____1.call(this,state_27239);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__26587__auto____0;
cljs$core$async$state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__26587__auto____1;
return cljs$core$async$state_machine__26587__auto__;
})()
})();
var state__26683__auto__ = (function (){var statearr_27260 = f__26682__auto__.call(null);
(statearr_27260[(6)] = c__26681__auto__);

return statearr_27260;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26683__auto__);
}));

return c__26681__auto__;
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
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async27278 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Mult}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async27278 = (function (ch,cs,meta27279){
this.ch = ch;
this.cs = cs;
this.meta27279 = meta27279;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async27278.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_27280,meta27279__$1){
var self__ = this;
var _27280__$1 = this;
return (new cljs.core.async.t_cljs$core$async27278(self__.ch,self__.cs,meta27279__$1));
}));

(cljs.core.async.t_cljs$core$async27278.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_27280){
var self__ = this;
var _27280__$1 = this;
return self__.meta27279;
}));

(cljs.core.async.t_cljs$core$async27278.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async27278.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
}));

(cljs.core.async.t_cljs$core$async27278.prototype.cljs$core$async$Mult$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async27278.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = (function (_,ch__$1,close_QMARK_){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch__$1,close_QMARK_);

return null;
}));

(cljs.core.async.t_cljs$core$async27278.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = (function (_,ch__$1){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch__$1);

return null;
}));

(cljs.core.async.t_cljs$core$async27278.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return null;
}));

(cljs.core.async.t_cljs$core$async27278.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"meta27279","meta27279",-8965695,null)], null);
}));

(cljs.core.async.t_cljs$core$async27278.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async27278.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async27278");

(cljs.core.async.t_cljs$core$async27278.cljs$lang$ctorPrWriter = (function (this__4428__auto__,writer__4429__auto__,opt__4430__auto__){
return cljs.core._write.call(null,writer__4429__auto__,"cljs.core.async/t_cljs$core$async27278");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async27278.
 */
cljs.core.async.__GT_t_cljs$core$async27278 = (function cljs$core$async$mult_$___GT_t_cljs$core$async27278(ch__$1,cs__$1,meta27279){
return (new cljs.core.async.t_cljs$core$async27278(ch__$1,cs__$1,meta27279));
});

}

return (new cljs.core.async.t_cljs$core$async27278(ch,cs,cljs.core.PersistentArrayMap.EMPTY));
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
var c__26681__auto___27500 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26682__auto__ = (function (){var switch__26586__auto__ = (function (state_27415){
var state_val_27416 = (state_27415[(1)]);
if((state_val_27416 === (7))){
var inst_27411 = (state_27415[(2)]);
var state_27415__$1 = state_27415;
var statearr_27417_27501 = state_27415__$1;
(statearr_27417_27501[(2)] = inst_27411);

(statearr_27417_27501[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (20))){
var inst_27314 = (state_27415[(7)]);
var inst_27326 = cljs.core.first.call(null,inst_27314);
var inst_27327 = cljs.core.nth.call(null,inst_27326,(0),null);
var inst_27328 = cljs.core.nth.call(null,inst_27326,(1),null);
var state_27415__$1 = (function (){var statearr_27418 = state_27415;
(statearr_27418[(8)] = inst_27327);

return statearr_27418;
})();
if(cljs.core.truth_(inst_27328)){
var statearr_27419_27502 = state_27415__$1;
(statearr_27419_27502[(1)] = (22));

} else {
var statearr_27420_27503 = state_27415__$1;
(statearr_27420_27503[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (27))){
var inst_27283 = (state_27415[(9)]);
var inst_27356 = (state_27415[(10)]);
var inst_27358 = (state_27415[(11)]);
var inst_27363 = (state_27415[(12)]);
var inst_27363__$1 = cljs.core._nth.call(null,inst_27356,inst_27358);
var inst_27364 = cljs.core.async.put_BANG_.call(null,inst_27363__$1,inst_27283,done);
var state_27415__$1 = (function (){var statearr_27421 = state_27415;
(statearr_27421[(12)] = inst_27363__$1);

return statearr_27421;
})();
if(cljs.core.truth_(inst_27364)){
var statearr_27422_27504 = state_27415__$1;
(statearr_27422_27504[(1)] = (30));

} else {
var statearr_27423_27505 = state_27415__$1;
(statearr_27423_27505[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (1))){
var state_27415__$1 = state_27415;
var statearr_27424_27506 = state_27415__$1;
(statearr_27424_27506[(2)] = null);

(statearr_27424_27506[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (24))){
var inst_27314 = (state_27415[(7)]);
var inst_27333 = (state_27415[(2)]);
var inst_27334 = cljs.core.next.call(null,inst_27314);
var inst_27292 = inst_27334;
var inst_27293 = null;
var inst_27294 = (0);
var inst_27295 = (0);
var state_27415__$1 = (function (){var statearr_27425 = state_27415;
(statearr_27425[(13)] = inst_27295);

(statearr_27425[(14)] = inst_27292);

(statearr_27425[(15)] = inst_27293);

(statearr_27425[(16)] = inst_27294);

(statearr_27425[(17)] = inst_27333);

return statearr_27425;
})();
var statearr_27426_27507 = state_27415__$1;
(statearr_27426_27507[(2)] = null);

(statearr_27426_27507[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (39))){
var state_27415__$1 = state_27415;
var statearr_27430_27508 = state_27415__$1;
(statearr_27430_27508[(2)] = null);

(statearr_27430_27508[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (4))){
var inst_27283 = (state_27415[(9)]);
var inst_27283__$1 = (state_27415[(2)]);
var inst_27284 = (inst_27283__$1 == null);
var state_27415__$1 = (function (){var statearr_27431 = state_27415;
(statearr_27431[(9)] = inst_27283__$1);

return statearr_27431;
})();
if(cljs.core.truth_(inst_27284)){
var statearr_27432_27509 = state_27415__$1;
(statearr_27432_27509[(1)] = (5));

} else {
var statearr_27433_27510 = state_27415__$1;
(statearr_27433_27510[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (15))){
var inst_27295 = (state_27415[(13)]);
var inst_27292 = (state_27415[(14)]);
var inst_27293 = (state_27415[(15)]);
var inst_27294 = (state_27415[(16)]);
var inst_27310 = (state_27415[(2)]);
var inst_27311 = (inst_27295 + (1));
var tmp27427 = inst_27292;
var tmp27428 = inst_27293;
var tmp27429 = inst_27294;
var inst_27292__$1 = tmp27427;
var inst_27293__$1 = tmp27428;
var inst_27294__$1 = tmp27429;
var inst_27295__$1 = inst_27311;
var state_27415__$1 = (function (){var statearr_27434 = state_27415;
(statearr_27434[(13)] = inst_27295__$1);

(statearr_27434[(14)] = inst_27292__$1);

(statearr_27434[(15)] = inst_27293__$1);

(statearr_27434[(16)] = inst_27294__$1);

(statearr_27434[(18)] = inst_27310);

return statearr_27434;
})();
var statearr_27435_27511 = state_27415__$1;
(statearr_27435_27511[(2)] = null);

(statearr_27435_27511[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (21))){
var inst_27337 = (state_27415[(2)]);
var state_27415__$1 = state_27415;
var statearr_27439_27512 = state_27415__$1;
(statearr_27439_27512[(2)] = inst_27337);

(statearr_27439_27512[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (31))){
var inst_27363 = (state_27415[(12)]);
var inst_27367 = done.call(null,null);
var inst_27368 = cljs.core.async.untap_STAR_.call(null,m,inst_27363);
var state_27415__$1 = (function (){var statearr_27440 = state_27415;
(statearr_27440[(19)] = inst_27367);

return statearr_27440;
})();
var statearr_27441_27513 = state_27415__$1;
(statearr_27441_27513[(2)] = inst_27368);

(statearr_27441_27513[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (32))){
var inst_27356 = (state_27415[(10)]);
var inst_27358 = (state_27415[(11)]);
var inst_27355 = (state_27415[(20)]);
var inst_27357 = (state_27415[(21)]);
var inst_27370 = (state_27415[(2)]);
var inst_27371 = (inst_27358 + (1));
var tmp27436 = inst_27356;
var tmp27437 = inst_27355;
var tmp27438 = inst_27357;
var inst_27355__$1 = tmp27437;
var inst_27356__$1 = tmp27436;
var inst_27357__$1 = tmp27438;
var inst_27358__$1 = inst_27371;
var state_27415__$1 = (function (){var statearr_27442 = state_27415;
(statearr_27442[(10)] = inst_27356__$1);

(statearr_27442[(11)] = inst_27358__$1);

(statearr_27442[(20)] = inst_27355__$1);

(statearr_27442[(22)] = inst_27370);

(statearr_27442[(21)] = inst_27357__$1);

return statearr_27442;
})();
var statearr_27443_27514 = state_27415__$1;
(statearr_27443_27514[(2)] = null);

(statearr_27443_27514[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (40))){
var inst_27383 = (state_27415[(23)]);
var inst_27387 = done.call(null,null);
var inst_27388 = cljs.core.async.untap_STAR_.call(null,m,inst_27383);
var state_27415__$1 = (function (){var statearr_27444 = state_27415;
(statearr_27444[(24)] = inst_27387);

return statearr_27444;
})();
var statearr_27445_27515 = state_27415__$1;
(statearr_27445_27515[(2)] = inst_27388);

(statearr_27445_27515[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (33))){
var inst_27374 = (state_27415[(25)]);
var inst_27376 = cljs.core.chunked_seq_QMARK_.call(null,inst_27374);
var state_27415__$1 = state_27415;
if(inst_27376){
var statearr_27446_27516 = state_27415__$1;
(statearr_27446_27516[(1)] = (36));

} else {
var statearr_27447_27517 = state_27415__$1;
(statearr_27447_27517[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (13))){
var inst_27304 = (state_27415[(26)]);
var inst_27307 = cljs.core.async.close_BANG_.call(null,inst_27304);
var state_27415__$1 = state_27415;
var statearr_27448_27518 = state_27415__$1;
(statearr_27448_27518[(2)] = inst_27307);

(statearr_27448_27518[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (22))){
var inst_27327 = (state_27415[(8)]);
var inst_27330 = cljs.core.async.close_BANG_.call(null,inst_27327);
var state_27415__$1 = state_27415;
var statearr_27449_27519 = state_27415__$1;
(statearr_27449_27519[(2)] = inst_27330);

(statearr_27449_27519[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (36))){
var inst_27374 = (state_27415[(25)]);
var inst_27378 = cljs.core.chunk_first.call(null,inst_27374);
var inst_27379 = cljs.core.chunk_rest.call(null,inst_27374);
var inst_27380 = cljs.core.count.call(null,inst_27378);
var inst_27355 = inst_27379;
var inst_27356 = inst_27378;
var inst_27357 = inst_27380;
var inst_27358 = (0);
var state_27415__$1 = (function (){var statearr_27450 = state_27415;
(statearr_27450[(10)] = inst_27356);

(statearr_27450[(11)] = inst_27358);

(statearr_27450[(20)] = inst_27355);

(statearr_27450[(21)] = inst_27357);

return statearr_27450;
})();
var statearr_27451_27520 = state_27415__$1;
(statearr_27451_27520[(2)] = null);

(statearr_27451_27520[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (41))){
var inst_27374 = (state_27415[(25)]);
var inst_27390 = (state_27415[(2)]);
var inst_27391 = cljs.core.next.call(null,inst_27374);
var inst_27355 = inst_27391;
var inst_27356 = null;
var inst_27357 = (0);
var inst_27358 = (0);
var state_27415__$1 = (function (){var statearr_27452 = state_27415;
(statearr_27452[(10)] = inst_27356);

(statearr_27452[(11)] = inst_27358);

(statearr_27452[(27)] = inst_27390);

(statearr_27452[(20)] = inst_27355);

(statearr_27452[(21)] = inst_27357);

return statearr_27452;
})();
var statearr_27453_27521 = state_27415__$1;
(statearr_27453_27521[(2)] = null);

(statearr_27453_27521[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (43))){
var state_27415__$1 = state_27415;
var statearr_27454_27522 = state_27415__$1;
(statearr_27454_27522[(2)] = null);

(statearr_27454_27522[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (29))){
var inst_27399 = (state_27415[(2)]);
var state_27415__$1 = state_27415;
var statearr_27455_27523 = state_27415__$1;
(statearr_27455_27523[(2)] = inst_27399);

(statearr_27455_27523[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (44))){
var inst_27408 = (state_27415[(2)]);
var state_27415__$1 = (function (){var statearr_27456 = state_27415;
(statearr_27456[(28)] = inst_27408);

return statearr_27456;
})();
var statearr_27457_27524 = state_27415__$1;
(statearr_27457_27524[(2)] = null);

(statearr_27457_27524[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (6))){
var inst_27347 = (state_27415[(29)]);
var inst_27346 = cljs.core.deref.call(null,cs);
var inst_27347__$1 = cljs.core.keys.call(null,inst_27346);
var inst_27348 = cljs.core.count.call(null,inst_27347__$1);
var inst_27349 = cljs.core.reset_BANG_.call(null,dctr,inst_27348);
var inst_27354 = cljs.core.seq.call(null,inst_27347__$1);
var inst_27355 = inst_27354;
var inst_27356 = null;
var inst_27357 = (0);
var inst_27358 = (0);
var state_27415__$1 = (function (){var statearr_27458 = state_27415;
(statearr_27458[(10)] = inst_27356);

(statearr_27458[(11)] = inst_27358);

(statearr_27458[(20)] = inst_27355);

(statearr_27458[(29)] = inst_27347__$1);

(statearr_27458[(21)] = inst_27357);

(statearr_27458[(30)] = inst_27349);

return statearr_27458;
})();
var statearr_27459_27525 = state_27415__$1;
(statearr_27459_27525[(2)] = null);

(statearr_27459_27525[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (28))){
var inst_27374 = (state_27415[(25)]);
var inst_27355 = (state_27415[(20)]);
var inst_27374__$1 = cljs.core.seq.call(null,inst_27355);
var state_27415__$1 = (function (){var statearr_27460 = state_27415;
(statearr_27460[(25)] = inst_27374__$1);

return statearr_27460;
})();
if(inst_27374__$1){
var statearr_27461_27526 = state_27415__$1;
(statearr_27461_27526[(1)] = (33));

} else {
var statearr_27462_27527 = state_27415__$1;
(statearr_27462_27527[(1)] = (34));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (25))){
var inst_27358 = (state_27415[(11)]);
var inst_27357 = (state_27415[(21)]);
var inst_27360 = (inst_27358 < inst_27357);
var inst_27361 = inst_27360;
var state_27415__$1 = state_27415;
if(cljs.core.truth_(inst_27361)){
var statearr_27463_27528 = state_27415__$1;
(statearr_27463_27528[(1)] = (27));

} else {
var statearr_27464_27529 = state_27415__$1;
(statearr_27464_27529[(1)] = (28));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (34))){
var state_27415__$1 = state_27415;
var statearr_27465_27530 = state_27415__$1;
(statearr_27465_27530[(2)] = null);

(statearr_27465_27530[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (17))){
var state_27415__$1 = state_27415;
var statearr_27466_27531 = state_27415__$1;
(statearr_27466_27531[(2)] = null);

(statearr_27466_27531[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (3))){
var inst_27413 = (state_27415[(2)]);
var state_27415__$1 = state_27415;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_27415__$1,inst_27413);
} else {
if((state_val_27416 === (12))){
var inst_27342 = (state_27415[(2)]);
var state_27415__$1 = state_27415;
var statearr_27467_27532 = state_27415__$1;
(statearr_27467_27532[(2)] = inst_27342);

(statearr_27467_27532[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (2))){
var state_27415__$1 = state_27415;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27415__$1,(4),ch);
} else {
if((state_val_27416 === (23))){
var state_27415__$1 = state_27415;
var statearr_27468_27533 = state_27415__$1;
(statearr_27468_27533[(2)] = null);

(statearr_27468_27533[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (35))){
var inst_27397 = (state_27415[(2)]);
var state_27415__$1 = state_27415;
var statearr_27469_27534 = state_27415__$1;
(statearr_27469_27534[(2)] = inst_27397);

(statearr_27469_27534[(1)] = (29));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (19))){
var inst_27314 = (state_27415[(7)]);
var inst_27318 = cljs.core.chunk_first.call(null,inst_27314);
var inst_27319 = cljs.core.chunk_rest.call(null,inst_27314);
var inst_27320 = cljs.core.count.call(null,inst_27318);
var inst_27292 = inst_27319;
var inst_27293 = inst_27318;
var inst_27294 = inst_27320;
var inst_27295 = (0);
var state_27415__$1 = (function (){var statearr_27470 = state_27415;
(statearr_27470[(13)] = inst_27295);

(statearr_27470[(14)] = inst_27292);

(statearr_27470[(15)] = inst_27293);

(statearr_27470[(16)] = inst_27294);

return statearr_27470;
})();
var statearr_27471_27535 = state_27415__$1;
(statearr_27471_27535[(2)] = null);

(statearr_27471_27535[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (11))){
var inst_27292 = (state_27415[(14)]);
var inst_27314 = (state_27415[(7)]);
var inst_27314__$1 = cljs.core.seq.call(null,inst_27292);
var state_27415__$1 = (function (){var statearr_27472 = state_27415;
(statearr_27472[(7)] = inst_27314__$1);

return statearr_27472;
})();
if(inst_27314__$1){
var statearr_27473_27536 = state_27415__$1;
(statearr_27473_27536[(1)] = (16));

} else {
var statearr_27474_27537 = state_27415__$1;
(statearr_27474_27537[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (9))){
var inst_27344 = (state_27415[(2)]);
var state_27415__$1 = state_27415;
var statearr_27475_27538 = state_27415__$1;
(statearr_27475_27538[(2)] = inst_27344);

(statearr_27475_27538[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (5))){
var inst_27290 = cljs.core.deref.call(null,cs);
var inst_27291 = cljs.core.seq.call(null,inst_27290);
var inst_27292 = inst_27291;
var inst_27293 = null;
var inst_27294 = (0);
var inst_27295 = (0);
var state_27415__$1 = (function (){var statearr_27476 = state_27415;
(statearr_27476[(13)] = inst_27295);

(statearr_27476[(14)] = inst_27292);

(statearr_27476[(15)] = inst_27293);

(statearr_27476[(16)] = inst_27294);

return statearr_27476;
})();
var statearr_27477_27539 = state_27415__$1;
(statearr_27477_27539[(2)] = null);

(statearr_27477_27539[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (14))){
var state_27415__$1 = state_27415;
var statearr_27478_27540 = state_27415__$1;
(statearr_27478_27540[(2)] = null);

(statearr_27478_27540[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (45))){
var inst_27405 = (state_27415[(2)]);
var state_27415__$1 = state_27415;
var statearr_27479_27541 = state_27415__$1;
(statearr_27479_27541[(2)] = inst_27405);

(statearr_27479_27541[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (26))){
var inst_27347 = (state_27415[(29)]);
var inst_27401 = (state_27415[(2)]);
var inst_27402 = cljs.core.seq.call(null,inst_27347);
var state_27415__$1 = (function (){var statearr_27480 = state_27415;
(statearr_27480[(31)] = inst_27401);

return statearr_27480;
})();
if(inst_27402){
var statearr_27481_27542 = state_27415__$1;
(statearr_27481_27542[(1)] = (42));

} else {
var statearr_27482_27543 = state_27415__$1;
(statearr_27482_27543[(1)] = (43));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (16))){
var inst_27314 = (state_27415[(7)]);
var inst_27316 = cljs.core.chunked_seq_QMARK_.call(null,inst_27314);
var state_27415__$1 = state_27415;
if(inst_27316){
var statearr_27483_27544 = state_27415__$1;
(statearr_27483_27544[(1)] = (19));

} else {
var statearr_27484_27545 = state_27415__$1;
(statearr_27484_27545[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (38))){
var inst_27394 = (state_27415[(2)]);
var state_27415__$1 = state_27415;
var statearr_27485_27546 = state_27415__$1;
(statearr_27485_27546[(2)] = inst_27394);

(statearr_27485_27546[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (30))){
var state_27415__$1 = state_27415;
var statearr_27486_27547 = state_27415__$1;
(statearr_27486_27547[(2)] = null);

(statearr_27486_27547[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (10))){
var inst_27295 = (state_27415[(13)]);
var inst_27293 = (state_27415[(15)]);
var inst_27303 = cljs.core._nth.call(null,inst_27293,inst_27295);
var inst_27304 = cljs.core.nth.call(null,inst_27303,(0),null);
var inst_27305 = cljs.core.nth.call(null,inst_27303,(1),null);
var state_27415__$1 = (function (){var statearr_27487 = state_27415;
(statearr_27487[(26)] = inst_27304);

return statearr_27487;
})();
if(cljs.core.truth_(inst_27305)){
var statearr_27488_27548 = state_27415__$1;
(statearr_27488_27548[(1)] = (13));

} else {
var statearr_27489_27549 = state_27415__$1;
(statearr_27489_27549[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (18))){
var inst_27340 = (state_27415[(2)]);
var state_27415__$1 = state_27415;
var statearr_27490_27550 = state_27415__$1;
(statearr_27490_27550[(2)] = inst_27340);

(statearr_27490_27550[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (42))){
var state_27415__$1 = state_27415;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27415__$1,(45),dchan);
} else {
if((state_val_27416 === (37))){
var inst_27383 = (state_27415[(23)]);
var inst_27283 = (state_27415[(9)]);
var inst_27374 = (state_27415[(25)]);
var inst_27383__$1 = cljs.core.first.call(null,inst_27374);
var inst_27384 = cljs.core.async.put_BANG_.call(null,inst_27383__$1,inst_27283,done);
var state_27415__$1 = (function (){var statearr_27491 = state_27415;
(statearr_27491[(23)] = inst_27383__$1);

return statearr_27491;
})();
if(cljs.core.truth_(inst_27384)){
var statearr_27492_27551 = state_27415__$1;
(statearr_27492_27551[(1)] = (39));

} else {
var statearr_27493_27552 = state_27415__$1;
(statearr_27493_27552[(1)] = (40));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (8))){
var inst_27295 = (state_27415[(13)]);
var inst_27294 = (state_27415[(16)]);
var inst_27297 = (inst_27295 < inst_27294);
var inst_27298 = inst_27297;
var state_27415__$1 = state_27415;
if(cljs.core.truth_(inst_27298)){
var statearr_27494_27553 = state_27415__$1;
(statearr_27494_27553[(1)] = (10));

} else {
var statearr_27495_27554 = state_27415__$1;
(statearr_27495_27554[(1)] = (11));

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
var cljs$core$async$mult_$_state_machine__26587__auto__ = null;
var cljs$core$async$mult_$_state_machine__26587__auto____0 = (function (){
var statearr_27496 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_27496[(0)] = cljs$core$async$mult_$_state_machine__26587__auto__);

(statearr_27496[(1)] = (1));

return statearr_27496;
});
var cljs$core$async$mult_$_state_machine__26587__auto____1 = (function (state_27415){
while(true){
var ret_value__26588__auto__ = (function (){try{while(true){
var result__26589__auto__ = switch__26586__auto__.call(null,state_27415);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26589__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26589__auto__;
}
break;
}
}catch (e27497){if((e27497 instanceof Object)){
var ex__26590__auto__ = e27497;
var statearr_27498_27555 = state_27415;
(statearr_27498_27555[(5)] = ex__26590__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27415);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e27497;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27556 = state_27415;
state_27415 = G__27556;
continue;
} else {
return ret_value__26588__auto__;
}
break;
}
});
cljs$core$async$mult_$_state_machine__26587__auto__ = function(state_27415){
switch(arguments.length){
case 0:
return cljs$core$async$mult_$_state_machine__26587__auto____0.call(this);
case 1:
return cljs$core$async$mult_$_state_machine__26587__auto____1.call(this,state_27415);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mult_$_state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mult_$_state_machine__26587__auto____0;
cljs$core$async$mult_$_state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mult_$_state_machine__26587__auto____1;
return cljs$core$async$mult_$_state_machine__26587__auto__;
})()
})();
var state__26683__auto__ = (function (){var statearr_27499 = f__26682__auto__.call(null);
(statearr_27499[(6)] = c__26681__auto___27500);

return statearr_27499;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26683__auto__);
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
var G__27558 = arguments.length;
switch (G__27558) {
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
var len__4789__auto___27570 = arguments.length;
var i__4790__auto___27571 = (0);
while(true){
if((i__4790__auto___27571 < len__4789__auto___27570)){
args__4795__auto__.push((arguments[i__4790__auto___27571]));

var G__27572 = (i__4790__auto___27571 + (1));
i__4790__auto___27571 = G__27572;
continue;
} else {
}
break;
}

var argseq__4796__auto__ = ((((3) < args__4795__auto__.length))?(new cljs.core.IndexedSeq(args__4795__auto__.slice((3)),(0),null)):null);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__4796__auto__);
});

(cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (state,cont_block,ports,p__27564){
var map__27565 = p__27564;
var map__27565__$1 = (((((!((map__27565 == null))))?(((((map__27565.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__27565.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__27565):map__27565);
var opts = map__27565__$1;
var statearr_27567_27573 = state;
(statearr_27567_27573[(1)] = cont_block);


var temp__5735__auto__ = cljs.core.async.do_alts.call(null,(function (val){
var statearr_27568_27574 = state;
(statearr_27568_27574[(2)] = val);


return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state);
}),ports,opts);
if(cljs.core.truth_(temp__5735__auto__)){
var cb = temp__5735__auto__;
var statearr_27569_27575 = state;
(statearr_27569_27575[(2)] = cljs.core.deref.call(null,cb));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}));

(cljs.core.async.ioc_alts_BANG_.cljs$lang$maxFixedArity = (3));

/** @this {Function} */
(cljs.core.async.ioc_alts_BANG_.cljs$lang$applyTo = (function (seq27560){
var G__27561 = cljs.core.first.call(null,seq27560);
var seq27560__$1 = cljs.core.next.call(null,seq27560);
var G__27562 = cljs.core.first.call(null,seq27560__$1);
var seq27560__$2 = cljs.core.next.call(null,seq27560__$1);
var G__27563 = cljs.core.first.call(null,seq27560__$2);
var seq27560__$3 = cljs.core.next.call(null,seq27560__$2);
var self__4776__auto__ = this;
return self__4776__auto__.cljs$core$IFn$_invoke$arity$variadic(G__27561,G__27562,G__27563,seq27560__$3);
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
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async27576 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mix}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async27576 = (function (change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta27577){
this.change = change;
this.solo_mode = solo_mode;
this.pick = pick;
this.cs = cs;
this.calc_state = calc_state;
this.out = out;
this.changed = changed;
this.solo_modes = solo_modes;
this.attrs = attrs;
this.meta27577 = meta27577;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async27576.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_27578,meta27577__$1){
var self__ = this;
var _27578__$1 = this;
return (new cljs.core.async.t_cljs$core$async27576(self__.change,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta27577__$1));
}));

(cljs.core.async.t_cljs$core$async27576.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_27578){
var self__ = this;
var _27578__$1 = this;
return self__.meta27577;
}));

(cljs.core.async.t_cljs$core$async27576.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async27576.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.out;
}));

(cljs.core.async.t_cljs$core$async27576.prototype.cljs$core$async$Mix$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async27576.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);

return self__.changed.call(null);
}));

(cljs.core.async.t_cljs$core$async27576.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch);

return self__.changed.call(null);
}));

(cljs.core.async.t_cljs$core$async27576.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return self__.changed.call(null);
}));

(cljs.core.async.t_cljs$core$async27576.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = (function (_,state_map){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.partial.call(null,cljs.core.merge_with,cljs.core.merge),state_map);

return self__.changed.call(null);
}));

(cljs.core.async.t_cljs$core$async27576.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = (function (_,mode){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.solo_modes.call(null,mode))){
} else {
throw (new Error(["Assert failed: ",["mode must be one of: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.solo_modes)].join(''),"\n","(solo-modes mode)"].join('')));
}

cljs.core.reset_BANG_.call(null,self__.solo_mode,mode);

return self__.changed.call(null);
}));

(cljs.core.async.t_cljs$core$async27576.getBasis = (function (){
return new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"change","change",477485025,null),new cljs.core.Symbol(null,"solo-mode","solo-mode",2031788074,null),new cljs.core.Symbol(null,"pick","pick",1300068175,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"calc-state","calc-state",-349968968,null),new cljs.core.Symbol(null,"out","out",729986010,null),new cljs.core.Symbol(null,"changed","changed",-2083710852,null),new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"attrs","attrs",-450137186,null),new cljs.core.Symbol(null,"meta27577","meta27577",-176058009,null)], null);
}));

(cljs.core.async.t_cljs$core$async27576.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async27576.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async27576");

(cljs.core.async.t_cljs$core$async27576.cljs$lang$ctorPrWriter = (function (this__4428__auto__,writer__4429__auto__,opt__4430__auto__){
return cljs.core._write.call(null,writer__4429__auto__,"cljs.core.async/t_cljs$core$async27576");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async27576.
 */
cljs.core.async.__GT_t_cljs$core$async27576 = (function cljs$core$async$mix_$___GT_t_cljs$core$async27576(change__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta27577){
return (new cljs.core.async.t_cljs$core$async27576(change__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta27577));
});

}

return (new cljs.core.async.t_cljs$core$async27576(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__26681__auto___27740 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26682__auto__ = (function (){var switch__26586__auto__ = (function (state_27680){
var state_val_27681 = (state_27680[(1)]);
if((state_val_27681 === (7))){
var inst_27595 = (state_27680[(2)]);
var state_27680__$1 = state_27680;
var statearr_27682_27741 = state_27680__$1;
(statearr_27682_27741[(2)] = inst_27595);

(statearr_27682_27741[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27681 === (20))){
var inst_27607 = (state_27680[(7)]);
var state_27680__$1 = state_27680;
var statearr_27683_27742 = state_27680__$1;
(statearr_27683_27742[(2)] = inst_27607);

(statearr_27683_27742[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27681 === (27))){
var state_27680__$1 = state_27680;
var statearr_27684_27743 = state_27680__$1;
(statearr_27684_27743[(2)] = null);

(statearr_27684_27743[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27681 === (1))){
var inst_27582 = (state_27680[(8)]);
var inst_27582__$1 = calc_state.call(null);
var inst_27584 = (inst_27582__$1 == null);
var inst_27585 = cljs.core.not.call(null,inst_27584);
var state_27680__$1 = (function (){var statearr_27685 = state_27680;
(statearr_27685[(8)] = inst_27582__$1);

return statearr_27685;
})();
if(inst_27585){
var statearr_27686_27744 = state_27680__$1;
(statearr_27686_27744[(1)] = (2));

} else {
var statearr_27687_27745 = state_27680__$1;
(statearr_27687_27745[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27681 === (24))){
var inst_27640 = (state_27680[(9)]);
var inst_27631 = (state_27680[(10)]);
var inst_27654 = (state_27680[(11)]);
var inst_27654__$1 = inst_27631.call(null,inst_27640);
var state_27680__$1 = (function (){var statearr_27688 = state_27680;
(statearr_27688[(11)] = inst_27654__$1);

return statearr_27688;
})();
if(cljs.core.truth_(inst_27654__$1)){
var statearr_27689_27746 = state_27680__$1;
(statearr_27689_27746[(1)] = (29));

} else {
var statearr_27690_27747 = state_27680__$1;
(statearr_27690_27747[(1)] = (30));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27681 === (4))){
var inst_27598 = (state_27680[(2)]);
var state_27680__$1 = state_27680;
if(cljs.core.truth_(inst_27598)){
var statearr_27691_27748 = state_27680__$1;
(statearr_27691_27748[(1)] = (8));

} else {
var statearr_27692_27749 = state_27680__$1;
(statearr_27692_27749[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27681 === (15))){
var inst_27625 = (state_27680[(2)]);
var state_27680__$1 = state_27680;
if(cljs.core.truth_(inst_27625)){
var statearr_27693_27750 = state_27680__$1;
(statearr_27693_27750[(1)] = (19));

} else {
var statearr_27694_27751 = state_27680__$1;
(statearr_27694_27751[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27681 === (21))){
var inst_27630 = (state_27680[(12)]);
var inst_27630__$1 = (state_27680[(2)]);
var inst_27631 = cljs.core.get.call(null,inst_27630__$1,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_27632 = cljs.core.get.call(null,inst_27630__$1,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_27633 = cljs.core.get.call(null,inst_27630__$1,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var state_27680__$1 = (function (){var statearr_27695 = state_27680;
(statearr_27695[(13)] = inst_27632);

(statearr_27695[(10)] = inst_27631);

(statearr_27695[(12)] = inst_27630__$1);

return statearr_27695;
})();
return cljs.core.async.ioc_alts_BANG_.call(null,state_27680__$1,(22),inst_27633);
} else {
if((state_val_27681 === (31))){
var inst_27662 = (state_27680[(2)]);
var state_27680__$1 = state_27680;
if(cljs.core.truth_(inst_27662)){
var statearr_27696_27752 = state_27680__$1;
(statearr_27696_27752[(1)] = (32));

} else {
var statearr_27697_27753 = state_27680__$1;
(statearr_27697_27753[(1)] = (33));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27681 === (32))){
var inst_27639 = (state_27680[(14)]);
var state_27680__$1 = state_27680;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_27680__$1,(35),out,inst_27639);
} else {
if((state_val_27681 === (33))){
var inst_27630 = (state_27680[(12)]);
var inst_27607 = inst_27630;
var state_27680__$1 = (function (){var statearr_27698 = state_27680;
(statearr_27698[(7)] = inst_27607);

return statearr_27698;
})();
var statearr_27699_27754 = state_27680__$1;
(statearr_27699_27754[(2)] = null);

(statearr_27699_27754[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27681 === (13))){
var inst_27607 = (state_27680[(7)]);
var inst_27614 = inst_27607.cljs$lang$protocol_mask$partition0$;
var inst_27615 = (inst_27614 & (64));
var inst_27616 = inst_27607.cljs$core$ISeq$;
var inst_27617 = (cljs.core.PROTOCOL_SENTINEL === inst_27616);
var inst_27618 = ((inst_27615) || (inst_27617));
var state_27680__$1 = state_27680;
if(cljs.core.truth_(inst_27618)){
var statearr_27700_27755 = state_27680__$1;
(statearr_27700_27755[(1)] = (16));

} else {
var statearr_27701_27756 = state_27680__$1;
(statearr_27701_27756[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27681 === (22))){
var inst_27639 = (state_27680[(14)]);
var inst_27640 = (state_27680[(9)]);
var inst_27638 = (state_27680[(2)]);
var inst_27639__$1 = cljs.core.nth.call(null,inst_27638,(0),null);
var inst_27640__$1 = cljs.core.nth.call(null,inst_27638,(1),null);
var inst_27641 = (inst_27639__$1 == null);
var inst_27642 = cljs.core._EQ_.call(null,inst_27640__$1,change);
var inst_27643 = ((inst_27641) || (inst_27642));
var state_27680__$1 = (function (){var statearr_27702 = state_27680;
(statearr_27702[(14)] = inst_27639__$1);

(statearr_27702[(9)] = inst_27640__$1);

return statearr_27702;
})();
if(cljs.core.truth_(inst_27643)){
var statearr_27703_27757 = state_27680__$1;
(statearr_27703_27757[(1)] = (23));

} else {
var statearr_27704_27758 = state_27680__$1;
(statearr_27704_27758[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27681 === (36))){
var inst_27630 = (state_27680[(12)]);
var inst_27607 = inst_27630;
var state_27680__$1 = (function (){var statearr_27705 = state_27680;
(statearr_27705[(7)] = inst_27607);

return statearr_27705;
})();
var statearr_27706_27759 = state_27680__$1;
(statearr_27706_27759[(2)] = null);

(statearr_27706_27759[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27681 === (29))){
var inst_27654 = (state_27680[(11)]);
var state_27680__$1 = state_27680;
var statearr_27707_27760 = state_27680__$1;
(statearr_27707_27760[(2)] = inst_27654);

(statearr_27707_27760[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27681 === (6))){
var state_27680__$1 = state_27680;
var statearr_27708_27761 = state_27680__$1;
(statearr_27708_27761[(2)] = false);

(statearr_27708_27761[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27681 === (28))){
var inst_27650 = (state_27680[(2)]);
var inst_27651 = calc_state.call(null);
var inst_27607 = inst_27651;
var state_27680__$1 = (function (){var statearr_27709 = state_27680;
(statearr_27709[(7)] = inst_27607);

(statearr_27709[(15)] = inst_27650);

return statearr_27709;
})();
var statearr_27710_27762 = state_27680__$1;
(statearr_27710_27762[(2)] = null);

(statearr_27710_27762[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27681 === (25))){
var inst_27676 = (state_27680[(2)]);
var state_27680__$1 = state_27680;
var statearr_27711_27763 = state_27680__$1;
(statearr_27711_27763[(2)] = inst_27676);

(statearr_27711_27763[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27681 === (34))){
var inst_27674 = (state_27680[(2)]);
var state_27680__$1 = state_27680;
var statearr_27712_27764 = state_27680__$1;
(statearr_27712_27764[(2)] = inst_27674);

(statearr_27712_27764[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27681 === (17))){
var state_27680__$1 = state_27680;
var statearr_27713_27765 = state_27680__$1;
(statearr_27713_27765[(2)] = false);

(statearr_27713_27765[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27681 === (3))){
var state_27680__$1 = state_27680;
var statearr_27714_27766 = state_27680__$1;
(statearr_27714_27766[(2)] = false);

(statearr_27714_27766[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27681 === (12))){
var inst_27678 = (state_27680[(2)]);
var state_27680__$1 = state_27680;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_27680__$1,inst_27678);
} else {
if((state_val_27681 === (2))){
var inst_27582 = (state_27680[(8)]);
var inst_27587 = inst_27582.cljs$lang$protocol_mask$partition0$;
var inst_27588 = (inst_27587 & (64));
var inst_27589 = inst_27582.cljs$core$ISeq$;
var inst_27590 = (cljs.core.PROTOCOL_SENTINEL === inst_27589);
var inst_27591 = ((inst_27588) || (inst_27590));
var state_27680__$1 = state_27680;
if(cljs.core.truth_(inst_27591)){
var statearr_27715_27767 = state_27680__$1;
(statearr_27715_27767[(1)] = (5));

} else {
var statearr_27716_27768 = state_27680__$1;
(statearr_27716_27768[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27681 === (23))){
var inst_27639 = (state_27680[(14)]);
var inst_27645 = (inst_27639 == null);
var state_27680__$1 = state_27680;
if(cljs.core.truth_(inst_27645)){
var statearr_27717_27769 = state_27680__$1;
(statearr_27717_27769[(1)] = (26));

} else {
var statearr_27718_27770 = state_27680__$1;
(statearr_27718_27770[(1)] = (27));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27681 === (35))){
var inst_27665 = (state_27680[(2)]);
var state_27680__$1 = state_27680;
if(cljs.core.truth_(inst_27665)){
var statearr_27719_27771 = state_27680__$1;
(statearr_27719_27771[(1)] = (36));

} else {
var statearr_27720_27772 = state_27680__$1;
(statearr_27720_27772[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27681 === (19))){
var inst_27607 = (state_27680[(7)]);
var inst_27627 = cljs.core.apply.call(null,cljs.core.hash_map,inst_27607);
var state_27680__$1 = state_27680;
var statearr_27721_27773 = state_27680__$1;
(statearr_27721_27773[(2)] = inst_27627);

(statearr_27721_27773[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27681 === (11))){
var inst_27607 = (state_27680[(7)]);
var inst_27611 = (inst_27607 == null);
var inst_27612 = cljs.core.not.call(null,inst_27611);
var state_27680__$1 = state_27680;
if(inst_27612){
var statearr_27722_27774 = state_27680__$1;
(statearr_27722_27774[(1)] = (13));

} else {
var statearr_27723_27775 = state_27680__$1;
(statearr_27723_27775[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27681 === (9))){
var inst_27582 = (state_27680[(8)]);
var state_27680__$1 = state_27680;
var statearr_27724_27776 = state_27680__$1;
(statearr_27724_27776[(2)] = inst_27582);

(statearr_27724_27776[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27681 === (5))){
var state_27680__$1 = state_27680;
var statearr_27725_27777 = state_27680__$1;
(statearr_27725_27777[(2)] = true);

(statearr_27725_27777[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27681 === (14))){
var state_27680__$1 = state_27680;
var statearr_27726_27778 = state_27680__$1;
(statearr_27726_27778[(2)] = false);

(statearr_27726_27778[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27681 === (26))){
var inst_27640 = (state_27680[(9)]);
var inst_27647 = cljs.core.swap_BANG_.call(null,cs,cljs.core.dissoc,inst_27640);
var state_27680__$1 = state_27680;
var statearr_27727_27779 = state_27680__$1;
(statearr_27727_27779[(2)] = inst_27647);

(statearr_27727_27779[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27681 === (16))){
var state_27680__$1 = state_27680;
var statearr_27728_27780 = state_27680__$1;
(statearr_27728_27780[(2)] = true);

(statearr_27728_27780[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27681 === (38))){
var inst_27670 = (state_27680[(2)]);
var state_27680__$1 = state_27680;
var statearr_27729_27781 = state_27680__$1;
(statearr_27729_27781[(2)] = inst_27670);

(statearr_27729_27781[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27681 === (30))){
var inst_27632 = (state_27680[(13)]);
var inst_27640 = (state_27680[(9)]);
var inst_27631 = (state_27680[(10)]);
var inst_27657 = cljs.core.empty_QMARK_.call(null,inst_27631);
var inst_27658 = inst_27632.call(null,inst_27640);
var inst_27659 = cljs.core.not.call(null,inst_27658);
var inst_27660 = ((inst_27657) && (inst_27659));
var state_27680__$1 = state_27680;
var statearr_27730_27782 = state_27680__$1;
(statearr_27730_27782[(2)] = inst_27660);

(statearr_27730_27782[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27681 === (10))){
var inst_27582 = (state_27680[(8)]);
var inst_27603 = (state_27680[(2)]);
var inst_27604 = cljs.core.get.call(null,inst_27603,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_27605 = cljs.core.get.call(null,inst_27603,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_27606 = cljs.core.get.call(null,inst_27603,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var inst_27607 = inst_27582;
var state_27680__$1 = (function (){var statearr_27731 = state_27680;
(statearr_27731[(7)] = inst_27607);

(statearr_27731[(16)] = inst_27605);

(statearr_27731[(17)] = inst_27604);

(statearr_27731[(18)] = inst_27606);

return statearr_27731;
})();
var statearr_27732_27783 = state_27680__$1;
(statearr_27732_27783[(2)] = null);

(statearr_27732_27783[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27681 === (18))){
var inst_27622 = (state_27680[(2)]);
var state_27680__$1 = state_27680;
var statearr_27733_27784 = state_27680__$1;
(statearr_27733_27784[(2)] = inst_27622);

(statearr_27733_27784[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27681 === (37))){
var state_27680__$1 = state_27680;
var statearr_27734_27785 = state_27680__$1;
(statearr_27734_27785[(2)] = null);

(statearr_27734_27785[(1)] = (38));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27681 === (8))){
var inst_27582 = (state_27680[(8)]);
var inst_27600 = cljs.core.apply.call(null,cljs.core.hash_map,inst_27582);
var state_27680__$1 = state_27680;
var statearr_27735_27786 = state_27680__$1;
(statearr_27735_27786[(2)] = inst_27600);

(statearr_27735_27786[(1)] = (10));


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
var cljs$core$async$mix_$_state_machine__26587__auto__ = null;
var cljs$core$async$mix_$_state_machine__26587__auto____0 = (function (){
var statearr_27736 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_27736[(0)] = cljs$core$async$mix_$_state_machine__26587__auto__);

(statearr_27736[(1)] = (1));

return statearr_27736;
});
var cljs$core$async$mix_$_state_machine__26587__auto____1 = (function (state_27680){
while(true){
var ret_value__26588__auto__ = (function (){try{while(true){
var result__26589__auto__ = switch__26586__auto__.call(null,state_27680);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26589__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26589__auto__;
}
break;
}
}catch (e27737){if((e27737 instanceof Object)){
var ex__26590__auto__ = e27737;
var statearr_27738_27787 = state_27680;
(statearr_27738_27787[(5)] = ex__26590__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27680);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e27737;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27788 = state_27680;
state_27680 = G__27788;
continue;
} else {
return ret_value__26588__auto__;
}
break;
}
});
cljs$core$async$mix_$_state_machine__26587__auto__ = function(state_27680){
switch(arguments.length){
case 0:
return cljs$core$async$mix_$_state_machine__26587__auto____0.call(this);
case 1:
return cljs$core$async$mix_$_state_machine__26587__auto____1.call(this,state_27680);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mix_$_state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mix_$_state_machine__26587__auto____0;
cljs$core$async$mix_$_state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mix_$_state_machine__26587__auto____1;
return cljs$core$async$mix_$_state_machine__26587__auto__;
})()
})();
var state__26683__auto__ = (function (){var statearr_27739 = f__26682__auto__.call(null);
(statearr_27739[(6)] = c__26681__auto___27740);

return statearr_27739;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26683__auto__);
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
var G__27790 = arguments.length;
switch (G__27790) {
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
var G__27794 = arguments.length;
switch (G__27794) {
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
return cljs.core.get.call(null,cljs.core.swap_BANG_.call(null,mults,(function (p1__27792_SHARP_){
if(cljs.core.truth_(p1__27792_SHARP_.call(null,topic))){
return p1__27792_SHARP_;
} else {
return cljs.core.assoc.call(null,p1__27792_SHARP_,topic,cljs.core.async.mult.call(null,cljs.core.async.chan.call(null,buf_fn.call(null,topic))));
}
})),topic);
}
});
var p = (function (){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async27795 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Pub}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async27795 = (function (ch,topic_fn,buf_fn,mults,ensure_mult,meta27796){
this.ch = ch;
this.topic_fn = topic_fn;
this.buf_fn = buf_fn;
this.mults = mults;
this.ensure_mult = ensure_mult;
this.meta27796 = meta27796;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async27795.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_27797,meta27796__$1){
var self__ = this;
var _27797__$1 = this;
return (new cljs.core.async.t_cljs$core$async27795(self__.ch,self__.topic_fn,self__.buf_fn,self__.mults,self__.ensure_mult,meta27796__$1));
}));

(cljs.core.async.t_cljs$core$async27795.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_27797){
var self__ = this;
var _27797__$1 = this;
return self__.meta27796;
}));

(cljs.core.async.t_cljs$core$async27795.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async27795.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
}));

(cljs.core.async.t_cljs$core$async27795.prototype.cljs$core$async$Pub$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async27795.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = (function (p,topic,ch__$1,close_QMARK_){
var self__ = this;
var p__$1 = this;
var m = self__.ensure_mult.call(null,topic);
return cljs.core.async.tap.call(null,m,ch__$1,close_QMARK_);
}));

(cljs.core.async.t_cljs$core$async27795.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = (function (p,topic,ch__$1){
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

(cljs.core.async.t_cljs$core$async27795.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.reset_BANG_.call(null,self__.mults,cljs.core.PersistentArrayMap.EMPTY);
}));

(cljs.core.async.t_cljs$core$async27795.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = (function (_,topic){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.call(null,self__.mults,cljs.core.dissoc,topic);
}));

(cljs.core.async.t_cljs$core$async27795.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"topic-fn","topic-fn",-862449736,null),new cljs.core.Symbol(null,"buf-fn","buf-fn",-1200281591,null),new cljs.core.Symbol(null,"mults","mults",-461114485,null),new cljs.core.Symbol(null,"ensure-mult","ensure-mult",1796584816,null),new cljs.core.Symbol(null,"meta27796","meta27796",661627705,null)], null);
}));

(cljs.core.async.t_cljs$core$async27795.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async27795.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async27795");

(cljs.core.async.t_cljs$core$async27795.cljs$lang$ctorPrWriter = (function (this__4428__auto__,writer__4429__auto__,opt__4430__auto__){
return cljs.core._write.call(null,writer__4429__auto__,"cljs.core.async/t_cljs$core$async27795");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async27795.
 */
cljs.core.async.__GT_t_cljs$core$async27795 = (function cljs$core$async$__GT_t_cljs$core$async27795(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta27796){
return (new cljs.core.async.t_cljs$core$async27795(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta27796));
});

}

return (new cljs.core.async.t_cljs$core$async27795(ch,topic_fn,buf_fn,mults,ensure_mult,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__26681__auto___27915 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26682__auto__ = (function (){var switch__26586__auto__ = (function (state_27869){
var state_val_27870 = (state_27869[(1)]);
if((state_val_27870 === (7))){
var inst_27865 = (state_27869[(2)]);
var state_27869__$1 = state_27869;
var statearr_27871_27916 = state_27869__$1;
(statearr_27871_27916[(2)] = inst_27865);

(statearr_27871_27916[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27870 === (20))){
var state_27869__$1 = state_27869;
var statearr_27872_27917 = state_27869__$1;
(statearr_27872_27917[(2)] = null);

(statearr_27872_27917[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27870 === (1))){
var state_27869__$1 = state_27869;
var statearr_27873_27918 = state_27869__$1;
(statearr_27873_27918[(2)] = null);

(statearr_27873_27918[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27870 === (24))){
var inst_27848 = (state_27869[(7)]);
var inst_27857 = cljs.core.swap_BANG_.call(null,mults,cljs.core.dissoc,inst_27848);
var state_27869__$1 = state_27869;
var statearr_27874_27919 = state_27869__$1;
(statearr_27874_27919[(2)] = inst_27857);

(statearr_27874_27919[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27870 === (4))){
var inst_27800 = (state_27869[(8)]);
var inst_27800__$1 = (state_27869[(2)]);
var inst_27801 = (inst_27800__$1 == null);
var state_27869__$1 = (function (){var statearr_27875 = state_27869;
(statearr_27875[(8)] = inst_27800__$1);

return statearr_27875;
})();
if(cljs.core.truth_(inst_27801)){
var statearr_27876_27920 = state_27869__$1;
(statearr_27876_27920[(1)] = (5));

} else {
var statearr_27877_27921 = state_27869__$1;
(statearr_27877_27921[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27870 === (15))){
var inst_27842 = (state_27869[(2)]);
var state_27869__$1 = state_27869;
var statearr_27878_27922 = state_27869__$1;
(statearr_27878_27922[(2)] = inst_27842);

(statearr_27878_27922[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27870 === (21))){
var inst_27862 = (state_27869[(2)]);
var state_27869__$1 = (function (){var statearr_27879 = state_27869;
(statearr_27879[(9)] = inst_27862);

return statearr_27879;
})();
var statearr_27880_27923 = state_27869__$1;
(statearr_27880_27923[(2)] = null);

(statearr_27880_27923[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27870 === (13))){
var inst_27824 = (state_27869[(10)]);
var inst_27826 = cljs.core.chunked_seq_QMARK_.call(null,inst_27824);
var state_27869__$1 = state_27869;
if(inst_27826){
var statearr_27881_27924 = state_27869__$1;
(statearr_27881_27924[(1)] = (16));

} else {
var statearr_27882_27925 = state_27869__$1;
(statearr_27882_27925[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27870 === (22))){
var inst_27854 = (state_27869[(2)]);
var state_27869__$1 = state_27869;
if(cljs.core.truth_(inst_27854)){
var statearr_27883_27926 = state_27869__$1;
(statearr_27883_27926[(1)] = (23));

} else {
var statearr_27884_27927 = state_27869__$1;
(statearr_27884_27927[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27870 === (6))){
var inst_27800 = (state_27869[(8)]);
var inst_27850 = (state_27869[(11)]);
var inst_27848 = (state_27869[(7)]);
var inst_27848__$1 = topic_fn.call(null,inst_27800);
var inst_27849 = cljs.core.deref.call(null,mults);
var inst_27850__$1 = cljs.core.get.call(null,inst_27849,inst_27848__$1);
var state_27869__$1 = (function (){var statearr_27885 = state_27869;
(statearr_27885[(11)] = inst_27850__$1);

(statearr_27885[(7)] = inst_27848__$1);

return statearr_27885;
})();
if(cljs.core.truth_(inst_27850__$1)){
var statearr_27886_27928 = state_27869__$1;
(statearr_27886_27928[(1)] = (19));

} else {
var statearr_27887_27929 = state_27869__$1;
(statearr_27887_27929[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27870 === (25))){
var inst_27859 = (state_27869[(2)]);
var state_27869__$1 = state_27869;
var statearr_27888_27930 = state_27869__$1;
(statearr_27888_27930[(2)] = inst_27859);

(statearr_27888_27930[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27870 === (17))){
var inst_27824 = (state_27869[(10)]);
var inst_27833 = cljs.core.first.call(null,inst_27824);
var inst_27834 = cljs.core.async.muxch_STAR_.call(null,inst_27833);
var inst_27835 = cljs.core.async.close_BANG_.call(null,inst_27834);
var inst_27836 = cljs.core.next.call(null,inst_27824);
var inst_27810 = inst_27836;
var inst_27811 = null;
var inst_27812 = (0);
var inst_27813 = (0);
var state_27869__$1 = (function (){var statearr_27889 = state_27869;
(statearr_27889[(12)] = inst_27811);

(statearr_27889[(13)] = inst_27813);

(statearr_27889[(14)] = inst_27810);

(statearr_27889[(15)] = inst_27812);

(statearr_27889[(16)] = inst_27835);

return statearr_27889;
})();
var statearr_27890_27931 = state_27869__$1;
(statearr_27890_27931[(2)] = null);

(statearr_27890_27931[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27870 === (3))){
var inst_27867 = (state_27869[(2)]);
var state_27869__$1 = state_27869;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_27869__$1,inst_27867);
} else {
if((state_val_27870 === (12))){
var inst_27844 = (state_27869[(2)]);
var state_27869__$1 = state_27869;
var statearr_27891_27932 = state_27869__$1;
(statearr_27891_27932[(2)] = inst_27844);

(statearr_27891_27932[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27870 === (2))){
var state_27869__$1 = state_27869;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27869__$1,(4),ch);
} else {
if((state_val_27870 === (23))){
var state_27869__$1 = state_27869;
var statearr_27892_27933 = state_27869__$1;
(statearr_27892_27933[(2)] = null);

(statearr_27892_27933[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27870 === (19))){
var inst_27800 = (state_27869[(8)]);
var inst_27850 = (state_27869[(11)]);
var inst_27852 = cljs.core.async.muxch_STAR_.call(null,inst_27850);
var state_27869__$1 = state_27869;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_27869__$1,(22),inst_27852,inst_27800);
} else {
if((state_val_27870 === (11))){
var inst_27810 = (state_27869[(14)]);
var inst_27824 = (state_27869[(10)]);
var inst_27824__$1 = cljs.core.seq.call(null,inst_27810);
var state_27869__$1 = (function (){var statearr_27893 = state_27869;
(statearr_27893[(10)] = inst_27824__$1);

return statearr_27893;
})();
if(inst_27824__$1){
var statearr_27894_27934 = state_27869__$1;
(statearr_27894_27934[(1)] = (13));

} else {
var statearr_27895_27935 = state_27869__$1;
(statearr_27895_27935[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27870 === (9))){
var inst_27846 = (state_27869[(2)]);
var state_27869__$1 = state_27869;
var statearr_27896_27936 = state_27869__$1;
(statearr_27896_27936[(2)] = inst_27846);

(statearr_27896_27936[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27870 === (5))){
var inst_27807 = cljs.core.deref.call(null,mults);
var inst_27808 = cljs.core.vals.call(null,inst_27807);
var inst_27809 = cljs.core.seq.call(null,inst_27808);
var inst_27810 = inst_27809;
var inst_27811 = null;
var inst_27812 = (0);
var inst_27813 = (0);
var state_27869__$1 = (function (){var statearr_27897 = state_27869;
(statearr_27897[(12)] = inst_27811);

(statearr_27897[(13)] = inst_27813);

(statearr_27897[(14)] = inst_27810);

(statearr_27897[(15)] = inst_27812);

return statearr_27897;
})();
var statearr_27898_27937 = state_27869__$1;
(statearr_27898_27937[(2)] = null);

(statearr_27898_27937[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27870 === (14))){
var state_27869__$1 = state_27869;
var statearr_27902_27938 = state_27869__$1;
(statearr_27902_27938[(2)] = null);

(statearr_27902_27938[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27870 === (16))){
var inst_27824 = (state_27869[(10)]);
var inst_27828 = cljs.core.chunk_first.call(null,inst_27824);
var inst_27829 = cljs.core.chunk_rest.call(null,inst_27824);
var inst_27830 = cljs.core.count.call(null,inst_27828);
var inst_27810 = inst_27829;
var inst_27811 = inst_27828;
var inst_27812 = inst_27830;
var inst_27813 = (0);
var state_27869__$1 = (function (){var statearr_27903 = state_27869;
(statearr_27903[(12)] = inst_27811);

(statearr_27903[(13)] = inst_27813);

(statearr_27903[(14)] = inst_27810);

(statearr_27903[(15)] = inst_27812);

return statearr_27903;
})();
var statearr_27904_27939 = state_27869__$1;
(statearr_27904_27939[(2)] = null);

(statearr_27904_27939[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27870 === (10))){
var inst_27811 = (state_27869[(12)]);
var inst_27813 = (state_27869[(13)]);
var inst_27810 = (state_27869[(14)]);
var inst_27812 = (state_27869[(15)]);
var inst_27818 = cljs.core._nth.call(null,inst_27811,inst_27813);
var inst_27819 = cljs.core.async.muxch_STAR_.call(null,inst_27818);
var inst_27820 = cljs.core.async.close_BANG_.call(null,inst_27819);
var inst_27821 = (inst_27813 + (1));
var tmp27899 = inst_27811;
var tmp27900 = inst_27810;
var tmp27901 = inst_27812;
var inst_27810__$1 = tmp27900;
var inst_27811__$1 = tmp27899;
var inst_27812__$1 = tmp27901;
var inst_27813__$1 = inst_27821;
var state_27869__$1 = (function (){var statearr_27905 = state_27869;
(statearr_27905[(12)] = inst_27811__$1);

(statearr_27905[(17)] = inst_27820);

(statearr_27905[(13)] = inst_27813__$1);

(statearr_27905[(14)] = inst_27810__$1);

(statearr_27905[(15)] = inst_27812__$1);

return statearr_27905;
})();
var statearr_27906_27940 = state_27869__$1;
(statearr_27906_27940[(2)] = null);

(statearr_27906_27940[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27870 === (18))){
var inst_27839 = (state_27869[(2)]);
var state_27869__$1 = state_27869;
var statearr_27907_27941 = state_27869__$1;
(statearr_27907_27941[(2)] = inst_27839);

(statearr_27907_27941[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27870 === (8))){
var inst_27813 = (state_27869[(13)]);
var inst_27812 = (state_27869[(15)]);
var inst_27815 = (inst_27813 < inst_27812);
var inst_27816 = inst_27815;
var state_27869__$1 = state_27869;
if(cljs.core.truth_(inst_27816)){
var statearr_27908_27942 = state_27869__$1;
(statearr_27908_27942[(1)] = (10));

} else {
var statearr_27909_27943 = state_27869__$1;
(statearr_27909_27943[(1)] = (11));

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
var cljs$core$async$state_machine__26587__auto__ = null;
var cljs$core$async$state_machine__26587__auto____0 = (function (){
var statearr_27910 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_27910[(0)] = cljs$core$async$state_machine__26587__auto__);

(statearr_27910[(1)] = (1));

return statearr_27910;
});
var cljs$core$async$state_machine__26587__auto____1 = (function (state_27869){
while(true){
var ret_value__26588__auto__ = (function (){try{while(true){
var result__26589__auto__ = switch__26586__auto__.call(null,state_27869);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26589__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26589__auto__;
}
break;
}
}catch (e27911){if((e27911 instanceof Object)){
var ex__26590__auto__ = e27911;
var statearr_27912_27944 = state_27869;
(statearr_27912_27944[(5)] = ex__26590__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27869);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e27911;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27945 = state_27869;
state_27869 = G__27945;
continue;
} else {
return ret_value__26588__auto__;
}
break;
}
});
cljs$core$async$state_machine__26587__auto__ = function(state_27869){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__26587__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__26587__auto____1.call(this,state_27869);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__26587__auto____0;
cljs$core$async$state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__26587__auto____1;
return cljs$core$async$state_machine__26587__auto__;
})()
})();
var state__26683__auto__ = (function (){var statearr_27913 = f__26682__auto__.call(null);
(statearr_27913[(6)] = c__26681__auto___27915);

return statearr_27913;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26683__auto__);
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
var G__27947 = arguments.length;
switch (G__27947) {
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
var G__27950 = arguments.length;
switch (G__27950) {
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
var G__27953 = arguments.length;
switch (G__27953) {
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
var c__26681__auto___28020 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26682__auto__ = (function (){var switch__26586__auto__ = (function (state_27992){
var state_val_27993 = (state_27992[(1)]);
if((state_val_27993 === (7))){
var state_27992__$1 = state_27992;
var statearr_27994_28021 = state_27992__$1;
(statearr_27994_28021[(2)] = null);

(statearr_27994_28021[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27993 === (1))){
var state_27992__$1 = state_27992;
var statearr_27995_28022 = state_27992__$1;
(statearr_27995_28022[(2)] = null);

(statearr_27995_28022[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27993 === (4))){
var inst_27956 = (state_27992[(7)]);
var inst_27958 = (inst_27956 < cnt);
var state_27992__$1 = state_27992;
if(cljs.core.truth_(inst_27958)){
var statearr_27996_28023 = state_27992__$1;
(statearr_27996_28023[(1)] = (6));

} else {
var statearr_27997_28024 = state_27992__$1;
(statearr_27997_28024[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27993 === (15))){
var inst_27988 = (state_27992[(2)]);
var state_27992__$1 = state_27992;
var statearr_27998_28025 = state_27992__$1;
(statearr_27998_28025[(2)] = inst_27988);

(statearr_27998_28025[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27993 === (13))){
var inst_27981 = cljs.core.async.close_BANG_.call(null,out);
var state_27992__$1 = state_27992;
var statearr_27999_28026 = state_27992__$1;
(statearr_27999_28026[(2)] = inst_27981);

(statearr_27999_28026[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27993 === (6))){
var state_27992__$1 = state_27992;
var statearr_28000_28027 = state_27992__$1;
(statearr_28000_28027[(2)] = null);

(statearr_28000_28027[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27993 === (3))){
var inst_27990 = (state_27992[(2)]);
var state_27992__$1 = state_27992;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_27992__$1,inst_27990);
} else {
if((state_val_27993 === (12))){
var inst_27978 = (state_27992[(8)]);
var inst_27978__$1 = (state_27992[(2)]);
var inst_27979 = cljs.core.some.call(null,cljs.core.nil_QMARK_,inst_27978__$1);
var state_27992__$1 = (function (){var statearr_28001 = state_27992;
(statearr_28001[(8)] = inst_27978__$1);

return statearr_28001;
})();
if(cljs.core.truth_(inst_27979)){
var statearr_28002_28028 = state_27992__$1;
(statearr_28002_28028[(1)] = (13));

} else {
var statearr_28003_28029 = state_27992__$1;
(statearr_28003_28029[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27993 === (2))){
var inst_27955 = cljs.core.reset_BANG_.call(null,dctr,cnt);
var inst_27956 = (0);
var state_27992__$1 = (function (){var statearr_28004 = state_27992;
(statearr_28004[(7)] = inst_27956);

(statearr_28004[(9)] = inst_27955);

return statearr_28004;
})();
var statearr_28005_28030 = state_27992__$1;
(statearr_28005_28030[(2)] = null);

(statearr_28005_28030[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27993 === (11))){
var inst_27956 = (state_27992[(7)]);
var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_27992,(10),Object,null,(9));
var inst_27965 = chs__$1.call(null,inst_27956);
var inst_27966 = done.call(null,inst_27956);
var inst_27967 = cljs.core.async.take_BANG_.call(null,inst_27965,inst_27966);
var state_27992__$1 = state_27992;
var statearr_28006_28031 = state_27992__$1;
(statearr_28006_28031[(2)] = inst_27967);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27992__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27993 === (9))){
var inst_27956 = (state_27992[(7)]);
var inst_27969 = (state_27992[(2)]);
var inst_27970 = (inst_27956 + (1));
var inst_27956__$1 = inst_27970;
var state_27992__$1 = (function (){var statearr_28007 = state_27992;
(statearr_28007[(7)] = inst_27956__$1);

(statearr_28007[(10)] = inst_27969);

return statearr_28007;
})();
var statearr_28008_28032 = state_27992__$1;
(statearr_28008_28032[(2)] = null);

(statearr_28008_28032[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27993 === (5))){
var inst_27976 = (state_27992[(2)]);
var state_27992__$1 = (function (){var statearr_28009 = state_27992;
(statearr_28009[(11)] = inst_27976);

return statearr_28009;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27992__$1,(12),dchan);
} else {
if((state_val_27993 === (14))){
var inst_27978 = (state_27992[(8)]);
var inst_27983 = cljs.core.apply.call(null,f,inst_27978);
var state_27992__$1 = state_27992;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_27992__$1,(16),out,inst_27983);
} else {
if((state_val_27993 === (16))){
var inst_27985 = (state_27992[(2)]);
var state_27992__$1 = (function (){var statearr_28010 = state_27992;
(statearr_28010[(12)] = inst_27985);

return statearr_28010;
})();
var statearr_28011_28033 = state_27992__$1;
(statearr_28011_28033[(2)] = null);

(statearr_28011_28033[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27993 === (10))){
var inst_27960 = (state_27992[(2)]);
var inst_27961 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);
var state_27992__$1 = (function (){var statearr_28012 = state_27992;
(statearr_28012[(13)] = inst_27960);

return statearr_28012;
})();
var statearr_28013_28034 = state_27992__$1;
(statearr_28013_28034[(2)] = inst_27961);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27992__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27993 === (8))){
var inst_27974 = (state_27992[(2)]);
var state_27992__$1 = state_27992;
var statearr_28014_28035 = state_27992__$1;
(statearr_28014_28035[(2)] = inst_27974);

(statearr_28014_28035[(1)] = (5));


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
var cljs$core$async$state_machine__26587__auto__ = null;
var cljs$core$async$state_machine__26587__auto____0 = (function (){
var statearr_28015 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_28015[(0)] = cljs$core$async$state_machine__26587__auto__);

(statearr_28015[(1)] = (1));

return statearr_28015;
});
var cljs$core$async$state_machine__26587__auto____1 = (function (state_27992){
while(true){
var ret_value__26588__auto__ = (function (){try{while(true){
var result__26589__auto__ = switch__26586__auto__.call(null,state_27992);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26589__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26589__auto__;
}
break;
}
}catch (e28016){if((e28016 instanceof Object)){
var ex__26590__auto__ = e28016;
var statearr_28017_28036 = state_27992;
(statearr_28017_28036[(5)] = ex__26590__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27992);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e28016;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__28037 = state_27992;
state_27992 = G__28037;
continue;
} else {
return ret_value__26588__auto__;
}
break;
}
});
cljs$core$async$state_machine__26587__auto__ = function(state_27992){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__26587__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__26587__auto____1.call(this,state_27992);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__26587__auto____0;
cljs$core$async$state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__26587__auto____1;
return cljs$core$async$state_machine__26587__auto__;
})()
})();
var state__26683__auto__ = (function (){var statearr_28018 = f__26682__auto__.call(null);
(statearr_28018[(6)] = c__26681__auto___28020);

return statearr_28018;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26683__auto__);
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
var G__28040 = arguments.length;
switch (G__28040) {
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
var c__26681__auto___28094 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26682__auto__ = (function (){var switch__26586__auto__ = (function (state_28072){
var state_val_28073 = (state_28072[(1)]);
if((state_val_28073 === (7))){
var inst_28052 = (state_28072[(7)]);
var inst_28051 = (state_28072[(8)]);
var inst_28051__$1 = (state_28072[(2)]);
var inst_28052__$1 = cljs.core.nth.call(null,inst_28051__$1,(0),null);
var inst_28053 = cljs.core.nth.call(null,inst_28051__$1,(1),null);
var inst_28054 = (inst_28052__$1 == null);
var state_28072__$1 = (function (){var statearr_28074 = state_28072;
(statearr_28074[(9)] = inst_28053);

(statearr_28074[(7)] = inst_28052__$1);

(statearr_28074[(8)] = inst_28051__$1);

return statearr_28074;
})();
if(cljs.core.truth_(inst_28054)){
var statearr_28075_28095 = state_28072__$1;
(statearr_28075_28095[(1)] = (8));

} else {
var statearr_28076_28096 = state_28072__$1;
(statearr_28076_28096[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28073 === (1))){
var inst_28041 = cljs.core.vec.call(null,chs);
var inst_28042 = inst_28041;
var state_28072__$1 = (function (){var statearr_28077 = state_28072;
(statearr_28077[(10)] = inst_28042);

return statearr_28077;
})();
var statearr_28078_28097 = state_28072__$1;
(statearr_28078_28097[(2)] = null);

(statearr_28078_28097[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28073 === (4))){
var inst_28042 = (state_28072[(10)]);
var state_28072__$1 = state_28072;
return cljs.core.async.ioc_alts_BANG_.call(null,state_28072__$1,(7),inst_28042);
} else {
if((state_val_28073 === (6))){
var inst_28068 = (state_28072[(2)]);
var state_28072__$1 = state_28072;
var statearr_28079_28098 = state_28072__$1;
(statearr_28079_28098[(2)] = inst_28068);

(statearr_28079_28098[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28073 === (3))){
var inst_28070 = (state_28072[(2)]);
var state_28072__$1 = state_28072;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_28072__$1,inst_28070);
} else {
if((state_val_28073 === (2))){
var inst_28042 = (state_28072[(10)]);
var inst_28044 = cljs.core.count.call(null,inst_28042);
var inst_28045 = (inst_28044 > (0));
var state_28072__$1 = state_28072;
if(cljs.core.truth_(inst_28045)){
var statearr_28081_28099 = state_28072__$1;
(statearr_28081_28099[(1)] = (4));

} else {
var statearr_28082_28100 = state_28072__$1;
(statearr_28082_28100[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28073 === (11))){
var inst_28042 = (state_28072[(10)]);
var inst_28061 = (state_28072[(2)]);
var tmp28080 = inst_28042;
var inst_28042__$1 = tmp28080;
var state_28072__$1 = (function (){var statearr_28083 = state_28072;
(statearr_28083[(11)] = inst_28061);

(statearr_28083[(10)] = inst_28042__$1);

return statearr_28083;
})();
var statearr_28084_28101 = state_28072__$1;
(statearr_28084_28101[(2)] = null);

(statearr_28084_28101[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28073 === (9))){
var inst_28052 = (state_28072[(7)]);
var state_28072__$1 = state_28072;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_28072__$1,(11),out,inst_28052);
} else {
if((state_val_28073 === (5))){
var inst_28066 = cljs.core.async.close_BANG_.call(null,out);
var state_28072__$1 = state_28072;
var statearr_28085_28102 = state_28072__$1;
(statearr_28085_28102[(2)] = inst_28066);

(statearr_28085_28102[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28073 === (10))){
var inst_28064 = (state_28072[(2)]);
var state_28072__$1 = state_28072;
var statearr_28086_28103 = state_28072__$1;
(statearr_28086_28103[(2)] = inst_28064);

(statearr_28086_28103[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28073 === (8))){
var inst_28053 = (state_28072[(9)]);
var inst_28052 = (state_28072[(7)]);
var inst_28042 = (state_28072[(10)]);
var inst_28051 = (state_28072[(8)]);
var inst_28056 = (function (){var cs = inst_28042;
var vec__28047 = inst_28051;
var v = inst_28052;
var c = inst_28053;
return (function (p1__28038_SHARP_){
return cljs.core.not_EQ_.call(null,c,p1__28038_SHARP_);
});
})();
var inst_28057 = cljs.core.filterv.call(null,inst_28056,inst_28042);
var inst_28042__$1 = inst_28057;
var state_28072__$1 = (function (){var statearr_28087 = state_28072;
(statearr_28087[(10)] = inst_28042__$1);

return statearr_28087;
})();
var statearr_28088_28104 = state_28072__$1;
(statearr_28088_28104[(2)] = null);

(statearr_28088_28104[(1)] = (2));


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
var cljs$core$async$state_machine__26587__auto__ = null;
var cljs$core$async$state_machine__26587__auto____0 = (function (){
var statearr_28089 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_28089[(0)] = cljs$core$async$state_machine__26587__auto__);

(statearr_28089[(1)] = (1));

return statearr_28089;
});
var cljs$core$async$state_machine__26587__auto____1 = (function (state_28072){
while(true){
var ret_value__26588__auto__ = (function (){try{while(true){
var result__26589__auto__ = switch__26586__auto__.call(null,state_28072);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26589__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26589__auto__;
}
break;
}
}catch (e28090){if((e28090 instanceof Object)){
var ex__26590__auto__ = e28090;
var statearr_28091_28105 = state_28072;
(statearr_28091_28105[(5)] = ex__26590__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_28072);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e28090;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__28106 = state_28072;
state_28072 = G__28106;
continue;
} else {
return ret_value__26588__auto__;
}
break;
}
});
cljs$core$async$state_machine__26587__auto__ = function(state_28072){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__26587__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__26587__auto____1.call(this,state_28072);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__26587__auto____0;
cljs$core$async$state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__26587__auto____1;
return cljs$core$async$state_machine__26587__auto__;
})()
})();
var state__26683__auto__ = (function (){var statearr_28092 = f__26682__auto__.call(null);
(statearr_28092[(6)] = c__26681__auto___28094);

return statearr_28092;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26683__auto__);
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
var G__28108 = arguments.length;
switch (G__28108) {
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
var c__26681__auto___28153 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26682__auto__ = (function (){var switch__26586__auto__ = (function (state_28132){
var state_val_28133 = (state_28132[(1)]);
if((state_val_28133 === (7))){
var inst_28114 = (state_28132[(7)]);
var inst_28114__$1 = (state_28132[(2)]);
var inst_28115 = (inst_28114__$1 == null);
var inst_28116 = cljs.core.not.call(null,inst_28115);
var state_28132__$1 = (function (){var statearr_28134 = state_28132;
(statearr_28134[(7)] = inst_28114__$1);

return statearr_28134;
})();
if(inst_28116){
var statearr_28135_28154 = state_28132__$1;
(statearr_28135_28154[(1)] = (8));

} else {
var statearr_28136_28155 = state_28132__$1;
(statearr_28136_28155[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28133 === (1))){
var inst_28109 = (0);
var state_28132__$1 = (function (){var statearr_28137 = state_28132;
(statearr_28137[(8)] = inst_28109);

return statearr_28137;
})();
var statearr_28138_28156 = state_28132__$1;
(statearr_28138_28156[(2)] = null);

(statearr_28138_28156[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28133 === (4))){
var state_28132__$1 = state_28132;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_28132__$1,(7),ch);
} else {
if((state_val_28133 === (6))){
var inst_28127 = (state_28132[(2)]);
var state_28132__$1 = state_28132;
var statearr_28139_28157 = state_28132__$1;
(statearr_28139_28157[(2)] = inst_28127);

(statearr_28139_28157[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28133 === (3))){
var inst_28129 = (state_28132[(2)]);
var inst_28130 = cljs.core.async.close_BANG_.call(null,out);
var state_28132__$1 = (function (){var statearr_28140 = state_28132;
(statearr_28140[(9)] = inst_28129);

return statearr_28140;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_28132__$1,inst_28130);
} else {
if((state_val_28133 === (2))){
var inst_28109 = (state_28132[(8)]);
var inst_28111 = (inst_28109 < n);
var state_28132__$1 = state_28132;
if(cljs.core.truth_(inst_28111)){
var statearr_28141_28158 = state_28132__$1;
(statearr_28141_28158[(1)] = (4));

} else {
var statearr_28142_28159 = state_28132__$1;
(statearr_28142_28159[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28133 === (11))){
var inst_28109 = (state_28132[(8)]);
var inst_28119 = (state_28132[(2)]);
var inst_28120 = (inst_28109 + (1));
var inst_28109__$1 = inst_28120;
var state_28132__$1 = (function (){var statearr_28143 = state_28132;
(statearr_28143[(10)] = inst_28119);

(statearr_28143[(8)] = inst_28109__$1);

return statearr_28143;
})();
var statearr_28144_28160 = state_28132__$1;
(statearr_28144_28160[(2)] = null);

(statearr_28144_28160[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28133 === (9))){
var state_28132__$1 = state_28132;
var statearr_28145_28161 = state_28132__$1;
(statearr_28145_28161[(2)] = null);

(statearr_28145_28161[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28133 === (5))){
var state_28132__$1 = state_28132;
var statearr_28146_28162 = state_28132__$1;
(statearr_28146_28162[(2)] = null);

(statearr_28146_28162[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28133 === (10))){
var inst_28124 = (state_28132[(2)]);
var state_28132__$1 = state_28132;
var statearr_28147_28163 = state_28132__$1;
(statearr_28147_28163[(2)] = inst_28124);

(statearr_28147_28163[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28133 === (8))){
var inst_28114 = (state_28132[(7)]);
var state_28132__$1 = state_28132;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_28132__$1,(11),out,inst_28114);
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
var cljs$core$async$state_machine__26587__auto__ = null;
var cljs$core$async$state_machine__26587__auto____0 = (function (){
var statearr_28148 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_28148[(0)] = cljs$core$async$state_machine__26587__auto__);

(statearr_28148[(1)] = (1));

return statearr_28148;
});
var cljs$core$async$state_machine__26587__auto____1 = (function (state_28132){
while(true){
var ret_value__26588__auto__ = (function (){try{while(true){
var result__26589__auto__ = switch__26586__auto__.call(null,state_28132);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26589__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26589__auto__;
}
break;
}
}catch (e28149){if((e28149 instanceof Object)){
var ex__26590__auto__ = e28149;
var statearr_28150_28164 = state_28132;
(statearr_28150_28164[(5)] = ex__26590__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_28132);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e28149;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__28165 = state_28132;
state_28132 = G__28165;
continue;
} else {
return ret_value__26588__auto__;
}
break;
}
});
cljs$core$async$state_machine__26587__auto__ = function(state_28132){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__26587__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__26587__auto____1.call(this,state_28132);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__26587__auto____0;
cljs$core$async$state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__26587__auto____1;
return cljs$core$async$state_machine__26587__auto__;
})()
})();
var state__26683__auto__ = (function (){var statearr_28151 = f__26682__auto__.call(null);
(statearr_28151[(6)] = c__26681__auto___28153);

return statearr_28151;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26683__auto__);
}));


return out;
}));

(cljs.core.async.take.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_LT_ = (function cljs$core$async$map_LT_(f,ch){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async28167 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async28167 = (function (f,ch,meta28168){
this.f = f;
this.ch = ch;
this.meta28168 = meta28168;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async28167.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_28169,meta28168__$1){
var self__ = this;
var _28169__$1 = this;
return (new cljs.core.async.t_cljs$core$async28167(self__.f,self__.ch,meta28168__$1));
}));

(cljs.core.async.t_cljs$core$async28167.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_28169){
var self__ = this;
var _28169__$1 = this;
return self__.meta28168;
}));

(cljs.core.async.t_cljs$core$async28167.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async28167.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
}));

(cljs.core.async.t_cljs$core$async28167.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
}));

(cljs.core.async.t_cljs$core$async28167.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async28167.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,(function (){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async28170 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async28170 = (function (f,ch,meta28168,_,fn1,meta28171){
this.f = f;
this.ch = ch;
this.meta28168 = meta28168;
this._ = _;
this.fn1 = fn1;
this.meta28171 = meta28171;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async28170.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_28172,meta28171__$1){
var self__ = this;
var _28172__$1 = this;
return (new cljs.core.async.t_cljs$core$async28170(self__.f,self__.ch,self__.meta28168,self__._,self__.fn1,meta28171__$1));
}));

(cljs.core.async.t_cljs$core$async28170.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_28172){
var self__ = this;
var _28172__$1 = this;
return self__.meta28171;
}));

(cljs.core.async.t_cljs$core$async28170.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async28170.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.fn1);
}));

(cljs.core.async.t_cljs$core$async28170.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async28170.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
var f1 = cljs.core.async.impl.protocols.commit.call(null,self__.fn1);
return (function (p1__28166_SHARP_){
return f1.call(null,(((p1__28166_SHARP_ == null))?null:self__.f.call(null,p1__28166_SHARP_)));
});
}));

(cljs.core.async.t_cljs$core$async28170.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta28168","meta28168",180092075,null),cljs.core.with_meta(new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol("cljs.core.async","t_cljs$core$async28167","cljs.core.async/t_cljs$core$async28167",1799420157,null)], null)),new cljs.core.Symbol(null,"fn1","fn1",895834444,null),new cljs.core.Symbol(null,"meta28171","meta28171",154949277,null)], null);
}));

(cljs.core.async.t_cljs$core$async28170.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async28170.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async28170");

(cljs.core.async.t_cljs$core$async28170.cljs$lang$ctorPrWriter = (function (this__4428__auto__,writer__4429__auto__,opt__4430__auto__){
return cljs.core._write.call(null,writer__4429__auto__,"cljs.core.async/t_cljs$core$async28170");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async28170.
 */
cljs.core.async.__GT_t_cljs$core$async28170 = (function cljs$core$async$map_LT__$___GT_t_cljs$core$async28170(f__$1,ch__$1,meta28168__$1,___$2,fn1__$1,meta28171){
return (new cljs.core.async.t_cljs$core$async28170(f__$1,ch__$1,meta28168__$1,___$2,fn1__$1,meta28171));
});

}

return (new cljs.core.async.t_cljs$core$async28170(self__.f,self__.ch,self__.meta28168,___$1,fn1,cljs.core.PersistentArrayMap.EMPTY));
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

(cljs.core.async.t_cljs$core$async28167.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async28167.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
}));

(cljs.core.async.t_cljs$core$async28167.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta28168","meta28168",180092075,null)], null);
}));

(cljs.core.async.t_cljs$core$async28167.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async28167.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async28167");

(cljs.core.async.t_cljs$core$async28167.cljs$lang$ctorPrWriter = (function (this__4428__auto__,writer__4429__auto__,opt__4430__auto__){
return cljs.core._write.call(null,writer__4429__auto__,"cljs.core.async/t_cljs$core$async28167");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async28167.
 */
cljs.core.async.__GT_t_cljs$core$async28167 = (function cljs$core$async$map_LT__$___GT_t_cljs$core$async28167(f__$1,ch__$1,meta28168){
return (new cljs.core.async.t_cljs$core$async28167(f__$1,ch__$1,meta28168));
});

}

return (new cljs.core.async.t_cljs$core$async28167(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_GT_ = (function cljs$core$async$map_GT_(f,ch){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async28173 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async28173 = (function (f,ch,meta28174){
this.f = f;
this.ch = ch;
this.meta28174 = meta28174;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async28173.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_28175,meta28174__$1){
var self__ = this;
var _28175__$1 = this;
return (new cljs.core.async.t_cljs$core$async28173(self__.f,self__.ch,meta28174__$1));
}));

(cljs.core.async.t_cljs$core$async28173.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_28175){
var self__ = this;
var _28175__$1 = this;
return self__.meta28174;
}));

(cljs.core.async.t_cljs$core$async28173.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async28173.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
}));

(cljs.core.async.t_cljs$core$async28173.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async28173.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
}));

(cljs.core.async.t_cljs$core$async28173.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async28173.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,self__.f.call(null,val),fn1);
}));

(cljs.core.async.t_cljs$core$async28173.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta28174","meta28174",663857680,null)], null);
}));

(cljs.core.async.t_cljs$core$async28173.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async28173.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async28173");

(cljs.core.async.t_cljs$core$async28173.cljs$lang$ctorPrWriter = (function (this__4428__auto__,writer__4429__auto__,opt__4430__auto__){
return cljs.core._write.call(null,writer__4429__auto__,"cljs.core.async/t_cljs$core$async28173");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async28173.
 */
cljs.core.async.__GT_t_cljs$core$async28173 = (function cljs$core$async$map_GT__$___GT_t_cljs$core$async28173(f__$1,ch__$1,meta28174){
return (new cljs.core.async.t_cljs$core$async28173(f__$1,ch__$1,meta28174));
});

}

return (new cljs.core.async.t_cljs$core$async28173(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_GT_ = (function cljs$core$async$filter_GT_(p,ch){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async28176 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async28176 = (function (p,ch,meta28177){
this.p = p;
this.ch = ch;
this.meta28177 = meta28177;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async28176.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_28178,meta28177__$1){
var self__ = this;
var _28178__$1 = this;
return (new cljs.core.async.t_cljs$core$async28176(self__.p,self__.ch,meta28177__$1));
}));

(cljs.core.async.t_cljs$core$async28176.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_28178){
var self__ = this;
var _28178__$1 = this;
return self__.meta28177;
}));

(cljs.core.async.t_cljs$core$async28176.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async28176.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
}));

(cljs.core.async.t_cljs$core$async28176.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
}));

(cljs.core.async.t_cljs$core$async28176.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async28176.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
}));

(cljs.core.async.t_cljs$core$async28176.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async28176.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.p.call(null,val))){
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
} else {
return cljs.core.async.impl.channels.box.call(null,cljs.core.not.call(null,cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch)));
}
}));

(cljs.core.async.t_cljs$core$async28176.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta28177","meta28177",680352649,null)], null);
}));

(cljs.core.async.t_cljs$core$async28176.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async28176.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async28176");

(cljs.core.async.t_cljs$core$async28176.cljs$lang$ctorPrWriter = (function (this__4428__auto__,writer__4429__auto__,opt__4430__auto__){
return cljs.core._write.call(null,writer__4429__auto__,"cljs.core.async/t_cljs$core$async28176");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async28176.
 */
cljs.core.async.__GT_t_cljs$core$async28176 = (function cljs$core$async$filter_GT__$___GT_t_cljs$core$async28176(p__$1,ch__$1,meta28177){
return (new cljs.core.async.t_cljs$core$async28176(p__$1,ch__$1,meta28177));
});

}

return (new cljs.core.async.t_cljs$core$async28176(p,ch,cljs.core.PersistentArrayMap.EMPTY));
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
var G__28180 = arguments.length;
switch (G__28180) {
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
var c__26681__auto___28220 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26682__auto__ = (function (){var switch__26586__auto__ = (function (state_28201){
var state_val_28202 = (state_28201[(1)]);
if((state_val_28202 === (7))){
var inst_28197 = (state_28201[(2)]);
var state_28201__$1 = state_28201;
var statearr_28203_28221 = state_28201__$1;
(statearr_28203_28221[(2)] = inst_28197);

(statearr_28203_28221[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28202 === (1))){
var state_28201__$1 = state_28201;
var statearr_28204_28222 = state_28201__$1;
(statearr_28204_28222[(2)] = null);

(statearr_28204_28222[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28202 === (4))){
var inst_28183 = (state_28201[(7)]);
var inst_28183__$1 = (state_28201[(2)]);
var inst_28184 = (inst_28183__$1 == null);
var state_28201__$1 = (function (){var statearr_28205 = state_28201;
(statearr_28205[(7)] = inst_28183__$1);

return statearr_28205;
})();
if(cljs.core.truth_(inst_28184)){
var statearr_28206_28223 = state_28201__$1;
(statearr_28206_28223[(1)] = (5));

} else {
var statearr_28207_28224 = state_28201__$1;
(statearr_28207_28224[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28202 === (6))){
var inst_28183 = (state_28201[(7)]);
var inst_28188 = p.call(null,inst_28183);
var state_28201__$1 = state_28201;
if(cljs.core.truth_(inst_28188)){
var statearr_28208_28225 = state_28201__$1;
(statearr_28208_28225[(1)] = (8));

} else {
var statearr_28209_28226 = state_28201__$1;
(statearr_28209_28226[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28202 === (3))){
var inst_28199 = (state_28201[(2)]);
var state_28201__$1 = state_28201;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_28201__$1,inst_28199);
} else {
if((state_val_28202 === (2))){
var state_28201__$1 = state_28201;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_28201__$1,(4),ch);
} else {
if((state_val_28202 === (11))){
var inst_28191 = (state_28201[(2)]);
var state_28201__$1 = state_28201;
var statearr_28210_28227 = state_28201__$1;
(statearr_28210_28227[(2)] = inst_28191);

(statearr_28210_28227[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28202 === (9))){
var state_28201__$1 = state_28201;
var statearr_28211_28228 = state_28201__$1;
(statearr_28211_28228[(2)] = null);

(statearr_28211_28228[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28202 === (5))){
var inst_28186 = cljs.core.async.close_BANG_.call(null,out);
var state_28201__$1 = state_28201;
var statearr_28212_28229 = state_28201__$1;
(statearr_28212_28229[(2)] = inst_28186);

(statearr_28212_28229[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28202 === (10))){
var inst_28194 = (state_28201[(2)]);
var state_28201__$1 = (function (){var statearr_28213 = state_28201;
(statearr_28213[(8)] = inst_28194);

return statearr_28213;
})();
var statearr_28214_28230 = state_28201__$1;
(statearr_28214_28230[(2)] = null);

(statearr_28214_28230[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28202 === (8))){
var inst_28183 = (state_28201[(7)]);
var state_28201__$1 = state_28201;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_28201__$1,(11),out,inst_28183);
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
var cljs$core$async$state_machine__26587__auto__ = null;
var cljs$core$async$state_machine__26587__auto____0 = (function (){
var statearr_28215 = [null,null,null,null,null,null,null,null,null];
(statearr_28215[(0)] = cljs$core$async$state_machine__26587__auto__);

(statearr_28215[(1)] = (1));

return statearr_28215;
});
var cljs$core$async$state_machine__26587__auto____1 = (function (state_28201){
while(true){
var ret_value__26588__auto__ = (function (){try{while(true){
var result__26589__auto__ = switch__26586__auto__.call(null,state_28201);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26589__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26589__auto__;
}
break;
}
}catch (e28216){if((e28216 instanceof Object)){
var ex__26590__auto__ = e28216;
var statearr_28217_28231 = state_28201;
(statearr_28217_28231[(5)] = ex__26590__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_28201);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e28216;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__28232 = state_28201;
state_28201 = G__28232;
continue;
} else {
return ret_value__26588__auto__;
}
break;
}
});
cljs$core$async$state_machine__26587__auto__ = function(state_28201){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__26587__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__26587__auto____1.call(this,state_28201);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__26587__auto____0;
cljs$core$async$state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__26587__auto____1;
return cljs$core$async$state_machine__26587__auto__;
})()
})();
var state__26683__auto__ = (function (){var statearr_28218 = f__26682__auto__.call(null);
(statearr_28218[(6)] = c__26681__auto___28220);

return statearr_28218;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26683__auto__);
}));


return out;
}));

(cljs.core.async.filter_LT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_LT_ = (function cljs$core$async$remove_LT_(var_args){
var G__28234 = arguments.length;
switch (G__28234) {
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
var c__26681__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26682__auto__ = (function (){var switch__26586__auto__ = (function (state_28297){
var state_val_28298 = (state_28297[(1)]);
if((state_val_28298 === (7))){
var inst_28293 = (state_28297[(2)]);
var state_28297__$1 = state_28297;
var statearr_28299_28337 = state_28297__$1;
(statearr_28299_28337[(2)] = inst_28293);

(statearr_28299_28337[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28298 === (20))){
var inst_28263 = (state_28297[(7)]);
var inst_28274 = (state_28297[(2)]);
var inst_28275 = cljs.core.next.call(null,inst_28263);
var inst_28249 = inst_28275;
var inst_28250 = null;
var inst_28251 = (0);
var inst_28252 = (0);
var state_28297__$1 = (function (){var statearr_28300 = state_28297;
(statearr_28300[(8)] = inst_28252);

(statearr_28300[(9)] = inst_28250);

(statearr_28300[(10)] = inst_28249);

(statearr_28300[(11)] = inst_28274);

(statearr_28300[(12)] = inst_28251);

return statearr_28300;
})();
var statearr_28301_28338 = state_28297__$1;
(statearr_28301_28338[(2)] = null);

(statearr_28301_28338[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28298 === (1))){
var state_28297__$1 = state_28297;
var statearr_28302_28339 = state_28297__$1;
(statearr_28302_28339[(2)] = null);

(statearr_28302_28339[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28298 === (4))){
var inst_28238 = (state_28297[(13)]);
var inst_28238__$1 = (state_28297[(2)]);
var inst_28239 = (inst_28238__$1 == null);
var state_28297__$1 = (function (){var statearr_28303 = state_28297;
(statearr_28303[(13)] = inst_28238__$1);

return statearr_28303;
})();
if(cljs.core.truth_(inst_28239)){
var statearr_28304_28340 = state_28297__$1;
(statearr_28304_28340[(1)] = (5));

} else {
var statearr_28305_28341 = state_28297__$1;
(statearr_28305_28341[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28298 === (15))){
var state_28297__$1 = state_28297;
var statearr_28309_28342 = state_28297__$1;
(statearr_28309_28342[(2)] = null);

(statearr_28309_28342[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28298 === (21))){
var state_28297__$1 = state_28297;
var statearr_28310_28343 = state_28297__$1;
(statearr_28310_28343[(2)] = null);

(statearr_28310_28343[(1)] = (23));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28298 === (13))){
var inst_28252 = (state_28297[(8)]);
var inst_28250 = (state_28297[(9)]);
var inst_28249 = (state_28297[(10)]);
var inst_28251 = (state_28297[(12)]);
var inst_28259 = (state_28297[(2)]);
var inst_28260 = (inst_28252 + (1));
var tmp28306 = inst_28250;
var tmp28307 = inst_28249;
var tmp28308 = inst_28251;
var inst_28249__$1 = tmp28307;
var inst_28250__$1 = tmp28306;
var inst_28251__$1 = tmp28308;
var inst_28252__$1 = inst_28260;
var state_28297__$1 = (function (){var statearr_28311 = state_28297;
(statearr_28311[(14)] = inst_28259);

(statearr_28311[(8)] = inst_28252__$1);

(statearr_28311[(9)] = inst_28250__$1);

(statearr_28311[(10)] = inst_28249__$1);

(statearr_28311[(12)] = inst_28251__$1);

return statearr_28311;
})();
var statearr_28312_28344 = state_28297__$1;
(statearr_28312_28344[(2)] = null);

(statearr_28312_28344[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28298 === (22))){
var state_28297__$1 = state_28297;
var statearr_28313_28345 = state_28297__$1;
(statearr_28313_28345[(2)] = null);

(statearr_28313_28345[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28298 === (6))){
var inst_28238 = (state_28297[(13)]);
var inst_28247 = f.call(null,inst_28238);
var inst_28248 = cljs.core.seq.call(null,inst_28247);
var inst_28249 = inst_28248;
var inst_28250 = null;
var inst_28251 = (0);
var inst_28252 = (0);
var state_28297__$1 = (function (){var statearr_28314 = state_28297;
(statearr_28314[(8)] = inst_28252);

(statearr_28314[(9)] = inst_28250);

(statearr_28314[(10)] = inst_28249);

(statearr_28314[(12)] = inst_28251);

return statearr_28314;
})();
var statearr_28315_28346 = state_28297__$1;
(statearr_28315_28346[(2)] = null);

(statearr_28315_28346[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28298 === (17))){
var inst_28263 = (state_28297[(7)]);
var inst_28267 = cljs.core.chunk_first.call(null,inst_28263);
var inst_28268 = cljs.core.chunk_rest.call(null,inst_28263);
var inst_28269 = cljs.core.count.call(null,inst_28267);
var inst_28249 = inst_28268;
var inst_28250 = inst_28267;
var inst_28251 = inst_28269;
var inst_28252 = (0);
var state_28297__$1 = (function (){var statearr_28316 = state_28297;
(statearr_28316[(8)] = inst_28252);

(statearr_28316[(9)] = inst_28250);

(statearr_28316[(10)] = inst_28249);

(statearr_28316[(12)] = inst_28251);

return statearr_28316;
})();
var statearr_28317_28347 = state_28297__$1;
(statearr_28317_28347[(2)] = null);

(statearr_28317_28347[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28298 === (3))){
var inst_28295 = (state_28297[(2)]);
var state_28297__$1 = state_28297;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_28297__$1,inst_28295);
} else {
if((state_val_28298 === (12))){
var inst_28283 = (state_28297[(2)]);
var state_28297__$1 = state_28297;
var statearr_28318_28348 = state_28297__$1;
(statearr_28318_28348[(2)] = inst_28283);

(statearr_28318_28348[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28298 === (2))){
var state_28297__$1 = state_28297;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_28297__$1,(4),in$);
} else {
if((state_val_28298 === (23))){
var inst_28291 = (state_28297[(2)]);
var state_28297__$1 = state_28297;
var statearr_28319_28349 = state_28297__$1;
(statearr_28319_28349[(2)] = inst_28291);

(statearr_28319_28349[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28298 === (19))){
var inst_28278 = (state_28297[(2)]);
var state_28297__$1 = state_28297;
var statearr_28320_28350 = state_28297__$1;
(statearr_28320_28350[(2)] = inst_28278);

(statearr_28320_28350[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28298 === (11))){
var inst_28249 = (state_28297[(10)]);
var inst_28263 = (state_28297[(7)]);
var inst_28263__$1 = cljs.core.seq.call(null,inst_28249);
var state_28297__$1 = (function (){var statearr_28321 = state_28297;
(statearr_28321[(7)] = inst_28263__$1);

return statearr_28321;
})();
if(inst_28263__$1){
var statearr_28322_28351 = state_28297__$1;
(statearr_28322_28351[(1)] = (14));

} else {
var statearr_28323_28352 = state_28297__$1;
(statearr_28323_28352[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28298 === (9))){
var inst_28285 = (state_28297[(2)]);
var inst_28286 = cljs.core.async.impl.protocols.closed_QMARK_.call(null,out);
var state_28297__$1 = (function (){var statearr_28324 = state_28297;
(statearr_28324[(15)] = inst_28285);

return statearr_28324;
})();
if(cljs.core.truth_(inst_28286)){
var statearr_28325_28353 = state_28297__$1;
(statearr_28325_28353[(1)] = (21));

} else {
var statearr_28326_28354 = state_28297__$1;
(statearr_28326_28354[(1)] = (22));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28298 === (5))){
var inst_28241 = cljs.core.async.close_BANG_.call(null,out);
var state_28297__$1 = state_28297;
var statearr_28327_28355 = state_28297__$1;
(statearr_28327_28355[(2)] = inst_28241);

(statearr_28327_28355[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28298 === (14))){
var inst_28263 = (state_28297[(7)]);
var inst_28265 = cljs.core.chunked_seq_QMARK_.call(null,inst_28263);
var state_28297__$1 = state_28297;
if(inst_28265){
var statearr_28328_28356 = state_28297__$1;
(statearr_28328_28356[(1)] = (17));

} else {
var statearr_28329_28357 = state_28297__$1;
(statearr_28329_28357[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28298 === (16))){
var inst_28281 = (state_28297[(2)]);
var state_28297__$1 = state_28297;
var statearr_28330_28358 = state_28297__$1;
(statearr_28330_28358[(2)] = inst_28281);

(statearr_28330_28358[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28298 === (10))){
var inst_28252 = (state_28297[(8)]);
var inst_28250 = (state_28297[(9)]);
var inst_28257 = cljs.core._nth.call(null,inst_28250,inst_28252);
var state_28297__$1 = state_28297;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_28297__$1,(13),out,inst_28257);
} else {
if((state_val_28298 === (18))){
var inst_28263 = (state_28297[(7)]);
var inst_28272 = cljs.core.first.call(null,inst_28263);
var state_28297__$1 = state_28297;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_28297__$1,(20),out,inst_28272);
} else {
if((state_val_28298 === (8))){
var inst_28252 = (state_28297[(8)]);
var inst_28251 = (state_28297[(12)]);
var inst_28254 = (inst_28252 < inst_28251);
var inst_28255 = inst_28254;
var state_28297__$1 = state_28297;
if(cljs.core.truth_(inst_28255)){
var statearr_28331_28359 = state_28297__$1;
(statearr_28331_28359[(1)] = (10));

} else {
var statearr_28332_28360 = state_28297__$1;
(statearr_28332_28360[(1)] = (11));

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
var cljs$core$async$mapcat_STAR__$_state_machine__26587__auto__ = null;
var cljs$core$async$mapcat_STAR__$_state_machine__26587__auto____0 = (function (){
var statearr_28333 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_28333[(0)] = cljs$core$async$mapcat_STAR__$_state_machine__26587__auto__);

(statearr_28333[(1)] = (1));

return statearr_28333;
});
var cljs$core$async$mapcat_STAR__$_state_machine__26587__auto____1 = (function (state_28297){
while(true){
var ret_value__26588__auto__ = (function (){try{while(true){
var result__26589__auto__ = switch__26586__auto__.call(null,state_28297);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26589__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26589__auto__;
}
break;
}
}catch (e28334){if((e28334 instanceof Object)){
var ex__26590__auto__ = e28334;
var statearr_28335_28361 = state_28297;
(statearr_28335_28361[(5)] = ex__26590__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_28297);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e28334;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__28362 = state_28297;
state_28297 = G__28362;
continue;
} else {
return ret_value__26588__auto__;
}
break;
}
});
cljs$core$async$mapcat_STAR__$_state_machine__26587__auto__ = function(state_28297){
switch(arguments.length){
case 0:
return cljs$core$async$mapcat_STAR__$_state_machine__26587__auto____0.call(this);
case 1:
return cljs$core$async$mapcat_STAR__$_state_machine__26587__auto____1.call(this,state_28297);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mapcat_STAR__$_state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mapcat_STAR__$_state_machine__26587__auto____0;
cljs$core$async$mapcat_STAR__$_state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mapcat_STAR__$_state_machine__26587__auto____1;
return cljs$core$async$mapcat_STAR__$_state_machine__26587__auto__;
})()
})();
var state__26683__auto__ = (function (){var statearr_28336 = f__26682__auto__.call(null);
(statearr_28336[(6)] = c__26681__auto__);

return statearr_28336;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26683__auto__);
}));

return c__26681__auto__;
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_LT_ = (function cljs$core$async$mapcat_LT_(var_args){
var G__28364 = arguments.length;
switch (G__28364) {
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
var G__28367 = arguments.length;
switch (G__28367) {
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
var G__28370 = arguments.length;
switch (G__28370) {
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
var c__26681__auto___28417 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26682__auto__ = (function (){var switch__26586__auto__ = (function (state_28394){
var state_val_28395 = (state_28394[(1)]);
if((state_val_28395 === (7))){
var inst_28389 = (state_28394[(2)]);
var state_28394__$1 = state_28394;
var statearr_28396_28418 = state_28394__$1;
(statearr_28396_28418[(2)] = inst_28389);

(statearr_28396_28418[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28395 === (1))){
var inst_28371 = null;
var state_28394__$1 = (function (){var statearr_28397 = state_28394;
(statearr_28397[(7)] = inst_28371);

return statearr_28397;
})();
var statearr_28398_28419 = state_28394__$1;
(statearr_28398_28419[(2)] = null);

(statearr_28398_28419[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28395 === (4))){
var inst_28374 = (state_28394[(8)]);
var inst_28374__$1 = (state_28394[(2)]);
var inst_28375 = (inst_28374__$1 == null);
var inst_28376 = cljs.core.not.call(null,inst_28375);
var state_28394__$1 = (function (){var statearr_28399 = state_28394;
(statearr_28399[(8)] = inst_28374__$1);

return statearr_28399;
})();
if(inst_28376){
var statearr_28400_28420 = state_28394__$1;
(statearr_28400_28420[(1)] = (5));

} else {
var statearr_28401_28421 = state_28394__$1;
(statearr_28401_28421[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28395 === (6))){
var state_28394__$1 = state_28394;
var statearr_28402_28422 = state_28394__$1;
(statearr_28402_28422[(2)] = null);

(statearr_28402_28422[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28395 === (3))){
var inst_28391 = (state_28394[(2)]);
var inst_28392 = cljs.core.async.close_BANG_.call(null,out);
var state_28394__$1 = (function (){var statearr_28403 = state_28394;
(statearr_28403[(9)] = inst_28391);

return statearr_28403;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_28394__$1,inst_28392);
} else {
if((state_val_28395 === (2))){
var state_28394__$1 = state_28394;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_28394__$1,(4),ch);
} else {
if((state_val_28395 === (11))){
var inst_28374 = (state_28394[(8)]);
var inst_28383 = (state_28394[(2)]);
var inst_28371 = inst_28374;
var state_28394__$1 = (function (){var statearr_28404 = state_28394;
(statearr_28404[(7)] = inst_28371);

(statearr_28404[(10)] = inst_28383);

return statearr_28404;
})();
var statearr_28405_28423 = state_28394__$1;
(statearr_28405_28423[(2)] = null);

(statearr_28405_28423[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28395 === (9))){
var inst_28374 = (state_28394[(8)]);
var state_28394__$1 = state_28394;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_28394__$1,(11),out,inst_28374);
} else {
if((state_val_28395 === (5))){
var inst_28371 = (state_28394[(7)]);
var inst_28374 = (state_28394[(8)]);
var inst_28378 = cljs.core._EQ_.call(null,inst_28374,inst_28371);
var state_28394__$1 = state_28394;
if(inst_28378){
var statearr_28407_28424 = state_28394__$1;
(statearr_28407_28424[(1)] = (8));

} else {
var statearr_28408_28425 = state_28394__$1;
(statearr_28408_28425[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28395 === (10))){
var inst_28386 = (state_28394[(2)]);
var state_28394__$1 = state_28394;
var statearr_28409_28426 = state_28394__$1;
(statearr_28409_28426[(2)] = inst_28386);

(statearr_28409_28426[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28395 === (8))){
var inst_28371 = (state_28394[(7)]);
var tmp28406 = inst_28371;
var inst_28371__$1 = tmp28406;
var state_28394__$1 = (function (){var statearr_28410 = state_28394;
(statearr_28410[(7)] = inst_28371__$1);

return statearr_28410;
})();
var statearr_28411_28427 = state_28394__$1;
(statearr_28411_28427[(2)] = null);

(statearr_28411_28427[(1)] = (2));


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
var cljs$core$async$state_machine__26587__auto__ = null;
var cljs$core$async$state_machine__26587__auto____0 = (function (){
var statearr_28412 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_28412[(0)] = cljs$core$async$state_machine__26587__auto__);

(statearr_28412[(1)] = (1));

return statearr_28412;
});
var cljs$core$async$state_machine__26587__auto____1 = (function (state_28394){
while(true){
var ret_value__26588__auto__ = (function (){try{while(true){
var result__26589__auto__ = switch__26586__auto__.call(null,state_28394);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26589__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26589__auto__;
}
break;
}
}catch (e28413){if((e28413 instanceof Object)){
var ex__26590__auto__ = e28413;
var statearr_28414_28428 = state_28394;
(statearr_28414_28428[(5)] = ex__26590__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_28394);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e28413;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__28429 = state_28394;
state_28394 = G__28429;
continue;
} else {
return ret_value__26588__auto__;
}
break;
}
});
cljs$core$async$state_machine__26587__auto__ = function(state_28394){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__26587__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__26587__auto____1.call(this,state_28394);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__26587__auto____0;
cljs$core$async$state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__26587__auto____1;
return cljs$core$async$state_machine__26587__auto__;
})()
})();
var state__26683__auto__ = (function (){var statearr_28415 = f__26682__auto__.call(null);
(statearr_28415[(6)] = c__26681__auto___28417);

return statearr_28415;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26683__auto__);
}));


return out;
}));

(cljs.core.async.unique.cljs$lang$maxFixedArity = 2);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition = (function cljs$core$async$partition(var_args){
var G__28431 = arguments.length;
switch (G__28431) {
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
var c__26681__auto___28497 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26682__auto__ = (function (){var switch__26586__auto__ = (function (state_28469){
var state_val_28470 = (state_28469[(1)]);
if((state_val_28470 === (7))){
var inst_28465 = (state_28469[(2)]);
var state_28469__$1 = state_28469;
var statearr_28471_28498 = state_28469__$1;
(statearr_28471_28498[(2)] = inst_28465);

(statearr_28471_28498[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28470 === (1))){
var inst_28432 = (new Array(n));
var inst_28433 = inst_28432;
var inst_28434 = (0);
var state_28469__$1 = (function (){var statearr_28472 = state_28469;
(statearr_28472[(7)] = inst_28433);

(statearr_28472[(8)] = inst_28434);

return statearr_28472;
})();
var statearr_28473_28499 = state_28469__$1;
(statearr_28473_28499[(2)] = null);

(statearr_28473_28499[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28470 === (4))){
var inst_28437 = (state_28469[(9)]);
var inst_28437__$1 = (state_28469[(2)]);
var inst_28438 = (inst_28437__$1 == null);
var inst_28439 = cljs.core.not.call(null,inst_28438);
var state_28469__$1 = (function (){var statearr_28474 = state_28469;
(statearr_28474[(9)] = inst_28437__$1);

return statearr_28474;
})();
if(inst_28439){
var statearr_28475_28500 = state_28469__$1;
(statearr_28475_28500[(1)] = (5));

} else {
var statearr_28476_28501 = state_28469__$1;
(statearr_28476_28501[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28470 === (15))){
var inst_28459 = (state_28469[(2)]);
var state_28469__$1 = state_28469;
var statearr_28477_28502 = state_28469__$1;
(statearr_28477_28502[(2)] = inst_28459);

(statearr_28477_28502[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28470 === (13))){
var state_28469__$1 = state_28469;
var statearr_28478_28503 = state_28469__$1;
(statearr_28478_28503[(2)] = null);

(statearr_28478_28503[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28470 === (6))){
var inst_28434 = (state_28469[(8)]);
var inst_28455 = (inst_28434 > (0));
var state_28469__$1 = state_28469;
if(cljs.core.truth_(inst_28455)){
var statearr_28479_28504 = state_28469__$1;
(statearr_28479_28504[(1)] = (12));

} else {
var statearr_28480_28505 = state_28469__$1;
(statearr_28480_28505[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28470 === (3))){
var inst_28467 = (state_28469[(2)]);
var state_28469__$1 = state_28469;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_28469__$1,inst_28467);
} else {
if((state_val_28470 === (12))){
var inst_28433 = (state_28469[(7)]);
var inst_28457 = cljs.core.vec.call(null,inst_28433);
var state_28469__$1 = state_28469;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_28469__$1,(15),out,inst_28457);
} else {
if((state_val_28470 === (2))){
var state_28469__$1 = state_28469;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_28469__$1,(4),ch);
} else {
if((state_val_28470 === (11))){
var inst_28449 = (state_28469[(2)]);
var inst_28450 = (new Array(n));
var inst_28433 = inst_28450;
var inst_28434 = (0);
var state_28469__$1 = (function (){var statearr_28481 = state_28469;
(statearr_28481[(7)] = inst_28433);

(statearr_28481[(8)] = inst_28434);

(statearr_28481[(10)] = inst_28449);

return statearr_28481;
})();
var statearr_28482_28506 = state_28469__$1;
(statearr_28482_28506[(2)] = null);

(statearr_28482_28506[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28470 === (9))){
var inst_28433 = (state_28469[(7)]);
var inst_28447 = cljs.core.vec.call(null,inst_28433);
var state_28469__$1 = state_28469;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_28469__$1,(11),out,inst_28447);
} else {
if((state_val_28470 === (5))){
var inst_28433 = (state_28469[(7)]);
var inst_28434 = (state_28469[(8)]);
var inst_28437 = (state_28469[(9)]);
var inst_28442 = (state_28469[(11)]);
var inst_28441 = (inst_28433[inst_28434] = inst_28437);
var inst_28442__$1 = (inst_28434 + (1));
var inst_28443 = (inst_28442__$1 < n);
var state_28469__$1 = (function (){var statearr_28483 = state_28469;
(statearr_28483[(12)] = inst_28441);

(statearr_28483[(11)] = inst_28442__$1);

return statearr_28483;
})();
if(cljs.core.truth_(inst_28443)){
var statearr_28484_28507 = state_28469__$1;
(statearr_28484_28507[(1)] = (8));

} else {
var statearr_28485_28508 = state_28469__$1;
(statearr_28485_28508[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28470 === (14))){
var inst_28462 = (state_28469[(2)]);
var inst_28463 = cljs.core.async.close_BANG_.call(null,out);
var state_28469__$1 = (function (){var statearr_28487 = state_28469;
(statearr_28487[(13)] = inst_28462);

return statearr_28487;
})();
var statearr_28488_28509 = state_28469__$1;
(statearr_28488_28509[(2)] = inst_28463);

(statearr_28488_28509[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28470 === (10))){
var inst_28453 = (state_28469[(2)]);
var state_28469__$1 = state_28469;
var statearr_28489_28510 = state_28469__$1;
(statearr_28489_28510[(2)] = inst_28453);

(statearr_28489_28510[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28470 === (8))){
var inst_28433 = (state_28469[(7)]);
var inst_28442 = (state_28469[(11)]);
var tmp28486 = inst_28433;
var inst_28433__$1 = tmp28486;
var inst_28434 = inst_28442;
var state_28469__$1 = (function (){var statearr_28490 = state_28469;
(statearr_28490[(7)] = inst_28433__$1);

(statearr_28490[(8)] = inst_28434);

return statearr_28490;
})();
var statearr_28491_28511 = state_28469__$1;
(statearr_28491_28511[(2)] = null);

(statearr_28491_28511[(1)] = (2));


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
var cljs$core$async$state_machine__26587__auto__ = null;
var cljs$core$async$state_machine__26587__auto____0 = (function (){
var statearr_28492 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_28492[(0)] = cljs$core$async$state_machine__26587__auto__);

(statearr_28492[(1)] = (1));

return statearr_28492;
});
var cljs$core$async$state_machine__26587__auto____1 = (function (state_28469){
while(true){
var ret_value__26588__auto__ = (function (){try{while(true){
var result__26589__auto__ = switch__26586__auto__.call(null,state_28469);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26589__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26589__auto__;
}
break;
}
}catch (e28493){if((e28493 instanceof Object)){
var ex__26590__auto__ = e28493;
var statearr_28494_28512 = state_28469;
(statearr_28494_28512[(5)] = ex__26590__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_28469);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e28493;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__28513 = state_28469;
state_28469 = G__28513;
continue;
} else {
return ret_value__26588__auto__;
}
break;
}
});
cljs$core$async$state_machine__26587__auto__ = function(state_28469){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__26587__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__26587__auto____1.call(this,state_28469);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__26587__auto____0;
cljs$core$async$state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__26587__auto____1;
return cljs$core$async$state_machine__26587__auto__;
})()
})();
var state__26683__auto__ = (function (){var statearr_28495 = f__26682__auto__.call(null);
(statearr_28495[(6)] = c__26681__auto___28497);

return statearr_28495;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26683__auto__);
}));


return out;
}));

(cljs.core.async.partition.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition_by = (function cljs$core$async$partition_by(var_args){
var G__28515 = arguments.length;
switch (G__28515) {
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
var c__26681__auto___28585 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26682__auto__ = (function (){var switch__26586__auto__ = (function (state_28557){
var state_val_28558 = (state_28557[(1)]);
if((state_val_28558 === (7))){
var inst_28553 = (state_28557[(2)]);
var state_28557__$1 = state_28557;
var statearr_28559_28586 = state_28557__$1;
(statearr_28559_28586[(2)] = inst_28553);

(statearr_28559_28586[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28558 === (1))){
var inst_28516 = [];
var inst_28517 = inst_28516;
var inst_28518 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123);
var state_28557__$1 = (function (){var statearr_28560 = state_28557;
(statearr_28560[(7)] = inst_28518);

(statearr_28560[(8)] = inst_28517);

return statearr_28560;
})();
var statearr_28561_28587 = state_28557__$1;
(statearr_28561_28587[(2)] = null);

(statearr_28561_28587[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28558 === (4))){
var inst_28521 = (state_28557[(9)]);
var inst_28521__$1 = (state_28557[(2)]);
var inst_28522 = (inst_28521__$1 == null);
var inst_28523 = cljs.core.not.call(null,inst_28522);
var state_28557__$1 = (function (){var statearr_28562 = state_28557;
(statearr_28562[(9)] = inst_28521__$1);

return statearr_28562;
})();
if(inst_28523){
var statearr_28563_28588 = state_28557__$1;
(statearr_28563_28588[(1)] = (5));

} else {
var statearr_28564_28589 = state_28557__$1;
(statearr_28564_28589[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28558 === (15))){
var inst_28547 = (state_28557[(2)]);
var state_28557__$1 = state_28557;
var statearr_28565_28590 = state_28557__$1;
(statearr_28565_28590[(2)] = inst_28547);

(statearr_28565_28590[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28558 === (13))){
var state_28557__$1 = state_28557;
var statearr_28566_28591 = state_28557__$1;
(statearr_28566_28591[(2)] = null);

(statearr_28566_28591[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28558 === (6))){
var inst_28517 = (state_28557[(8)]);
var inst_28542 = inst_28517.length;
var inst_28543 = (inst_28542 > (0));
var state_28557__$1 = state_28557;
if(cljs.core.truth_(inst_28543)){
var statearr_28567_28592 = state_28557__$1;
(statearr_28567_28592[(1)] = (12));

} else {
var statearr_28568_28593 = state_28557__$1;
(statearr_28568_28593[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28558 === (3))){
var inst_28555 = (state_28557[(2)]);
var state_28557__$1 = state_28557;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_28557__$1,inst_28555);
} else {
if((state_val_28558 === (12))){
var inst_28517 = (state_28557[(8)]);
var inst_28545 = cljs.core.vec.call(null,inst_28517);
var state_28557__$1 = state_28557;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_28557__$1,(15),out,inst_28545);
} else {
if((state_val_28558 === (2))){
var state_28557__$1 = state_28557;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_28557__$1,(4),ch);
} else {
if((state_val_28558 === (11))){
var inst_28521 = (state_28557[(9)]);
var inst_28525 = (state_28557[(10)]);
var inst_28535 = (state_28557[(2)]);
var inst_28536 = [];
var inst_28537 = inst_28536.push(inst_28521);
var inst_28517 = inst_28536;
var inst_28518 = inst_28525;
var state_28557__$1 = (function (){var statearr_28569 = state_28557;
(statearr_28569[(11)] = inst_28535);

(statearr_28569[(7)] = inst_28518);

(statearr_28569[(12)] = inst_28537);

(statearr_28569[(8)] = inst_28517);

return statearr_28569;
})();
var statearr_28570_28594 = state_28557__$1;
(statearr_28570_28594[(2)] = null);

(statearr_28570_28594[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28558 === (9))){
var inst_28517 = (state_28557[(8)]);
var inst_28533 = cljs.core.vec.call(null,inst_28517);
var state_28557__$1 = state_28557;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_28557__$1,(11),out,inst_28533);
} else {
if((state_val_28558 === (5))){
var inst_28521 = (state_28557[(9)]);
var inst_28518 = (state_28557[(7)]);
var inst_28525 = (state_28557[(10)]);
var inst_28525__$1 = f.call(null,inst_28521);
var inst_28526 = cljs.core._EQ_.call(null,inst_28525__$1,inst_28518);
var inst_28527 = cljs.core.keyword_identical_QMARK_.call(null,inst_28518,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123));
var inst_28528 = ((inst_28526) || (inst_28527));
var state_28557__$1 = (function (){var statearr_28571 = state_28557;
(statearr_28571[(10)] = inst_28525__$1);

return statearr_28571;
})();
if(cljs.core.truth_(inst_28528)){
var statearr_28572_28595 = state_28557__$1;
(statearr_28572_28595[(1)] = (8));

} else {
var statearr_28573_28596 = state_28557__$1;
(statearr_28573_28596[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28558 === (14))){
var inst_28550 = (state_28557[(2)]);
var inst_28551 = cljs.core.async.close_BANG_.call(null,out);
var state_28557__$1 = (function (){var statearr_28575 = state_28557;
(statearr_28575[(13)] = inst_28550);

return statearr_28575;
})();
var statearr_28576_28597 = state_28557__$1;
(statearr_28576_28597[(2)] = inst_28551);

(statearr_28576_28597[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28558 === (10))){
var inst_28540 = (state_28557[(2)]);
var state_28557__$1 = state_28557;
var statearr_28577_28598 = state_28557__$1;
(statearr_28577_28598[(2)] = inst_28540);

(statearr_28577_28598[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28558 === (8))){
var inst_28521 = (state_28557[(9)]);
var inst_28525 = (state_28557[(10)]);
var inst_28517 = (state_28557[(8)]);
var inst_28530 = inst_28517.push(inst_28521);
var tmp28574 = inst_28517;
var inst_28517__$1 = tmp28574;
var inst_28518 = inst_28525;
var state_28557__$1 = (function (){var statearr_28578 = state_28557;
(statearr_28578[(14)] = inst_28530);

(statearr_28578[(7)] = inst_28518);

(statearr_28578[(8)] = inst_28517__$1);

return statearr_28578;
})();
var statearr_28579_28599 = state_28557__$1;
(statearr_28579_28599[(2)] = null);

(statearr_28579_28599[(1)] = (2));


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
var cljs$core$async$state_machine__26587__auto__ = null;
var cljs$core$async$state_machine__26587__auto____0 = (function (){
var statearr_28580 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_28580[(0)] = cljs$core$async$state_machine__26587__auto__);

(statearr_28580[(1)] = (1));

return statearr_28580;
});
var cljs$core$async$state_machine__26587__auto____1 = (function (state_28557){
while(true){
var ret_value__26588__auto__ = (function (){try{while(true){
var result__26589__auto__ = switch__26586__auto__.call(null,state_28557);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26589__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26589__auto__;
}
break;
}
}catch (e28581){if((e28581 instanceof Object)){
var ex__26590__auto__ = e28581;
var statearr_28582_28600 = state_28557;
(statearr_28582_28600[(5)] = ex__26590__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_28557);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e28581;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__28601 = state_28557;
state_28557 = G__28601;
continue;
} else {
return ret_value__26588__auto__;
}
break;
}
});
cljs$core$async$state_machine__26587__auto__ = function(state_28557){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__26587__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__26587__auto____1.call(this,state_28557);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__26587__auto____0;
cljs$core$async$state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__26587__auto____1;
return cljs$core$async$state_machine__26587__auto__;
})()
})();
var state__26683__auto__ = (function (){var statearr_28583 = f__26682__auto__.call(null);
(statearr_28583[(6)] = c__26681__auto___28585);

return statearr_28583;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26683__auto__);
}));


return out;
}));

(cljs.core.async.partition_by.cljs$lang$maxFixedArity = 3);


//# sourceMappingURL=async.js.map?rel=1587042621703
