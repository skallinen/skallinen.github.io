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
var G__26740 = arguments.length;
switch (G__26740) {
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
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async26741 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async26741 = (function (f,blockable,meta26742){
this.f = f;
this.blockable = blockable;
this.meta26742 = meta26742;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async26741.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_26743,meta26742__$1){
var self__ = this;
var _26743__$1 = this;
return (new cljs.core.async.t_cljs$core$async26741(self__.f,self__.blockable,meta26742__$1));
}));

(cljs.core.async.t_cljs$core$async26741.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_26743){
var self__ = this;
var _26743__$1 = this;
return self__.meta26742;
}));

(cljs.core.async.t_cljs$core$async26741.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async26741.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async26741.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.blockable;
}));

(cljs.core.async.t_cljs$core$async26741.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.f;
}));

(cljs.core.async.t_cljs$core$async26741.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"blockable","blockable",-28395259,null),new cljs.core.Symbol(null,"meta26742","meta26742",-1143576483,null)], null);
}));

(cljs.core.async.t_cljs$core$async26741.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async26741.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async26741");

(cljs.core.async.t_cljs$core$async26741.cljs$lang$ctorPrWriter = (function (this__4428__auto__,writer__4429__auto__,opt__4430__auto__){
return cljs.core._write.call(null,writer__4429__auto__,"cljs.core.async/t_cljs$core$async26741");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async26741.
 */
cljs.core.async.__GT_t_cljs$core$async26741 = (function cljs$core$async$__GT_t_cljs$core$async26741(f__$1,blockable__$1,meta26742){
return (new cljs.core.async.t_cljs$core$async26741(f__$1,blockable__$1,meta26742));
});

}

return (new cljs.core.async.t_cljs$core$async26741(f,blockable,cljs.core.PersistentArrayMap.EMPTY));
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
var G__26747 = arguments.length;
switch (G__26747) {
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
var G__26750 = arguments.length;
switch (G__26750) {
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
var G__26753 = arguments.length;
switch (G__26753) {
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
var val_26755 = cljs.core.deref.call(null,ret);
if(cljs.core.truth_(on_caller_QMARK_)){
fn1.call(null,val_26755);
} else {
cljs.core.async.impl.dispatch.run.call(null,(function (){
return fn1.call(null,val_26755);
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
var G__26757 = arguments.length;
switch (G__26757) {
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
var n__4666__auto___26759 = n;
var x_26760 = (0);
while(true){
if((x_26760 < n__4666__auto___26759)){
(a[x_26760] = (0));

var G__26761 = (x_26760 + (1));
x_26760 = G__26761;
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

var G__26762 = (i + (1));
i = G__26762;
continue;
}
break;
}
});
cljs.core.async.alt_flag = (function cljs$core$async$alt_flag(){
var flag = cljs.core.atom.call(null,true);
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async26763 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async26763 = (function (flag,meta26764){
this.flag = flag;
this.meta26764 = meta26764;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async26763.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_26765,meta26764__$1){
var self__ = this;
var _26765__$1 = this;
return (new cljs.core.async.t_cljs$core$async26763(self__.flag,meta26764__$1));
}));

(cljs.core.async.t_cljs$core$async26763.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_26765){
var self__ = this;
var _26765__$1 = this;
return self__.meta26764;
}));

(cljs.core.async.t_cljs$core$async26763.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async26763.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.deref.call(null,self__.flag);
}));

(cljs.core.async.t_cljs$core$async26763.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async26763.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.flag,null);

return true;
}));

(cljs.core.async.t_cljs$core$async26763.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"meta26764","meta26764",-217502461,null)], null);
}));

(cljs.core.async.t_cljs$core$async26763.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async26763.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async26763");

(cljs.core.async.t_cljs$core$async26763.cljs$lang$ctorPrWriter = (function (this__4428__auto__,writer__4429__auto__,opt__4430__auto__){
return cljs.core._write.call(null,writer__4429__auto__,"cljs.core.async/t_cljs$core$async26763");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async26763.
 */
cljs.core.async.__GT_t_cljs$core$async26763 = (function cljs$core$async$alt_flag_$___GT_t_cljs$core$async26763(flag__$1,meta26764){
return (new cljs.core.async.t_cljs$core$async26763(flag__$1,meta26764));
});

}

return (new cljs.core.async.t_cljs$core$async26763(flag,cljs.core.PersistentArrayMap.EMPTY));
});
cljs.core.async.alt_handler = (function cljs$core$async$alt_handler(flag,cb){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async26766 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async26766 = (function (flag,cb,meta26767){
this.flag = flag;
this.cb = cb;
this.meta26767 = meta26767;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async26766.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_26768,meta26767__$1){
var self__ = this;
var _26768__$1 = this;
return (new cljs.core.async.t_cljs$core$async26766(self__.flag,self__.cb,meta26767__$1));
}));

(cljs.core.async.t_cljs$core$async26766.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_26768){
var self__ = this;
var _26768__$1 = this;
return self__.meta26767;
}));

(cljs.core.async.t_cljs$core$async26766.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async26766.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.flag);
}));

(cljs.core.async.t_cljs$core$async26766.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async26766.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.async.impl.protocols.commit.call(null,self__.flag);

return self__.cb;
}));

(cljs.core.async.t_cljs$core$async26766.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null),new cljs.core.Symbol(null,"meta26767","meta26767",2043981676,null)], null);
}));

(cljs.core.async.t_cljs$core$async26766.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async26766.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async26766");

(cljs.core.async.t_cljs$core$async26766.cljs$lang$ctorPrWriter = (function (this__4428__auto__,writer__4429__auto__,opt__4430__auto__){
return cljs.core._write.call(null,writer__4429__auto__,"cljs.core.async/t_cljs$core$async26766");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async26766.
 */
cljs.core.async.__GT_t_cljs$core$async26766 = (function cljs$core$async$alt_handler_$___GT_t_cljs$core$async26766(flag__$1,cb__$1,meta26767){
return (new cljs.core.async.t_cljs$core$async26766(flag__$1,cb__$1,meta26767));
});

}

return (new cljs.core.async.t_cljs$core$async26766(flag,cb,cljs.core.PersistentArrayMap.EMPTY));
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
return (function (p1__26769_SHARP_){
return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__26769_SHARP_,wport], null));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.alt_handler.call(null,flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__26770_SHARP_){
return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__26770_SHARP_,port], null));
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
var G__26771 = (i + (1));
i = G__26771;
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
var len__4789__auto___26777 = arguments.length;
var i__4790__auto___26778 = (0);
while(true){
if((i__4790__auto___26778 < len__4789__auto___26777)){
args__4795__auto__.push((arguments[i__4790__auto___26778]));

var G__26779 = (i__4790__auto___26778 + (1));
i__4790__auto___26778 = G__26779;
continue;
} else {
}
break;
}

var argseq__4796__auto__ = ((((1) < args__4795__auto__.length))?(new cljs.core.IndexedSeq(args__4795__auto__.slice((1)),(0),null)):null);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__4796__auto__);
});

(cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ports,p__26774){
var map__26775 = p__26774;
var map__26775__$1 = (((((!((map__26775 == null))))?(((((map__26775.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__26775.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__26775):map__26775);
var opts = map__26775__$1;
throw (new Error("alts! used not in (go ...) block"));
}));

(cljs.core.async.alts_BANG_.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(cljs.core.async.alts_BANG_.cljs$lang$applyTo = (function (seq26772){
var G__26773 = cljs.core.first.call(null,seq26772);
var seq26772__$1 = cljs.core.next.call(null,seq26772);
var self__4776__auto__ = this;
return self__4776__auto__.cljs$core$IFn$_invoke$arity$variadic(G__26773,seq26772__$1);
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
var G__26781 = arguments.length;
switch (G__26781) {
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
var c__26680__auto___26827 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26681__auto__ = (function (){var switch__26585__auto__ = (function (state_26805){
var state_val_26806 = (state_26805[(1)]);
if((state_val_26806 === (7))){
var inst_26801 = (state_26805[(2)]);
var state_26805__$1 = state_26805;
var statearr_26807_26828 = state_26805__$1;
(statearr_26807_26828[(2)] = inst_26801);

(statearr_26807_26828[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26806 === (1))){
var state_26805__$1 = state_26805;
var statearr_26808_26829 = state_26805__$1;
(statearr_26808_26829[(2)] = null);

(statearr_26808_26829[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26806 === (4))){
var inst_26784 = (state_26805[(7)]);
var inst_26784__$1 = (state_26805[(2)]);
var inst_26785 = (inst_26784__$1 == null);
var state_26805__$1 = (function (){var statearr_26809 = state_26805;
(statearr_26809[(7)] = inst_26784__$1);

return statearr_26809;
})();
if(cljs.core.truth_(inst_26785)){
var statearr_26810_26830 = state_26805__$1;
(statearr_26810_26830[(1)] = (5));

} else {
var statearr_26811_26831 = state_26805__$1;
(statearr_26811_26831[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26806 === (13))){
var state_26805__$1 = state_26805;
var statearr_26812_26832 = state_26805__$1;
(statearr_26812_26832[(2)] = null);

(statearr_26812_26832[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26806 === (6))){
var inst_26784 = (state_26805[(7)]);
var state_26805__$1 = state_26805;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26805__$1,(11),to,inst_26784);
} else {
if((state_val_26806 === (3))){
var inst_26803 = (state_26805[(2)]);
var state_26805__$1 = state_26805;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26805__$1,inst_26803);
} else {
if((state_val_26806 === (12))){
var state_26805__$1 = state_26805;
var statearr_26813_26833 = state_26805__$1;
(statearr_26813_26833[(2)] = null);

(statearr_26813_26833[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26806 === (2))){
var state_26805__$1 = state_26805;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26805__$1,(4),from);
} else {
if((state_val_26806 === (11))){
var inst_26794 = (state_26805[(2)]);
var state_26805__$1 = state_26805;
if(cljs.core.truth_(inst_26794)){
var statearr_26814_26834 = state_26805__$1;
(statearr_26814_26834[(1)] = (12));

} else {
var statearr_26815_26835 = state_26805__$1;
(statearr_26815_26835[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26806 === (9))){
var state_26805__$1 = state_26805;
var statearr_26816_26836 = state_26805__$1;
(statearr_26816_26836[(2)] = null);

(statearr_26816_26836[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26806 === (5))){
var state_26805__$1 = state_26805;
if(cljs.core.truth_(close_QMARK_)){
var statearr_26817_26837 = state_26805__$1;
(statearr_26817_26837[(1)] = (8));

} else {
var statearr_26818_26838 = state_26805__$1;
(statearr_26818_26838[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26806 === (14))){
var inst_26799 = (state_26805[(2)]);
var state_26805__$1 = state_26805;
var statearr_26819_26839 = state_26805__$1;
(statearr_26819_26839[(2)] = inst_26799);

(statearr_26819_26839[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26806 === (10))){
var inst_26791 = (state_26805[(2)]);
var state_26805__$1 = state_26805;
var statearr_26820_26840 = state_26805__$1;
(statearr_26820_26840[(2)] = inst_26791);

(statearr_26820_26840[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26806 === (8))){
var inst_26788 = cljs.core.async.close_BANG_.call(null,to);
var state_26805__$1 = state_26805;
var statearr_26821_26841 = state_26805__$1;
(statearr_26821_26841[(2)] = inst_26788);

(statearr_26821_26841[(1)] = (10));


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
var cljs$core$async$state_machine__26586__auto__ = null;
var cljs$core$async$state_machine__26586__auto____0 = (function (){
var statearr_26822 = [null,null,null,null,null,null,null,null];
(statearr_26822[(0)] = cljs$core$async$state_machine__26586__auto__);

(statearr_26822[(1)] = (1));

return statearr_26822;
});
var cljs$core$async$state_machine__26586__auto____1 = (function (state_26805){
while(true){
var ret_value__26587__auto__ = (function (){try{while(true){
var result__26588__auto__ = switch__26585__auto__.call(null,state_26805);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26588__auto__;
}
break;
}
}catch (e26823){if((e26823 instanceof Object)){
var ex__26589__auto__ = e26823;
var statearr_26824_26842 = state_26805;
(statearr_26824_26842[(5)] = ex__26589__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26805);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26823;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26587__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26843 = state_26805;
state_26805 = G__26843;
continue;
} else {
return ret_value__26587__auto__;
}
break;
}
});
cljs$core$async$state_machine__26586__auto__ = function(state_26805){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__26586__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__26586__auto____1.call(this,state_26805);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__26586__auto____0;
cljs$core$async$state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__26586__auto____1;
return cljs$core$async$state_machine__26586__auto__;
})()
})();
var state__26682__auto__ = (function (){var statearr_26825 = f__26681__auto__.call(null);
(statearr_26825[(6)] = c__26680__auto___26827);

return statearr_26825;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26682__auto__);
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
var process = (function (p__26844){
var vec__26845 = p__26844;
var v = cljs.core.nth.call(null,vec__26845,(0),null);
var p = cljs.core.nth.call(null,vec__26845,(1),null);
var job = vec__26845;
if((job == null)){
cljs.core.async.close_BANG_.call(null,results);

return null;
} else {
var res = cljs.core.async.chan.call(null,(1),xf,ex_handler);
var c__26680__auto___27016 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26681__auto__ = (function (){var switch__26585__auto__ = (function (state_26852){
var state_val_26853 = (state_26852[(1)]);
if((state_val_26853 === (1))){
var state_26852__$1 = state_26852;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26852__$1,(2),res,v);
} else {
if((state_val_26853 === (2))){
var inst_26849 = (state_26852[(2)]);
var inst_26850 = cljs.core.async.close_BANG_.call(null,res);
var state_26852__$1 = (function (){var statearr_26854 = state_26852;
(statearr_26854[(7)] = inst_26849);

return statearr_26854;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26852__$1,inst_26850);
} else {
return null;
}
}
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__26586__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__26586__auto____0 = (function (){
var statearr_26855 = [null,null,null,null,null,null,null,null];
(statearr_26855[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__26586__auto__);

(statearr_26855[(1)] = (1));

return statearr_26855;
});
var cljs$core$async$pipeline_STAR__$_state_machine__26586__auto____1 = (function (state_26852){
while(true){
var ret_value__26587__auto__ = (function (){try{while(true){
var result__26588__auto__ = switch__26585__auto__.call(null,state_26852);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26588__auto__;
}
break;
}
}catch (e26856){if((e26856 instanceof Object)){
var ex__26589__auto__ = e26856;
var statearr_26857_27017 = state_26852;
(statearr_26857_27017[(5)] = ex__26589__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26852);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26856;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26587__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27018 = state_26852;
state_26852 = G__27018;
continue;
} else {
return ret_value__26587__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__26586__auto__ = function(state_26852){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__26586__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__26586__auto____1.call(this,state_26852);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__26586__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__26586__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__26586__auto__;
})()
})();
var state__26682__auto__ = (function (){var statearr_26858 = f__26681__auto__.call(null);
(statearr_26858[(6)] = c__26680__auto___27016);

return statearr_26858;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26682__auto__);
}));


cljs.core.async.put_BANG_.call(null,p,res);

return true;
}
});
var async = (function (p__26859){
var vec__26860 = p__26859;
var v = cljs.core.nth.call(null,vec__26860,(0),null);
var p = cljs.core.nth.call(null,vec__26860,(1),null);
var job = vec__26860;
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
var n__4666__auto___27019 = n;
var __27020 = (0);
while(true){
if((__27020 < n__4666__auto___27019)){
var G__26863_27021 = type;
var G__26863_27022__$1 = (((G__26863_27021 instanceof cljs.core.Keyword))?G__26863_27021.fqn:null);
switch (G__26863_27022__$1) {
case "compute":
var c__26680__auto___27024 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (__27020,c__26680__auto___27024,G__26863_27021,G__26863_27022__$1,n__4666__auto___27019,jobs,results,process,async){
return (function (){
var f__26681__auto__ = (function (){var switch__26585__auto__ = ((function (__27020,c__26680__auto___27024,G__26863_27021,G__26863_27022__$1,n__4666__auto___27019,jobs,results,process,async){
return (function (state_26876){
var state_val_26877 = (state_26876[(1)]);
if((state_val_26877 === (1))){
var state_26876__$1 = state_26876;
var statearr_26878_27025 = state_26876__$1;
(statearr_26878_27025[(2)] = null);

(statearr_26878_27025[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26877 === (2))){
var state_26876__$1 = state_26876;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26876__$1,(4),jobs);
} else {
if((state_val_26877 === (3))){
var inst_26874 = (state_26876[(2)]);
var state_26876__$1 = state_26876;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26876__$1,inst_26874);
} else {
if((state_val_26877 === (4))){
var inst_26866 = (state_26876[(2)]);
var inst_26867 = process.call(null,inst_26866);
var state_26876__$1 = state_26876;
if(cljs.core.truth_(inst_26867)){
var statearr_26879_27026 = state_26876__$1;
(statearr_26879_27026[(1)] = (5));

} else {
var statearr_26880_27027 = state_26876__$1;
(statearr_26880_27027[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26877 === (5))){
var state_26876__$1 = state_26876;
var statearr_26881_27028 = state_26876__$1;
(statearr_26881_27028[(2)] = null);

(statearr_26881_27028[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26877 === (6))){
var state_26876__$1 = state_26876;
var statearr_26882_27029 = state_26876__$1;
(statearr_26882_27029[(2)] = null);

(statearr_26882_27029[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26877 === (7))){
var inst_26872 = (state_26876[(2)]);
var state_26876__$1 = state_26876;
var statearr_26883_27030 = state_26876__$1;
(statearr_26883_27030[(2)] = inst_26872);

(statearr_26883_27030[(1)] = (3));


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
});})(__27020,c__26680__auto___27024,G__26863_27021,G__26863_27022__$1,n__4666__auto___27019,jobs,results,process,async))
;
return ((function (__27020,switch__26585__auto__,c__26680__auto___27024,G__26863_27021,G__26863_27022__$1,n__4666__auto___27019,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__26586__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__26586__auto____0 = (function (){
var statearr_26884 = [null,null,null,null,null,null,null];
(statearr_26884[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__26586__auto__);

(statearr_26884[(1)] = (1));

return statearr_26884;
});
var cljs$core$async$pipeline_STAR__$_state_machine__26586__auto____1 = (function (state_26876){
while(true){
var ret_value__26587__auto__ = (function (){try{while(true){
var result__26588__auto__ = switch__26585__auto__.call(null,state_26876);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26588__auto__;
}
break;
}
}catch (e26885){if((e26885 instanceof Object)){
var ex__26589__auto__ = e26885;
var statearr_26886_27031 = state_26876;
(statearr_26886_27031[(5)] = ex__26589__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26876);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26885;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26587__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27032 = state_26876;
state_26876 = G__27032;
continue;
} else {
return ret_value__26587__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__26586__auto__ = function(state_26876){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__26586__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__26586__auto____1.call(this,state_26876);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__26586__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__26586__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__26586__auto__;
})()
;})(__27020,switch__26585__auto__,c__26680__auto___27024,G__26863_27021,G__26863_27022__$1,n__4666__auto___27019,jobs,results,process,async))
})();
var state__26682__auto__ = (function (){var statearr_26887 = f__26681__auto__.call(null);
(statearr_26887[(6)] = c__26680__auto___27024);

return statearr_26887;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26682__auto__);
});})(__27020,c__26680__auto___27024,G__26863_27021,G__26863_27022__$1,n__4666__auto___27019,jobs,results,process,async))
);


break;
case "async":
var c__26680__auto___27033 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (__27020,c__26680__auto___27033,G__26863_27021,G__26863_27022__$1,n__4666__auto___27019,jobs,results,process,async){
return (function (){
var f__26681__auto__ = (function (){var switch__26585__auto__ = ((function (__27020,c__26680__auto___27033,G__26863_27021,G__26863_27022__$1,n__4666__auto___27019,jobs,results,process,async){
return (function (state_26900){
var state_val_26901 = (state_26900[(1)]);
if((state_val_26901 === (1))){
var state_26900__$1 = state_26900;
var statearr_26902_27034 = state_26900__$1;
(statearr_26902_27034[(2)] = null);

(statearr_26902_27034[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26901 === (2))){
var state_26900__$1 = state_26900;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26900__$1,(4),jobs);
} else {
if((state_val_26901 === (3))){
var inst_26898 = (state_26900[(2)]);
var state_26900__$1 = state_26900;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26900__$1,inst_26898);
} else {
if((state_val_26901 === (4))){
var inst_26890 = (state_26900[(2)]);
var inst_26891 = async.call(null,inst_26890);
var state_26900__$1 = state_26900;
if(cljs.core.truth_(inst_26891)){
var statearr_26903_27035 = state_26900__$1;
(statearr_26903_27035[(1)] = (5));

} else {
var statearr_26904_27036 = state_26900__$1;
(statearr_26904_27036[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26901 === (5))){
var state_26900__$1 = state_26900;
var statearr_26905_27037 = state_26900__$1;
(statearr_26905_27037[(2)] = null);

(statearr_26905_27037[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26901 === (6))){
var state_26900__$1 = state_26900;
var statearr_26906_27038 = state_26900__$1;
(statearr_26906_27038[(2)] = null);

(statearr_26906_27038[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26901 === (7))){
var inst_26896 = (state_26900[(2)]);
var state_26900__$1 = state_26900;
var statearr_26907_27039 = state_26900__$1;
(statearr_26907_27039[(2)] = inst_26896);

(statearr_26907_27039[(1)] = (3));


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
});})(__27020,c__26680__auto___27033,G__26863_27021,G__26863_27022__$1,n__4666__auto___27019,jobs,results,process,async))
;
return ((function (__27020,switch__26585__auto__,c__26680__auto___27033,G__26863_27021,G__26863_27022__$1,n__4666__auto___27019,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__26586__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__26586__auto____0 = (function (){
var statearr_26908 = [null,null,null,null,null,null,null];
(statearr_26908[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__26586__auto__);

(statearr_26908[(1)] = (1));

return statearr_26908;
});
var cljs$core$async$pipeline_STAR__$_state_machine__26586__auto____1 = (function (state_26900){
while(true){
var ret_value__26587__auto__ = (function (){try{while(true){
var result__26588__auto__ = switch__26585__auto__.call(null,state_26900);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26588__auto__;
}
break;
}
}catch (e26909){if((e26909 instanceof Object)){
var ex__26589__auto__ = e26909;
var statearr_26910_27040 = state_26900;
(statearr_26910_27040[(5)] = ex__26589__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26900);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26909;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26587__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27041 = state_26900;
state_26900 = G__27041;
continue;
} else {
return ret_value__26587__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__26586__auto__ = function(state_26900){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__26586__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__26586__auto____1.call(this,state_26900);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__26586__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__26586__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__26586__auto__;
})()
;})(__27020,switch__26585__auto__,c__26680__auto___27033,G__26863_27021,G__26863_27022__$1,n__4666__auto___27019,jobs,results,process,async))
})();
var state__26682__auto__ = (function (){var statearr_26911 = f__26681__auto__.call(null);
(statearr_26911[(6)] = c__26680__auto___27033);

return statearr_26911;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26682__auto__);
});})(__27020,c__26680__auto___27033,G__26863_27021,G__26863_27022__$1,n__4666__auto___27019,jobs,results,process,async))
);


break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__26863_27022__$1)].join('')));

}

var G__27042 = (__27020 + (1));
__27020 = G__27042;
continue;
} else {
}
break;
}

var c__26680__auto___27043 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26681__auto__ = (function (){var switch__26585__auto__ = (function (state_26933){
var state_val_26934 = (state_26933[(1)]);
if((state_val_26934 === (7))){
var inst_26929 = (state_26933[(2)]);
var state_26933__$1 = state_26933;
var statearr_26935_27044 = state_26933__$1;
(statearr_26935_27044[(2)] = inst_26929);

(statearr_26935_27044[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26934 === (1))){
var state_26933__$1 = state_26933;
var statearr_26936_27045 = state_26933__$1;
(statearr_26936_27045[(2)] = null);

(statearr_26936_27045[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26934 === (4))){
var inst_26914 = (state_26933[(7)]);
var inst_26914__$1 = (state_26933[(2)]);
var inst_26915 = (inst_26914__$1 == null);
var state_26933__$1 = (function (){var statearr_26937 = state_26933;
(statearr_26937[(7)] = inst_26914__$1);

return statearr_26937;
})();
if(cljs.core.truth_(inst_26915)){
var statearr_26938_27046 = state_26933__$1;
(statearr_26938_27046[(1)] = (5));

} else {
var statearr_26939_27047 = state_26933__$1;
(statearr_26939_27047[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26934 === (6))){
var inst_26914 = (state_26933[(7)]);
var inst_26919 = (state_26933[(8)]);
var inst_26919__$1 = cljs.core.async.chan.call(null,(1));
var inst_26920 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_26921 = [inst_26914,inst_26919__$1];
var inst_26922 = (new cljs.core.PersistentVector(null,2,(5),inst_26920,inst_26921,null));
var state_26933__$1 = (function (){var statearr_26940 = state_26933;
(statearr_26940[(8)] = inst_26919__$1);

return statearr_26940;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26933__$1,(8),jobs,inst_26922);
} else {
if((state_val_26934 === (3))){
var inst_26931 = (state_26933[(2)]);
var state_26933__$1 = state_26933;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26933__$1,inst_26931);
} else {
if((state_val_26934 === (2))){
var state_26933__$1 = state_26933;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26933__$1,(4),from);
} else {
if((state_val_26934 === (9))){
var inst_26926 = (state_26933[(2)]);
var state_26933__$1 = (function (){var statearr_26941 = state_26933;
(statearr_26941[(9)] = inst_26926);

return statearr_26941;
})();
var statearr_26942_27048 = state_26933__$1;
(statearr_26942_27048[(2)] = null);

(statearr_26942_27048[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26934 === (5))){
var inst_26917 = cljs.core.async.close_BANG_.call(null,jobs);
var state_26933__$1 = state_26933;
var statearr_26943_27049 = state_26933__$1;
(statearr_26943_27049[(2)] = inst_26917);

(statearr_26943_27049[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26934 === (8))){
var inst_26919 = (state_26933[(8)]);
var inst_26924 = (state_26933[(2)]);
var state_26933__$1 = (function (){var statearr_26944 = state_26933;
(statearr_26944[(10)] = inst_26924);

return statearr_26944;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26933__$1,(9),results,inst_26919);
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
var cljs$core$async$pipeline_STAR__$_state_machine__26586__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__26586__auto____0 = (function (){
var statearr_26945 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_26945[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__26586__auto__);

(statearr_26945[(1)] = (1));

return statearr_26945;
});
var cljs$core$async$pipeline_STAR__$_state_machine__26586__auto____1 = (function (state_26933){
while(true){
var ret_value__26587__auto__ = (function (){try{while(true){
var result__26588__auto__ = switch__26585__auto__.call(null,state_26933);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26588__auto__;
}
break;
}
}catch (e26946){if((e26946 instanceof Object)){
var ex__26589__auto__ = e26946;
var statearr_26947_27050 = state_26933;
(statearr_26947_27050[(5)] = ex__26589__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26933);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26946;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26587__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27051 = state_26933;
state_26933 = G__27051;
continue;
} else {
return ret_value__26587__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__26586__auto__ = function(state_26933){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__26586__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__26586__auto____1.call(this,state_26933);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__26586__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__26586__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__26586__auto__;
})()
})();
var state__26682__auto__ = (function (){var statearr_26948 = f__26681__auto__.call(null);
(statearr_26948[(6)] = c__26680__auto___27043);

return statearr_26948;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26682__auto__);
}));


var c__26680__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26681__auto__ = (function (){var switch__26585__auto__ = (function (state_26986){
var state_val_26987 = (state_26986[(1)]);
if((state_val_26987 === (7))){
var inst_26982 = (state_26986[(2)]);
var state_26986__$1 = state_26986;
var statearr_26988_27052 = state_26986__$1;
(statearr_26988_27052[(2)] = inst_26982);

(statearr_26988_27052[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26987 === (20))){
var state_26986__$1 = state_26986;
var statearr_26989_27053 = state_26986__$1;
(statearr_26989_27053[(2)] = null);

(statearr_26989_27053[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26987 === (1))){
var state_26986__$1 = state_26986;
var statearr_26990_27054 = state_26986__$1;
(statearr_26990_27054[(2)] = null);

(statearr_26990_27054[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26987 === (4))){
var inst_26951 = (state_26986[(7)]);
var inst_26951__$1 = (state_26986[(2)]);
var inst_26952 = (inst_26951__$1 == null);
var state_26986__$1 = (function (){var statearr_26991 = state_26986;
(statearr_26991[(7)] = inst_26951__$1);

return statearr_26991;
})();
if(cljs.core.truth_(inst_26952)){
var statearr_26992_27055 = state_26986__$1;
(statearr_26992_27055[(1)] = (5));

} else {
var statearr_26993_27056 = state_26986__$1;
(statearr_26993_27056[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26987 === (15))){
var inst_26964 = (state_26986[(8)]);
var state_26986__$1 = state_26986;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26986__$1,(18),to,inst_26964);
} else {
if((state_val_26987 === (21))){
var inst_26977 = (state_26986[(2)]);
var state_26986__$1 = state_26986;
var statearr_26994_27057 = state_26986__$1;
(statearr_26994_27057[(2)] = inst_26977);

(statearr_26994_27057[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26987 === (13))){
var inst_26979 = (state_26986[(2)]);
var state_26986__$1 = (function (){var statearr_26995 = state_26986;
(statearr_26995[(9)] = inst_26979);

return statearr_26995;
})();
var statearr_26996_27058 = state_26986__$1;
(statearr_26996_27058[(2)] = null);

(statearr_26996_27058[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26987 === (6))){
var inst_26951 = (state_26986[(7)]);
var state_26986__$1 = state_26986;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26986__$1,(11),inst_26951);
} else {
if((state_val_26987 === (17))){
var inst_26972 = (state_26986[(2)]);
var state_26986__$1 = state_26986;
if(cljs.core.truth_(inst_26972)){
var statearr_26997_27059 = state_26986__$1;
(statearr_26997_27059[(1)] = (19));

} else {
var statearr_26998_27060 = state_26986__$1;
(statearr_26998_27060[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26987 === (3))){
var inst_26984 = (state_26986[(2)]);
var state_26986__$1 = state_26986;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26986__$1,inst_26984);
} else {
if((state_val_26987 === (12))){
var inst_26961 = (state_26986[(10)]);
var state_26986__$1 = state_26986;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26986__$1,(14),inst_26961);
} else {
if((state_val_26987 === (2))){
var state_26986__$1 = state_26986;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26986__$1,(4),results);
} else {
if((state_val_26987 === (19))){
var state_26986__$1 = state_26986;
var statearr_26999_27061 = state_26986__$1;
(statearr_26999_27061[(2)] = null);

(statearr_26999_27061[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26987 === (11))){
var inst_26961 = (state_26986[(2)]);
var state_26986__$1 = (function (){var statearr_27000 = state_26986;
(statearr_27000[(10)] = inst_26961);

return statearr_27000;
})();
var statearr_27001_27062 = state_26986__$1;
(statearr_27001_27062[(2)] = null);

(statearr_27001_27062[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26987 === (9))){
var state_26986__$1 = state_26986;
var statearr_27002_27063 = state_26986__$1;
(statearr_27002_27063[(2)] = null);

(statearr_27002_27063[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26987 === (5))){
var state_26986__$1 = state_26986;
if(cljs.core.truth_(close_QMARK_)){
var statearr_27003_27064 = state_26986__$1;
(statearr_27003_27064[(1)] = (8));

} else {
var statearr_27004_27065 = state_26986__$1;
(statearr_27004_27065[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26987 === (14))){
var inst_26964 = (state_26986[(8)]);
var inst_26964__$1 = (state_26986[(2)]);
var inst_26965 = (inst_26964__$1 == null);
var inst_26966 = cljs.core.not.call(null,inst_26965);
var state_26986__$1 = (function (){var statearr_27005 = state_26986;
(statearr_27005[(8)] = inst_26964__$1);

return statearr_27005;
})();
if(inst_26966){
var statearr_27006_27066 = state_26986__$1;
(statearr_27006_27066[(1)] = (15));

} else {
var statearr_27007_27067 = state_26986__$1;
(statearr_27007_27067[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26987 === (16))){
var state_26986__$1 = state_26986;
var statearr_27008_27068 = state_26986__$1;
(statearr_27008_27068[(2)] = false);

(statearr_27008_27068[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26987 === (10))){
var inst_26958 = (state_26986[(2)]);
var state_26986__$1 = state_26986;
var statearr_27009_27069 = state_26986__$1;
(statearr_27009_27069[(2)] = inst_26958);

(statearr_27009_27069[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26987 === (18))){
var inst_26969 = (state_26986[(2)]);
var state_26986__$1 = state_26986;
var statearr_27010_27070 = state_26986__$1;
(statearr_27010_27070[(2)] = inst_26969);

(statearr_27010_27070[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26987 === (8))){
var inst_26955 = cljs.core.async.close_BANG_.call(null,to);
var state_26986__$1 = state_26986;
var statearr_27011_27071 = state_26986__$1;
(statearr_27011_27071[(2)] = inst_26955);

(statearr_27011_27071[(1)] = (10));


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
var cljs$core$async$pipeline_STAR__$_state_machine__26586__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__26586__auto____0 = (function (){
var statearr_27012 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_27012[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__26586__auto__);

(statearr_27012[(1)] = (1));

return statearr_27012;
});
var cljs$core$async$pipeline_STAR__$_state_machine__26586__auto____1 = (function (state_26986){
while(true){
var ret_value__26587__auto__ = (function (){try{while(true){
var result__26588__auto__ = switch__26585__auto__.call(null,state_26986);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26588__auto__;
}
break;
}
}catch (e27013){if((e27013 instanceof Object)){
var ex__26589__auto__ = e27013;
var statearr_27014_27072 = state_26986;
(statearr_27014_27072[(5)] = ex__26589__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26986);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e27013;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26587__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27073 = state_26986;
state_26986 = G__27073;
continue;
} else {
return ret_value__26587__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__26586__auto__ = function(state_26986){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__26586__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__26586__auto____1.call(this,state_26986);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__26586__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__26586__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__26586__auto__;
})()
})();
var state__26682__auto__ = (function (){var statearr_27015 = f__26681__auto__.call(null);
(statearr_27015[(6)] = c__26680__auto__);

return statearr_27015;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26682__auto__);
}));

return c__26680__auto__;
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
var G__27075 = arguments.length;
switch (G__27075) {
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
var G__27078 = arguments.length;
switch (G__27078) {
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
var G__27081 = arguments.length;
switch (G__27081) {
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
var c__26680__auto___27130 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26681__auto__ = (function (){var switch__26585__auto__ = (function (state_27107){
var state_val_27108 = (state_27107[(1)]);
if((state_val_27108 === (7))){
var inst_27103 = (state_27107[(2)]);
var state_27107__$1 = state_27107;
var statearr_27109_27131 = state_27107__$1;
(statearr_27109_27131[(2)] = inst_27103);

(statearr_27109_27131[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27108 === (1))){
var state_27107__$1 = state_27107;
var statearr_27110_27132 = state_27107__$1;
(statearr_27110_27132[(2)] = null);

(statearr_27110_27132[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27108 === (4))){
var inst_27084 = (state_27107[(7)]);
var inst_27084__$1 = (state_27107[(2)]);
var inst_27085 = (inst_27084__$1 == null);
var state_27107__$1 = (function (){var statearr_27111 = state_27107;
(statearr_27111[(7)] = inst_27084__$1);

return statearr_27111;
})();
if(cljs.core.truth_(inst_27085)){
var statearr_27112_27133 = state_27107__$1;
(statearr_27112_27133[(1)] = (5));

} else {
var statearr_27113_27134 = state_27107__$1;
(statearr_27113_27134[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27108 === (13))){
var state_27107__$1 = state_27107;
var statearr_27114_27135 = state_27107__$1;
(statearr_27114_27135[(2)] = null);

(statearr_27114_27135[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27108 === (6))){
var inst_27084 = (state_27107[(7)]);
var inst_27090 = p.call(null,inst_27084);
var state_27107__$1 = state_27107;
if(cljs.core.truth_(inst_27090)){
var statearr_27115_27136 = state_27107__$1;
(statearr_27115_27136[(1)] = (9));

} else {
var statearr_27116_27137 = state_27107__$1;
(statearr_27116_27137[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27108 === (3))){
var inst_27105 = (state_27107[(2)]);
var state_27107__$1 = state_27107;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_27107__$1,inst_27105);
} else {
if((state_val_27108 === (12))){
var state_27107__$1 = state_27107;
var statearr_27117_27138 = state_27107__$1;
(statearr_27117_27138[(2)] = null);

(statearr_27117_27138[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27108 === (2))){
var state_27107__$1 = state_27107;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27107__$1,(4),ch);
} else {
if((state_val_27108 === (11))){
var inst_27084 = (state_27107[(7)]);
var inst_27094 = (state_27107[(2)]);
var state_27107__$1 = state_27107;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_27107__$1,(8),inst_27094,inst_27084);
} else {
if((state_val_27108 === (9))){
var state_27107__$1 = state_27107;
var statearr_27118_27139 = state_27107__$1;
(statearr_27118_27139[(2)] = tc);

(statearr_27118_27139[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27108 === (5))){
var inst_27087 = cljs.core.async.close_BANG_.call(null,tc);
var inst_27088 = cljs.core.async.close_BANG_.call(null,fc);
var state_27107__$1 = (function (){var statearr_27119 = state_27107;
(statearr_27119[(8)] = inst_27087);

return statearr_27119;
})();
var statearr_27120_27140 = state_27107__$1;
(statearr_27120_27140[(2)] = inst_27088);

(statearr_27120_27140[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27108 === (14))){
var inst_27101 = (state_27107[(2)]);
var state_27107__$1 = state_27107;
var statearr_27121_27141 = state_27107__$1;
(statearr_27121_27141[(2)] = inst_27101);

(statearr_27121_27141[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27108 === (10))){
var state_27107__$1 = state_27107;
var statearr_27122_27142 = state_27107__$1;
(statearr_27122_27142[(2)] = fc);

(statearr_27122_27142[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27108 === (8))){
var inst_27096 = (state_27107[(2)]);
var state_27107__$1 = state_27107;
if(cljs.core.truth_(inst_27096)){
var statearr_27123_27143 = state_27107__$1;
(statearr_27123_27143[(1)] = (12));

} else {
var statearr_27124_27144 = state_27107__$1;
(statearr_27124_27144[(1)] = (13));

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
var cljs$core$async$state_machine__26586__auto__ = null;
var cljs$core$async$state_machine__26586__auto____0 = (function (){
var statearr_27125 = [null,null,null,null,null,null,null,null,null];
(statearr_27125[(0)] = cljs$core$async$state_machine__26586__auto__);

(statearr_27125[(1)] = (1));

return statearr_27125;
});
var cljs$core$async$state_machine__26586__auto____1 = (function (state_27107){
while(true){
var ret_value__26587__auto__ = (function (){try{while(true){
var result__26588__auto__ = switch__26585__auto__.call(null,state_27107);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26588__auto__;
}
break;
}
}catch (e27126){if((e27126 instanceof Object)){
var ex__26589__auto__ = e27126;
var statearr_27127_27145 = state_27107;
(statearr_27127_27145[(5)] = ex__26589__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27107);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e27126;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26587__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27146 = state_27107;
state_27107 = G__27146;
continue;
} else {
return ret_value__26587__auto__;
}
break;
}
});
cljs$core$async$state_machine__26586__auto__ = function(state_27107){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__26586__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__26586__auto____1.call(this,state_27107);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__26586__auto____0;
cljs$core$async$state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__26586__auto____1;
return cljs$core$async$state_machine__26586__auto__;
})()
})();
var state__26682__auto__ = (function (){var statearr_27128 = f__26681__auto__.call(null);
(statearr_27128[(6)] = c__26680__auto___27130);

return statearr_27128;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26682__auto__);
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
var c__26680__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26681__auto__ = (function (){var switch__26585__auto__ = (function (state_27167){
var state_val_27168 = (state_27167[(1)]);
if((state_val_27168 === (7))){
var inst_27163 = (state_27167[(2)]);
var state_27167__$1 = state_27167;
var statearr_27169_27187 = state_27167__$1;
(statearr_27169_27187[(2)] = inst_27163);

(statearr_27169_27187[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27168 === (1))){
var inst_27147 = init;
var state_27167__$1 = (function (){var statearr_27170 = state_27167;
(statearr_27170[(7)] = inst_27147);

return statearr_27170;
})();
var statearr_27171_27188 = state_27167__$1;
(statearr_27171_27188[(2)] = null);

(statearr_27171_27188[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27168 === (4))){
var inst_27150 = (state_27167[(8)]);
var inst_27150__$1 = (state_27167[(2)]);
var inst_27151 = (inst_27150__$1 == null);
var state_27167__$1 = (function (){var statearr_27172 = state_27167;
(statearr_27172[(8)] = inst_27150__$1);

return statearr_27172;
})();
if(cljs.core.truth_(inst_27151)){
var statearr_27173_27189 = state_27167__$1;
(statearr_27173_27189[(1)] = (5));

} else {
var statearr_27174_27190 = state_27167__$1;
(statearr_27174_27190[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27168 === (6))){
var inst_27150 = (state_27167[(8)]);
var inst_27147 = (state_27167[(7)]);
var inst_27154 = (state_27167[(9)]);
var inst_27154__$1 = f.call(null,inst_27147,inst_27150);
var inst_27155 = cljs.core.reduced_QMARK_.call(null,inst_27154__$1);
var state_27167__$1 = (function (){var statearr_27175 = state_27167;
(statearr_27175[(9)] = inst_27154__$1);

return statearr_27175;
})();
if(inst_27155){
var statearr_27176_27191 = state_27167__$1;
(statearr_27176_27191[(1)] = (8));

} else {
var statearr_27177_27192 = state_27167__$1;
(statearr_27177_27192[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27168 === (3))){
var inst_27165 = (state_27167[(2)]);
var state_27167__$1 = state_27167;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_27167__$1,inst_27165);
} else {
if((state_val_27168 === (2))){
var state_27167__$1 = state_27167;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27167__$1,(4),ch);
} else {
if((state_val_27168 === (9))){
var inst_27154 = (state_27167[(9)]);
var inst_27147 = inst_27154;
var state_27167__$1 = (function (){var statearr_27178 = state_27167;
(statearr_27178[(7)] = inst_27147);

return statearr_27178;
})();
var statearr_27179_27193 = state_27167__$1;
(statearr_27179_27193[(2)] = null);

(statearr_27179_27193[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27168 === (5))){
var inst_27147 = (state_27167[(7)]);
var state_27167__$1 = state_27167;
var statearr_27180_27194 = state_27167__$1;
(statearr_27180_27194[(2)] = inst_27147);

(statearr_27180_27194[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27168 === (10))){
var inst_27161 = (state_27167[(2)]);
var state_27167__$1 = state_27167;
var statearr_27181_27195 = state_27167__$1;
(statearr_27181_27195[(2)] = inst_27161);

(statearr_27181_27195[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27168 === (8))){
var inst_27154 = (state_27167[(9)]);
var inst_27157 = cljs.core.deref.call(null,inst_27154);
var state_27167__$1 = state_27167;
var statearr_27182_27196 = state_27167__$1;
(statearr_27182_27196[(2)] = inst_27157);

(statearr_27182_27196[(1)] = (10));


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
var cljs$core$async$reduce_$_state_machine__26586__auto__ = null;
var cljs$core$async$reduce_$_state_machine__26586__auto____0 = (function (){
var statearr_27183 = [null,null,null,null,null,null,null,null,null,null];
(statearr_27183[(0)] = cljs$core$async$reduce_$_state_machine__26586__auto__);

(statearr_27183[(1)] = (1));

return statearr_27183;
});
var cljs$core$async$reduce_$_state_machine__26586__auto____1 = (function (state_27167){
while(true){
var ret_value__26587__auto__ = (function (){try{while(true){
var result__26588__auto__ = switch__26585__auto__.call(null,state_27167);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26588__auto__;
}
break;
}
}catch (e27184){if((e27184 instanceof Object)){
var ex__26589__auto__ = e27184;
var statearr_27185_27197 = state_27167;
(statearr_27185_27197[(5)] = ex__26589__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27167);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e27184;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26587__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27198 = state_27167;
state_27167 = G__27198;
continue;
} else {
return ret_value__26587__auto__;
}
break;
}
});
cljs$core$async$reduce_$_state_machine__26586__auto__ = function(state_27167){
switch(arguments.length){
case 0:
return cljs$core$async$reduce_$_state_machine__26586__auto____0.call(this);
case 1:
return cljs$core$async$reduce_$_state_machine__26586__auto____1.call(this,state_27167);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$reduce_$_state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$reduce_$_state_machine__26586__auto____0;
cljs$core$async$reduce_$_state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$reduce_$_state_machine__26586__auto____1;
return cljs$core$async$reduce_$_state_machine__26586__auto__;
})()
})();
var state__26682__auto__ = (function (){var statearr_27186 = f__26681__auto__.call(null);
(statearr_27186[(6)] = c__26680__auto__);

return statearr_27186;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26682__auto__);
}));

return c__26680__auto__;
});
/**
 * async/reduces a channel with a transformation (xform f).
 *   Returns a channel containing the result.  ch must close before
 *   transduce produces a result.
 */
cljs.core.async.transduce = (function cljs$core$async$transduce(xform,f,init,ch){
var f__$1 = xform.call(null,f);
var c__26680__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26681__auto__ = (function (){var switch__26585__auto__ = (function (state_27204){
var state_val_27205 = (state_27204[(1)]);
if((state_val_27205 === (1))){
var inst_27199 = cljs.core.async.reduce.call(null,f__$1,init,ch);
var state_27204__$1 = state_27204;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27204__$1,(2),inst_27199);
} else {
if((state_val_27205 === (2))){
var inst_27201 = (state_27204[(2)]);
var inst_27202 = f__$1.call(null,inst_27201);
var state_27204__$1 = state_27204;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_27204__$1,inst_27202);
} else {
return null;
}
}
});
return (function() {
var cljs$core$async$transduce_$_state_machine__26586__auto__ = null;
var cljs$core$async$transduce_$_state_machine__26586__auto____0 = (function (){
var statearr_27206 = [null,null,null,null,null,null,null];
(statearr_27206[(0)] = cljs$core$async$transduce_$_state_machine__26586__auto__);

(statearr_27206[(1)] = (1));

return statearr_27206;
});
var cljs$core$async$transduce_$_state_machine__26586__auto____1 = (function (state_27204){
while(true){
var ret_value__26587__auto__ = (function (){try{while(true){
var result__26588__auto__ = switch__26585__auto__.call(null,state_27204);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26588__auto__;
}
break;
}
}catch (e27207){if((e27207 instanceof Object)){
var ex__26589__auto__ = e27207;
var statearr_27208_27210 = state_27204;
(statearr_27208_27210[(5)] = ex__26589__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27204);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e27207;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26587__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27211 = state_27204;
state_27204 = G__27211;
continue;
} else {
return ret_value__26587__auto__;
}
break;
}
});
cljs$core$async$transduce_$_state_machine__26586__auto__ = function(state_27204){
switch(arguments.length){
case 0:
return cljs$core$async$transduce_$_state_machine__26586__auto____0.call(this);
case 1:
return cljs$core$async$transduce_$_state_machine__26586__auto____1.call(this,state_27204);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$transduce_$_state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$transduce_$_state_machine__26586__auto____0;
cljs$core$async$transduce_$_state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$transduce_$_state_machine__26586__auto____1;
return cljs$core$async$transduce_$_state_machine__26586__auto__;
})()
})();
var state__26682__auto__ = (function (){var statearr_27209 = f__26681__auto__.call(null);
(statearr_27209[(6)] = c__26680__auto__);

return statearr_27209;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26682__auto__);
}));

return c__26680__auto__;
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
var G__27213 = arguments.length;
switch (G__27213) {
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
var c__26680__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26681__auto__ = (function (){var switch__26585__auto__ = (function (state_27238){
var state_val_27239 = (state_27238[(1)]);
if((state_val_27239 === (7))){
var inst_27220 = (state_27238[(2)]);
var state_27238__$1 = state_27238;
var statearr_27240_27261 = state_27238__$1;
(statearr_27240_27261[(2)] = inst_27220);

(statearr_27240_27261[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27239 === (1))){
var inst_27214 = cljs.core.seq.call(null,coll);
var inst_27215 = inst_27214;
var state_27238__$1 = (function (){var statearr_27241 = state_27238;
(statearr_27241[(7)] = inst_27215);

return statearr_27241;
})();
var statearr_27242_27262 = state_27238__$1;
(statearr_27242_27262[(2)] = null);

(statearr_27242_27262[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27239 === (4))){
var inst_27215 = (state_27238[(7)]);
var inst_27218 = cljs.core.first.call(null,inst_27215);
var state_27238__$1 = state_27238;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_27238__$1,(7),ch,inst_27218);
} else {
if((state_val_27239 === (13))){
var inst_27232 = (state_27238[(2)]);
var state_27238__$1 = state_27238;
var statearr_27243_27263 = state_27238__$1;
(statearr_27243_27263[(2)] = inst_27232);

(statearr_27243_27263[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27239 === (6))){
var inst_27223 = (state_27238[(2)]);
var state_27238__$1 = state_27238;
if(cljs.core.truth_(inst_27223)){
var statearr_27244_27264 = state_27238__$1;
(statearr_27244_27264[(1)] = (8));

} else {
var statearr_27245_27265 = state_27238__$1;
(statearr_27245_27265[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27239 === (3))){
var inst_27236 = (state_27238[(2)]);
var state_27238__$1 = state_27238;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_27238__$1,inst_27236);
} else {
if((state_val_27239 === (12))){
var state_27238__$1 = state_27238;
var statearr_27246_27266 = state_27238__$1;
(statearr_27246_27266[(2)] = null);

(statearr_27246_27266[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27239 === (2))){
var inst_27215 = (state_27238[(7)]);
var state_27238__$1 = state_27238;
if(cljs.core.truth_(inst_27215)){
var statearr_27247_27267 = state_27238__$1;
(statearr_27247_27267[(1)] = (4));

} else {
var statearr_27248_27268 = state_27238__$1;
(statearr_27248_27268[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27239 === (11))){
var inst_27229 = cljs.core.async.close_BANG_.call(null,ch);
var state_27238__$1 = state_27238;
var statearr_27249_27269 = state_27238__$1;
(statearr_27249_27269[(2)] = inst_27229);

(statearr_27249_27269[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27239 === (9))){
var state_27238__$1 = state_27238;
if(cljs.core.truth_(close_QMARK_)){
var statearr_27250_27270 = state_27238__$1;
(statearr_27250_27270[(1)] = (11));

} else {
var statearr_27251_27271 = state_27238__$1;
(statearr_27251_27271[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27239 === (5))){
var inst_27215 = (state_27238[(7)]);
var state_27238__$1 = state_27238;
var statearr_27252_27272 = state_27238__$1;
(statearr_27252_27272[(2)] = inst_27215);

(statearr_27252_27272[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27239 === (10))){
var inst_27234 = (state_27238[(2)]);
var state_27238__$1 = state_27238;
var statearr_27253_27273 = state_27238__$1;
(statearr_27253_27273[(2)] = inst_27234);

(statearr_27253_27273[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27239 === (8))){
var inst_27215 = (state_27238[(7)]);
var inst_27225 = cljs.core.next.call(null,inst_27215);
var inst_27215__$1 = inst_27225;
var state_27238__$1 = (function (){var statearr_27254 = state_27238;
(statearr_27254[(7)] = inst_27215__$1);

return statearr_27254;
})();
var statearr_27255_27274 = state_27238__$1;
(statearr_27255_27274[(2)] = null);

(statearr_27255_27274[(1)] = (2));


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
var cljs$core$async$state_machine__26586__auto__ = null;
var cljs$core$async$state_machine__26586__auto____0 = (function (){
var statearr_27256 = [null,null,null,null,null,null,null,null];
(statearr_27256[(0)] = cljs$core$async$state_machine__26586__auto__);

(statearr_27256[(1)] = (1));

return statearr_27256;
});
var cljs$core$async$state_machine__26586__auto____1 = (function (state_27238){
while(true){
var ret_value__26587__auto__ = (function (){try{while(true){
var result__26588__auto__ = switch__26585__auto__.call(null,state_27238);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26588__auto__;
}
break;
}
}catch (e27257){if((e27257 instanceof Object)){
var ex__26589__auto__ = e27257;
var statearr_27258_27275 = state_27238;
(statearr_27258_27275[(5)] = ex__26589__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27238);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e27257;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26587__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27276 = state_27238;
state_27238 = G__27276;
continue;
} else {
return ret_value__26587__auto__;
}
break;
}
});
cljs$core$async$state_machine__26586__auto__ = function(state_27238){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__26586__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__26586__auto____1.call(this,state_27238);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__26586__auto____0;
cljs$core$async$state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__26586__auto____1;
return cljs$core$async$state_machine__26586__auto__;
})()
})();
var state__26682__auto__ = (function (){var statearr_27259 = f__26681__auto__.call(null);
(statearr_27259[(6)] = c__26680__auto__);

return statearr_27259;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26682__auto__);
}));

return c__26680__auto__;
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
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async27277 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Mult}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async27277 = (function (ch,cs,meta27278){
this.ch = ch;
this.cs = cs;
this.meta27278 = meta27278;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async27277.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_27279,meta27278__$1){
var self__ = this;
var _27279__$1 = this;
return (new cljs.core.async.t_cljs$core$async27277(self__.ch,self__.cs,meta27278__$1));
}));

(cljs.core.async.t_cljs$core$async27277.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_27279){
var self__ = this;
var _27279__$1 = this;
return self__.meta27278;
}));

(cljs.core.async.t_cljs$core$async27277.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async27277.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
}));

(cljs.core.async.t_cljs$core$async27277.prototype.cljs$core$async$Mult$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async27277.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = (function (_,ch__$1,close_QMARK_){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch__$1,close_QMARK_);

return null;
}));

(cljs.core.async.t_cljs$core$async27277.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = (function (_,ch__$1){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch__$1);

return null;
}));

(cljs.core.async.t_cljs$core$async27277.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return null;
}));

(cljs.core.async.t_cljs$core$async27277.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"meta27278","meta27278",-382885868,null)], null);
}));

(cljs.core.async.t_cljs$core$async27277.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async27277.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async27277");

(cljs.core.async.t_cljs$core$async27277.cljs$lang$ctorPrWriter = (function (this__4428__auto__,writer__4429__auto__,opt__4430__auto__){
return cljs.core._write.call(null,writer__4429__auto__,"cljs.core.async/t_cljs$core$async27277");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async27277.
 */
cljs.core.async.__GT_t_cljs$core$async27277 = (function cljs$core$async$mult_$___GT_t_cljs$core$async27277(ch__$1,cs__$1,meta27278){
return (new cljs.core.async.t_cljs$core$async27277(ch__$1,cs__$1,meta27278));
});

}

return (new cljs.core.async.t_cljs$core$async27277(ch,cs,cljs.core.PersistentArrayMap.EMPTY));
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
var c__26680__auto___27499 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26681__auto__ = (function (){var switch__26585__auto__ = (function (state_27414){
var state_val_27415 = (state_27414[(1)]);
if((state_val_27415 === (7))){
var inst_27410 = (state_27414[(2)]);
var state_27414__$1 = state_27414;
var statearr_27416_27500 = state_27414__$1;
(statearr_27416_27500[(2)] = inst_27410);

(statearr_27416_27500[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27415 === (20))){
var inst_27313 = (state_27414[(7)]);
var inst_27325 = cljs.core.first.call(null,inst_27313);
var inst_27326 = cljs.core.nth.call(null,inst_27325,(0),null);
var inst_27327 = cljs.core.nth.call(null,inst_27325,(1),null);
var state_27414__$1 = (function (){var statearr_27417 = state_27414;
(statearr_27417[(8)] = inst_27326);

return statearr_27417;
})();
if(cljs.core.truth_(inst_27327)){
var statearr_27418_27501 = state_27414__$1;
(statearr_27418_27501[(1)] = (22));

} else {
var statearr_27419_27502 = state_27414__$1;
(statearr_27419_27502[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27415 === (27))){
var inst_27282 = (state_27414[(9)]);
var inst_27355 = (state_27414[(10)]);
var inst_27362 = (state_27414[(11)]);
var inst_27357 = (state_27414[(12)]);
var inst_27362__$1 = cljs.core._nth.call(null,inst_27355,inst_27357);
var inst_27363 = cljs.core.async.put_BANG_.call(null,inst_27362__$1,inst_27282,done);
var state_27414__$1 = (function (){var statearr_27420 = state_27414;
(statearr_27420[(11)] = inst_27362__$1);

return statearr_27420;
})();
if(cljs.core.truth_(inst_27363)){
var statearr_27421_27503 = state_27414__$1;
(statearr_27421_27503[(1)] = (30));

} else {
var statearr_27422_27504 = state_27414__$1;
(statearr_27422_27504[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27415 === (1))){
var state_27414__$1 = state_27414;
var statearr_27423_27505 = state_27414__$1;
(statearr_27423_27505[(2)] = null);

(statearr_27423_27505[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27415 === (24))){
var inst_27313 = (state_27414[(7)]);
var inst_27332 = (state_27414[(2)]);
var inst_27333 = cljs.core.next.call(null,inst_27313);
var inst_27291 = inst_27333;
var inst_27292 = null;
var inst_27293 = (0);
var inst_27294 = (0);
var state_27414__$1 = (function (){var statearr_27424 = state_27414;
(statearr_27424[(13)] = inst_27291);

(statearr_27424[(14)] = inst_27292);

(statearr_27424[(15)] = inst_27293);

(statearr_27424[(16)] = inst_27332);

(statearr_27424[(17)] = inst_27294);

return statearr_27424;
})();
var statearr_27425_27506 = state_27414__$1;
(statearr_27425_27506[(2)] = null);

(statearr_27425_27506[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27415 === (39))){
var state_27414__$1 = state_27414;
var statearr_27429_27507 = state_27414__$1;
(statearr_27429_27507[(2)] = null);

(statearr_27429_27507[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27415 === (4))){
var inst_27282 = (state_27414[(9)]);
var inst_27282__$1 = (state_27414[(2)]);
var inst_27283 = (inst_27282__$1 == null);
var state_27414__$1 = (function (){var statearr_27430 = state_27414;
(statearr_27430[(9)] = inst_27282__$1);

return statearr_27430;
})();
if(cljs.core.truth_(inst_27283)){
var statearr_27431_27508 = state_27414__$1;
(statearr_27431_27508[(1)] = (5));

} else {
var statearr_27432_27509 = state_27414__$1;
(statearr_27432_27509[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27415 === (15))){
var inst_27291 = (state_27414[(13)]);
var inst_27292 = (state_27414[(14)]);
var inst_27293 = (state_27414[(15)]);
var inst_27294 = (state_27414[(17)]);
var inst_27309 = (state_27414[(2)]);
var inst_27310 = (inst_27294 + (1));
var tmp27426 = inst_27291;
var tmp27427 = inst_27292;
var tmp27428 = inst_27293;
var inst_27291__$1 = tmp27426;
var inst_27292__$1 = tmp27427;
var inst_27293__$1 = tmp27428;
var inst_27294__$1 = inst_27310;
var state_27414__$1 = (function (){var statearr_27433 = state_27414;
(statearr_27433[(13)] = inst_27291__$1);

(statearr_27433[(14)] = inst_27292__$1);

(statearr_27433[(15)] = inst_27293__$1);

(statearr_27433[(17)] = inst_27294__$1);

(statearr_27433[(18)] = inst_27309);

return statearr_27433;
})();
var statearr_27434_27510 = state_27414__$1;
(statearr_27434_27510[(2)] = null);

(statearr_27434_27510[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27415 === (21))){
var inst_27336 = (state_27414[(2)]);
var state_27414__$1 = state_27414;
var statearr_27438_27511 = state_27414__$1;
(statearr_27438_27511[(2)] = inst_27336);

(statearr_27438_27511[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27415 === (31))){
var inst_27362 = (state_27414[(11)]);
var inst_27366 = done.call(null,null);
var inst_27367 = cljs.core.async.untap_STAR_.call(null,m,inst_27362);
var state_27414__$1 = (function (){var statearr_27439 = state_27414;
(statearr_27439[(19)] = inst_27366);

return statearr_27439;
})();
var statearr_27440_27512 = state_27414__$1;
(statearr_27440_27512[(2)] = inst_27367);

(statearr_27440_27512[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27415 === (32))){
var inst_27356 = (state_27414[(20)]);
var inst_27355 = (state_27414[(10)]);
var inst_27357 = (state_27414[(12)]);
var inst_27354 = (state_27414[(21)]);
var inst_27369 = (state_27414[(2)]);
var inst_27370 = (inst_27357 + (1));
var tmp27435 = inst_27356;
var tmp27436 = inst_27355;
var tmp27437 = inst_27354;
var inst_27354__$1 = tmp27437;
var inst_27355__$1 = tmp27436;
var inst_27356__$1 = tmp27435;
var inst_27357__$1 = inst_27370;
var state_27414__$1 = (function (){var statearr_27441 = state_27414;
(statearr_27441[(20)] = inst_27356__$1);

(statearr_27441[(10)] = inst_27355__$1);

(statearr_27441[(12)] = inst_27357__$1);

(statearr_27441[(21)] = inst_27354__$1);

(statearr_27441[(22)] = inst_27369);

return statearr_27441;
})();
var statearr_27442_27513 = state_27414__$1;
(statearr_27442_27513[(2)] = null);

(statearr_27442_27513[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27415 === (40))){
var inst_27382 = (state_27414[(23)]);
var inst_27386 = done.call(null,null);
var inst_27387 = cljs.core.async.untap_STAR_.call(null,m,inst_27382);
var state_27414__$1 = (function (){var statearr_27443 = state_27414;
(statearr_27443[(24)] = inst_27386);

return statearr_27443;
})();
var statearr_27444_27514 = state_27414__$1;
(statearr_27444_27514[(2)] = inst_27387);

(statearr_27444_27514[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27415 === (33))){
var inst_27373 = (state_27414[(25)]);
var inst_27375 = cljs.core.chunked_seq_QMARK_.call(null,inst_27373);
var state_27414__$1 = state_27414;
if(inst_27375){
var statearr_27445_27515 = state_27414__$1;
(statearr_27445_27515[(1)] = (36));

} else {
var statearr_27446_27516 = state_27414__$1;
(statearr_27446_27516[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27415 === (13))){
var inst_27303 = (state_27414[(26)]);
var inst_27306 = cljs.core.async.close_BANG_.call(null,inst_27303);
var state_27414__$1 = state_27414;
var statearr_27447_27517 = state_27414__$1;
(statearr_27447_27517[(2)] = inst_27306);

(statearr_27447_27517[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27415 === (22))){
var inst_27326 = (state_27414[(8)]);
var inst_27329 = cljs.core.async.close_BANG_.call(null,inst_27326);
var state_27414__$1 = state_27414;
var statearr_27448_27518 = state_27414__$1;
(statearr_27448_27518[(2)] = inst_27329);

(statearr_27448_27518[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27415 === (36))){
var inst_27373 = (state_27414[(25)]);
var inst_27377 = cljs.core.chunk_first.call(null,inst_27373);
var inst_27378 = cljs.core.chunk_rest.call(null,inst_27373);
var inst_27379 = cljs.core.count.call(null,inst_27377);
var inst_27354 = inst_27378;
var inst_27355 = inst_27377;
var inst_27356 = inst_27379;
var inst_27357 = (0);
var state_27414__$1 = (function (){var statearr_27449 = state_27414;
(statearr_27449[(20)] = inst_27356);

(statearr_27449[(10)] = inst_27355);

(statearr_27449[(12)] = inst_27357);

(statearr_27449[(21)] = inst_27354);

return statearr_27449;
})();
var statearr_27450_27519 = state_27414__$1;
(statearr_27450_27519[(2)] = null);

(statearr_27450_27519[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27415 === (41))){
var inst_27373 = (state_27414[(25)]);
var inst_27389 = (state_27414[(2)]);
var inst_27390 = cljs.core.next.call(null,inst_27373);
var inst_27354 = inst_27390;
var inst_27355 = null;
var inst_27356 = (0);
var inst_27357 = (0);
var state_27414__$1 = (function (){var statearr_27451 = state_27414;
(statearr_27451[(20)] = inst_27356);

(statearr_27451[(10)] = inst_27355);

(statearr_27451[(27)] = inst_27389);

(statearr_27451[(12)] = inst_27357);

(statearr_27451[(21)] = inst_27354);

return statearr_27451;
})();
var statearr_27452_27520 = state_27414__$1;
(statearr_27452_27520[(2)] = null);

(statearr_27452_27520[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27415 === (43))){
var state_27414__$1 = state_27414;
var statearr_27453_27521 = state_27414__$1;
(statearr_27453_27521[(2)] = null);

(statearr_27453_27521[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27415 === (29))){
var inst_27398 = (state_27414[(2)]);
var state_27414__$1 = state_27414;
var statearr_27454_27522 = state_27414__$1;
(statearr_27454_27522[(2)] = inst_27398);

(statearr_27454_27522[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27415 === (44))){
var inst_27407 = (state_27414[(2)]);
var state_27414__$1 = (function (){var statearr_27455 = state_27414;
(statearr_27455[(28)] = inst_27407);

return statearr_27455;
})();
var statearr_27456_27523 = state_27414__$1;
(statearr_27456_27523[(2)] = null);

(statearr_27456_27523[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27415 === (6))){
var inst_27346 = (state_27414[(29)]);
var inst_27345 = cljs.core.deref.call(null,cs);
var inst_27346__$1 = cljs.core.keys.call(null,inst_27345);
var inst_27347 = cljs.core.count.call(null,inst_27346__$1);
var inst_27348 = cljs.core.reset_BANG_.call(null,dctr,inst_27347);
var inst_27353 = cljs.core.seq.call(null,inst_27346__$1);
var inst_27354 = inst_27353;
var inst_27355 = null;
var inst_27356 = (0);
var inst_27357 = (0);
var state_27414__$1 = (function (){var statearr_27457 = state_27414;
(statearr_27457[(20)] = inst_27356);

(statearr_27457[(29)] = inst_27346__$1);

(statearr_27457[(10)] = inst_27355);

(statearr_27457[(30)] = inst_27348);

(statearr_27457[(12)] = inst_27357);

(statearr_27457[(21)] = inst_27354);

return statearr_27457;
})();
var statearr_27458_27524 = state_27414__$1;
(statearr_27458_27524[(2)] = null);

(statearr_27458_27524[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27415 === (28))){
var inst_27373 = (state_27414[(25)]);
var inst_27354 = (state_27414[(21)]);
var inst_27373__$1 = cljs.core.seq.call(null,inst_27354);
var state_27414__$1 = (function (){var statearr_27459 = state_27414;
(statearr_27459[(25)] = inst_27373__$1);

return statearr_27459;
})();
if(inst_27373__$1){
var statearr_27460_27525 = state_27414__$1;
(statearr_27460_27525[(1)] = (33));

} else {
var statearr_27461_27526 = state_27414__$1;
(statearr_27461_27526[(1)] = (34));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27415 === (25))){
var inst_27356 = (state_27414[(20)]);
var inst_27357 = (state_27414[(12)]);
var inst_27359 = (inst_27357 < inst_27356);
var inst_27360 = inst_27359;
var state_27414__$1 = state_27414;
if(cljs.core.truth_(inst_27360)){
var statearr_27462_27527 = state_27414__$1;
(statearr_27462_27527[(1)] = (27));

} else {
var statearr_27463_27528 = state_27414__$1;
(statearr_27463_27528[(1)] = (28));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27415 === (34))){
var state_27414__$1 = state_27414;
var statearr_27464_27529 = state_27414__$1;
(statearr_27464_27529[(2)] = null);

(statearr_27464_27529[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27415 === (17))){
var state_27414__$1 = state_27414;
var statearr_27465_27530 = state_27414__$1;
(statearr_27465_27530[(2)] = null);

(statearr_27465_27530[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27415 === (3))){
var inst_27412 = (state_27414[(2)]);
var state_27414__$1 = state_27414;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_27414__$1,inst_27412);
} else {
if((state_val_27415 === (12))){
var inst_27341 = (state_27414[(2)]);
var state_27414__$1 = state_27414;
var statearr_27466_27531 = state_27414__$1;
(statearr_27466_27531[(2)] = inst_27341);

(statearr_27466_27531[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27415 === (2))){
var state_27414__$1 = state_27414;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27414__$1,(4),ch);
} else {
if((state_val_27415 === (23))){
var state_27414__$1 = state_27414;
var statearr_27467_27532 = state_27414__$1;
(statearr_27467_27532[(2)] = null);

(statearr_27467_27532[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27415 === (35))){
var inst_27396 = (state_27414[(2)]);
var state_27414__$1 = state_27414;
var statearr_27468_27533 = state_27414__$1;
(statearr_27468_27533[(2)] = inst_27396);

(statearr_27468_27533[(1)] = (29));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27415 === (19))){
var inst_27313 = (state_27414[(7)]);
var inst_27317 = cljs.core.chunk_first.call(null,inst_27313);
var inst_27318 = cljs.core.chunk_rest.call(null,inst_27313);
var inst_27319 = cljs.core.count.call(null,inst_27317);
var inst_27291 = inst_27318;
var inst_27292 = inst_27317;
var inst_27293 = inst_27319;
var inst_27294 = (0);
var state_27414__$1 = (function (){var statearr_27469 = state_27414;
(statearr_27469[(13)] = inst_27291);

(statearr_27469[(14)] = inst_27292);

(statearr_27469[(15)] = inst_27293);

(statearr_27469[(17)] = inst_27294);

return statearr_27469;
})();
var statearr_27470_27534 = state_27414__$1;
(statearr_27470_27534[(2)] = null);

(statearr_27470_27534[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27415 === (11))){
var inst_27291 = (state_27414[(13)]);
var inst_27313 = (state_27414[(7)]);
var inst_27313__$1 = cljs.core.seq.call(null,inst_27291);
var state_27414__$1 = (function (){var statearr_27471 = state_27414;
(statearr_27471[(7)] = inst_27313__$1);

return statearr_27471;
})();
if(inst_27313__$1){
var statearr_27472_27535 = state_27414__$1;
(statearr_27472_27535[(1)] = (16));

} else {
var statearr_27473_27536 = state_27414__$1;
(statearr_27473_27536[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27415 === (9))){
var inst_27343 = (state_27414[(2)]);
var state_27414__$1 = state_27414;
var statearr_27474_27537 = state_27414__$1;
(statearr_27474_27537[(2)] = inst_27343);

(statearr_27474_27537[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27415 === (5))){
var inst_27289 = cljs.core.deref.call(null,cs);
var inst_27290 = cljs.core.seq.call(null,inst_27289);
var inst_27291 = inst_27290;
var inst_27292 = null;
var inst_27293 = (0);
var inst_27294 = (0);
var state_27414__$1 = (function (){var statearr_27475 = state_27414;
(statearr_27475[(13)] = inst_27291);

(statearr_27475[(14)] = inst_27292);

(statearr_27475[(15)] = inst_27293);

(statearr_27475[(17)] = inst_27294);

return statearr_27475;
})();
var statearr_27476_27538 = state_27414__$1;
(statearr_27476_27538[(2)] = null);

(statearr_27476_27538[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27415 === (14))){
var state_27414__$1 = state_27414;
var statearr_27477_27539 = state_27414__$1;
(statearr_27477_27539[(2)] = null);

(statearr_27477_27539[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27415 === (45))){
var inst_27404 = (state_27414[(2)]);
var state_27414__$1 = state_27414;
var statearr_27478_27540 = state_27414__$1;
(statearr_27478_27540[(2)] = inst_27404);

(statearr_27478_27540[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27415 === (26))){
var inst_27346 = (state_27414[(29)]);
var inst_27400 = (state_27414[(2)]);
var inst_27401 = cljs.core.seq.call(null,inst_27346);
var state_27414__$1 = (function (){var statearr_27479 = state_27414;
(statearr_27479[(31)] = inst_27400);

return statearr_27479;
})();
if(inst_27401){
var statearr_27480_27541 = state_27414__$1;
(statearr_27480_27541[(1)] = (42));

} else {
var statearr_27481_27542 = state_27414__$1;
(statearr_27481_27542[(1)] = (43));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27415 === (16))){
var inst_27313 = (state_27414[(7)]);
var inst_27315 = cljs.core.chunked_seq_QMARK_.call(null,inst_27313);
var state_27414__$1 = state_27414;
if(inst_27315){
var statearr_27482_27543 = state_27414__$1;
(statearr_27482_27543[(1)] = (19));

} else {
var statearr_27483_27544 = state_27414__$1;
(statearr_27483_27544[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27415 === (38))){
var inst_27393 = (state_27414[(2)]);
var state_27414__$1 = state_27414;
var statearr_27484_27545 = state_27414__$1;
(statearr_27484_27545[(2)] = inst_27393);

(statearr_27484_27545[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27415 === (30))){
var state_27414__$1 = state_27414;
var statearr_27485_27546 = state_27414__$1;
(statearr_27485_27546[(2)] = null);

(statearr_27485_27546[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27415 === (10))){
var inst_27292 = (state_27414[(14)]);
var inst_27294 = (state_27414[(17)]);
var inst_27302 = cljs.core._nth.call(null,inst_27292,inst_27294);
var inst_27303 = cljs.core.nth.call(null,inst_27302,(0),null);
var inst_27304 = cljs.core.nth.call(null,inst_27302,(1),null);
var state_27414__$1 = (function (){var statearr_27486 = state_27414;
(statearr_27486[(26)] = inst_27303);

return statearr_27486;
})();
if(cljs.core.truth_(inst_27304)){
var statearr_27487_27547 = state_27414__$1;
(statearr_27487_27547[(1)] = (13));

} else {
var statearr_27488_27548 = state_27414__$1;
(statearr_27488_27548[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27415 === (18))){
var inst_27339 = (state_27414[(2)]);
var state_27414__$1 = state_27414;
var statearr_27489_27549 = state_27414__$1;
(statearr_27489_27549[(2)] = inst_27339);

(statearr_27489_27549[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27415 === (42))){
var state_27414__$1 = state_27414;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27414__$1,(45),dchan);
} else {
if((state_val_27415 === (37))){
var inst_27373 = (state_27414[(25)]);
var inst_27282 = (state_27414[(9)]);
var inst_27382 = (state_27414[(23)]);
var inst_27382__$1 = cljs.core.first.call(null,inst_27373);
var inst_27383 = cljs.core.async.put_BANG_.call(null,inst_27382__$1,inst_27282,done);
var state_27414__$1 = (function (){var statearr_27490 = state_27414;
(statearr_27490[(23)] = inst_27382__$1);

return statearr_27490;
})();
if(cljs.core.truth_(inst_27383)){
var statearr_27491_27550 = state_27414__$1;
(statearr_27491_27550[(1)] = (39));

} else {
var statearr_27492_27551 = state_27414__$1;
(statearr_27492_27551[(1)] = (40));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27415 === (8))){
var inst_27293 = (state_27414[(15)]);
var inst_27294 = (state_27414[(17)]);
var inst_27296 = (inst_27294 < inst_27293);
var inst_27297 = inst_27296;
var state_27414__$1 = state_27414;
if(cljs.core.truth_(inst_27297)){
var statearr_27493_27552 = state_27414__$1;
(statearr_27493_27552[(1)] = (10));

} else {
var statearr_27494_27553 = state_27414__$1;
(statearr_27494_27553[(1)] = (11));

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
var cljs$core$async$mult_$_state_machine__26586__auto__ = null;
var cljs$core$async$mult_$_state_machine__26586__auto____0 = (function (){
var statearr_27495 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_27495[(0)] = cljs$core$async$mult_$_state_machine__26586__auto__);

(statearr_27495[(1)] = (1));

return statearr_27495;
});
var cljs$core$async$mult_$_state_machine__26586__auto____1 = (function (state_27414){
while(true){
var ret_value__26587__auto__ = (function (){try{while(true){
var result__26588__auto__ = switch__26585__auto__.call(null,state_27414);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26588__auto__;
}
break;
}
}catch (e27496){if((e27496 instanceof Object)){
var ex__26589__auto__ = e27496;
var statearr_27497_27554 = state_27414;
(statearr_27497_27554[(5)] = ex__26589__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27414);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e27496;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26587__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27555 = state_27414;
state_27414 = G__27555;
continue;
} else {
return ret_value__26587__auto__;
}
break;
}
});
cljs$core$async$mult_$_state_machine__26586__auto__ = function(state_27414){
switch(arguments.length){
case 0:
return cljs$core$async$mult_$_state_machine__26586__auto____0.call(this);
case 1:
return cljs$core$async$mult_$_state_machine__26586__auto____1.call(this,state_27414);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mult_$_state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mult_$_state_machine__26586__auto____0;
cljs$core$async$mult_$_state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mult_$_state_machine__26586__auto____1;
return cljs$core$async$mult_$_state_machine__26586__auto__;
})()
})();
var state__26682__auto__ = (function (){var statearr_27498 = f__26681__auto__.call(null);
(statearr_27498[(6)] = c__26680__auto___27499);

return statearr_27498;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26682__auto__);
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
var G__27557 = arguments.length;
switch (G__27557) {
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
var len__4789__auto___27569 = arguments.length;
var i__4790__auto___27570 = (0);
while(true){
if((i__4790__auto___27570 < len__4789__auto___27569)){
args__4795__auto__.push((arguments[i__4790__auto___27570]));

var G__27571 = (i__4790__auto___27570 + (1));
i__4790__auto___27570 = G__27571;
continue;
} else {
}
break;
}

var argseq__4796__auto__ = ((((3) < args__4795__auto__.length))?(new cljs.core.IndexedSeq(args__4795__auto__.slice((3)),(0),null)):null);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__4796__auto__);
});

(cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (state,cont_block,ports,p__27563){
var map__27564 = p__27563;
var map__27564__$1 = (((((!((map__27564 == null))))?(((((map__27564.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__27564.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__27564):map__27564);
var opts = map__27564__$1;
var statearr_27566_27572 = state;
(statearr_27566_27572[(1)] = cont_block);


var temp__5735__auto__ = cljs.core.async.do_alts.call(null,(function (val){
var statearr_27567_27573 = state;
(statearr_27567_27573[(2)] = val);


return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state);
}),ports,opts);
if(cljs.core.truth_(temp__5735__auto__)){
var cb = temp__5735__auto__;
var statearr_27568_27574 = state;
(statearr_27568_27574[(2)] = cljs.core.deref.call(null,cb));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}));

(cljs.core.async.ioc_alts_BANG_.cljs$lang$maxFixedArity = (3));

/** @this {Function} */
(cljs.core.async.ioc_alts_BANG_.cljs$lang$applyTo = (function (seq27559){
var G__27560 = cljs.core.first.call(null,seq27559);
var seq27559__$1 = cljs.core.next.call(null,seq27559);
var G__27561 = cljs.core.first.call(null,seq27559__$1);
var seq27559__$2 = cljs.core.next.call(null,seq27559__$1);
var G__27562 = cljs.core.first.call(null,seq27559__$2);
var seq27559__$3 = cljs.core.next.call(null,seq27559__$2);
var self__4776__auto__ = this;
return self__4776__auto__.cljs$core$IFn$_invoke$arity$variadic(G__27560,G__27561,G__27562,seq27559__$3);
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
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async27575 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mix}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async27575 = (function (change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta27576){
this.change = change;
this.solo_mode = solo_mode;
this.pick = pick;
this.cs = cs;
this.calc_state = calc_state;
this.out = out;
this.changed = changed;
this.solo_modes = solo_modes;
this.attrs = attrs;
this.meta27576 = meta27576;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async27575.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_27577,meta27576__$1){
var self__ = this;
var _27577__$1 = this;
return (new cljs.core.async.t_cljs$core$async27575(self__.change,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta27576__$1));
}));

(cljs.core.async.t_cljs$core$async27575.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_27577){
var self__ = this;
var _27577__$1 = this;
return self__.meta27576;
}));

(cljs.core.async.t_cljs$core$async27575.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async27575.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.out;
}));

(cljs.core.async.t_cljs$core$async27575.prototype.cljs$core$async$Mix$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async27575.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);

return self__.changed.call(null);
}));

(cljs.core.async.t_cljs$core$async27575.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch);

return self__.changed.call(null);
}));

(cljs.core.async.t_cljs$core$async27575.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return self__.changed.call(null);
}));

(cljs.core.async.t_cljs$core$async27575.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = (function (_,state_map){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.partial.call(null,cljs.core.merge_with,cljs.core.merge),state_map);

return self__.changed.call(null);
}));

(cljs.core.async.t_cljs$core$async27575.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = (function (_,mode){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.solo_modes.call(null,mode))){
} else {
throw (new Error(["Assert failed: ",["mode must be one of: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.solo_modes)].join(''),"\n","(solo-modes mode)"].join('')));
}

cljs.core.reset_BANG_.call(null,self__.solo_mode,mode);

return self__.changed.call(null);
}));

(cljs.core.async.t_cljs$core$async27575.getBasis = (function (){
return new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"change","change",477485025,null),new cljs.core.Symbol(null,"solo-mode","solo-mode",2031788074,null),new cljs.core.Symbol(null,"pick","pick",1300068175,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"calc-state","calc-state",-349968968,null),new cljs.core.Symbol(null,"out","out",729986010,null),new cljs.core.Symbol(null,"changed","changed",-2083710852,null),new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"attrs","attrs",-450137186,null),new cljs.core.Symbol(null,"meta27576","meta27576",459876742,null)], null);
}));

(cljs.core.async.t_cljs$core$async27575.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async27575.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async27575");

(cljs.core.async.t_cljs$core$async27575.cljs$lang$ctorPrWriter = (function (this__4428__auto__,writer__4429__auto__,opt__4430__auto__){
return cljs.core._write.call(null,writer__4429__auto__,"cljs.core.async/t_cljs$core$async27575");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async27575.
 */
cljs.core.async.__GT_t_cljs$core$async27575 = (function cljs$core$async$mix_$___GT_t_cljs$core$async27575(change__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta27576){
return (new cljs.core.async.t_cljs$core$async27575(change__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta27576));
});

}

return (new cljs.core.async.t_cljs$core$async27575(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__26680__auto___27739 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26681__auto__ = (function (){var switch__26585__auto__ = (function (state_27679){
var state_val_27680 = (state_27679[(1)]);
if((state_val_27680 === (7))){
var inst_27594 = (state_27679[(2)]);
var state_27679__$1 = state_27679;
var statearr_27681_27740 = state_27679__$1;
(statearr_27681_27740[(2)] = inst_27594);

(statearr_27681_27740[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27680 === (20))){
var inst_27606 = (state_27679[(7)]);
var state_27679__$1 = state_27679;
var statearr_27682_27741 = state_27679__$1;
(statearr_27682_27741[(2)] = inst_27606);

(statearr_27682_27741[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27680 === (27))){
var state_27679__$1 = state_27679;
var statearr_27683_27742 = state_27679__$1;
(statearr_27683_27742[(2)] = null);

(statearr_27683_27742[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27680 === (1))){
var inst_27581 = (state_27679[(8)]);
var inst_27581__$1 = calc_state.call(null);
var inst_27583 = (inst_27581__$1 == null);
var inst_27584 = cljs.core.not.call(null,inst_27583);
var state_27679__$1 = (function (){var statearr_27684 = state_27679;
(statearr_27684[(8)] = inst_27581__$1);

return statearr_27684;
})();
if(inst_27584){
var statearr_27685_27743 = state_27679__$1;
(statearr_27685_27743[(1)] = (2));

} else {
var statearr_27686_27744 = state_27679__$1;
(statearr_27686_27744[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27680 === (24))){
var inst_27639 = (state_27679[(9)]);
var inst_27653 = (state_27679[(10)]);
var inst_27630 = (state_27679[(11)]);
var inst_27653__$1 = inst_27630.call(null,inst_27639);
var state_27679__$1 = (function (){var statearr_27687 = state_27679;
(statearr_27687[(10)] = inst_27653__$1);

return statearr_27687;
})();
if(cljs.core.truth_(inst_27653__$1)){
var statearr_27688_27745 = state_27679__$1;
(statearr_27688_27745[(1)] = (29));

} else {
var statearr_27689_27746 = state_27679__$1;
(statearr_27689_27746[(1)] = (30));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27680 === (4))){
var inst_27597 = (state_27679[(2)]);
var state_27679__$1 = state_27679;
if(cljs.core.truth_(inst_27597)){
var statearr_27690_27747 = state_27679__$1;
(statearr_27690_27747[(1)] = (8));

} else {
var statearr_27691_27748 = state_27679__$1;
(statearr_27691_27748[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27680 === (15))){
var inst_27624 = (state_27679[(2)]);
var state_27679__$1 = state_27679;
if(cljs.core.truth_(inst_27624)){
var statearr_27692_27749 = state_27679__$1;
(statearr_27692_27749[(1)] = (19));

} else {
var statearr_27693_27750 = state_27679__$1;
(statearr_27693_27750[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27680 === (21))){
var inst_27629 = (state_27679[(12)]);
var inst_27629__$1 = (state_27679[(2)]);
var inst_27630 = cljs.core.get.call(null,inst_27629__$1,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_27631 = cljs.core.get.call(null,inst_27629__$1,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_27632 = cljs.core.get.call(null,inst_27629__$1,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var state_27679__$1 = (function (){var statearr_27694 = state_27679;
(statearr_27694[(13)] = inst_27631);

(statearr_27694[(11)] = inst_27630);

(statearr_27694[(12)] = inst_27629__$1);

return statearr_27694;
})();
return cljs.core.async.ioc_alts_BANG_.call(null,state_27679__$1,(22),inst_27632);
} else {
if((state_val_27680 === (31))){
var inst_27661 = (state_27679[(2)]);
var state_27679__$1 = state_27679;
if(cljs.core.truth_(inst_27661)){
var statearr_27695_27751 = state_27679__$1;
(statearr_27695_27751[(1)] = (32));

} else {
var statearr_27696_27752 = state_27679__$1;
(statearr_27696_27752[(1)] = (33));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27680 === (32))){
var inst_27638 = (state_27679[(14)]);
var state_27679__$1 = state_27679;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_27679__$1,(35),out,inst_27638);
} else {
if((state_val_27680 === (33))){
var inst_27629 = (state_27679[(12)]);
var inst_27606 = inst_27629;
var state_27679__$1 = (function (){var statearr_27697 = state_27679;
(statearr_27697[(7)] = inst_27606);

return statearr_27697;
})();
var statearr_27698_27753 = state_27679__$1;
(statearr_27698_27753[(2)] = null);

(statearr_27698_27753[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27680 === (13))){
var inst_27606 = (state_27679[(7)]);
var inst_27613 = inst_27606.cljs$lang$protocol_mask$partition0$;
var inst_27614 = (inst_27613 & (64));
var inst_27615 = inst_27606.cljs$core$ISeq$;
var inst_27616 = (cljs.core.PROTOCOL_SENTINEL === inst_27615);
var inst_27617 = ((inst_27614) || (inst_27616));
var state_27679__$1 = state_27679;
if(cljs.core.truth_(inst_27617)){
var statearr_27699_27754 = state_27679__$1;
(statearr_27699_27754[(1)] = (16));

} else {
var statearr_27700_27755 = state_27679__$1;
(statearr_27700_27755[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27680 === (22))){
var inst_27639 = (state_27679[(9)]);
var inst_27638 = (state_27679[(14)]);
var inst_27637 = (state_27679[(2)]);
var inst_27638__$1 = cljs.core.nth.call(null,inst_27637,(0),null);
var inst_27639__$1 = cljs.core.nth.call(null,inst_27637,(1),null);
var inst_27640 = (inst_27638__$1 == null);
var inst_27641 = cljs.core._EQ_.call(null,inst_27639__$1,change);
var inst_27642 = ((inst_27640) || (inst_27641));
var state_27679__$1 = (function (){var statearr_27701 = state_27679;
(statearr_27701[(9)] = inst_27639__$1);

(statearr_27701[(14)] = inst_27638__$1);

return statearr_27701;
})();
if(cljs.core.truth_(inst_27642)){
var statearr_27702_27756 = state_27679__$1;
(statearr_27702_27756[(1)] = (23));

} else {
var statearr_27703_27757 = state_27679__$1;
(statearr_27703_27757[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27680 === (36))){
var inst_27629 = (state_27679[(12)]);
var inst_27606 = inst_27629;
var state_27679__$1 = (function (){var statearr_27704 = state_27679;
(statearr_27704[(7)] = inst_27606);

return statearr_27704;
})();
var statearr_27705_27758 = state_27679__$1;
(statearr_27705_27758[(2)] = null);

(statearr_27705_27758[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27680 === (29))){
var inst_27653 = (state_27679[(10)]);
var state_27679__$1 = state_27679;
var statearr_27706_27759 = state_27679__$1;
(statearr_27706_27759[(2)] = inst_27653);

(statearr_27706_27759[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27680 === (6))){
var state_27679__$1 = state_27679;
var statearr_27707_27760 = state_27679__$1;
(statearr_27707_27760[(2)] = false);

(statearr_27707_27760[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27680 === (28))){
var inst_27649 = (state_27679[(2)]);
var inst_27650 = calc_state.call(null);
var inst_27606 = inst_27650;
var state_27679__$1 = (function (){var statearr_27708 = state_27679;
(statearr_27708[(7)] = inst_27606);

(statearr_27708[(15)] = inst_27649);

return statearr_27708;
})();
var statearr_27709_27761 = state_27679__$1;
(statearr_27709_27761[(2)] = null);

(statearr_27709_27761[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27680 === (25))){
var inst_27675 = (state_27679[(2)]);
var state_27679__$1 = state_27679;
var statearr_27710_27762 = state_27679__$1;
(statearr_27710_27762[(2)] = inst_27675);

(statearr_27710_27762[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27680 === (34))){
var inst_27673 = (state_27679[(2)]);
var state_27679__$1 = state_27679;
var statearr_27711_27763 = state_27679__$1;
(statearr_27711_27763[(2)] = inst_27673);

(statearr_27711_27763[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27680 === (17))){
var state_27679__$1 = state_27679;
var statearr_27712_27764 = state_27679__$1;
(statearr_27712_27764[(2)] = false);

(statearr_27712_27764[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27680 === (3))){
var state_27679__$1 = state_27679;
var statearr_27713_27765 = state_27679__$1;
(statearr_27713_27765[(2)] = false);

(statearr_27713_27765[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27680 === (12))){
var inst_27677 = (state_27679[(2)]);
var state_27679__$1 = state_27679;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_27679__$1,inst_27677);
} else {
if((state_val_27680 === (2))){
var inst_27581 = (state_27679[(8)]);
var inst_27586 = inst_27581.cljs$lang$protocol_mask$partition0$;
var inst_27587 = (inst_27586 & (64));
var inst_27588 = inst_27581.cljs$core$ISeq$;
var inst_27589 = (cljs.core.PROTOCOL_SENTINEL === inst_27588);
var inst_27590 = ((inst_27587) || (inst_27589));
var state_27679__$1 = state_27679;
if(cljs.core.truth_(inst_27590)){
var statearr_27714_27766 = state_27679__$1;
(statearr_27714_27766[(1)] = (5));

} else {
var statearr_27715_27767 = state_27679__$1;
(statearr_27715_27767[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27680 === (23))){
var inst_27638 = (state_27679[(14)]);
var inst_27644 = (inst_27638 == null);
var state_27679__$1 = state_27679;
if(cljs.core.truth_(inst_27644)){
var statearr_27716_27768 = state_27679__$1;
(statearr_27716_27768[(1)] = (26));

} else {
var statearr_27717_27769 = state_27679__$1;
(statearr_27717_27769[(1)] = (27));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27680 === (35))){
var inst_27664 = (state_27679[(2)]);
var state_27679__$1 = state_27679;
if(cljs.core.truth_(inst_27664)){
var statearr_27718_27770 = state_27679__$1;
(statearr_27718_27770[(1)] = (36));

} else {
var statearr_27719_27771 = state_27679__$1;
(statearr_27719_27771[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27680 === (19))){
var inst_27606 = (state_27679[(7)]);
var inst_27626 = cljs.core.apply.call(null,cljs.core.hash_map,inst_27606);
var state_27679__$1 = state_27679;
var statearr_27720_27772 = state_27679__$1;
(statearr_27720_27772[(2)] = inst_27626);

(statearr_27720_27772[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27680 === (11))){
var inst_27606 = (state_27679[(7)]);
var inst_27610 = (inst_27606 == null);
var inst_27611 = cljs.core.not.call(null,inst_27610);
var state_27679__$1 = state_27679;
if(inst_27611){
var statearr_27721_27773 = state_27679__$1;
(statearr_27721_27773[(1)] = (13));

} else {
var statearr_27722_27774 = state_27679__$1;
(statearr_27722_27774[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27680 === (9))){
var inst_27581 = (state_27679[(8)]);
var state_27679__$1 = state_27679;
var statearr_27723_27775 = state_27679__$1;
(statearr_27723_27775[(2)] = inst_27581);

(statearr_27723_27775[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27680 === (5))){
var state_27679__$1 = state_27679;
var statearr_27724_27776 = state_27679__$1;
(statearr_27724_27776[(2)] = true);

(statearr_27724_27776[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27680 === (14))){
var state_27679__$1 = state_27679;
var statearr_27725_27777 = state_27679__$1;
(statearr_27725_27777[(2)] = false);

(statearr_27725_27777[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27680 === (26))){
var inst_27639 = (state_27679[(9)]);
var inst_27646 = cljs.core.swap_BANG_.call(null,cs,cljs.core.dissoc,inst_27639);
var state_27679__$1 = state_27679;
var statearr_27726_27778 = state_27679__$1;
(statearr_27726_27778[(2)] = inst_27646);

(statearr_27726_27778[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27680 === (16))){
var state_27679__$1 = state_27679;
var statearr_27727_27779 = state_27679__$1;
(statearr_27727_27779[(2)] = true);

(statearr_27727_27779[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27680 === (38))){
var inst_27669 = (state_27679[(2)]);
var state_27679__$1 = state_27679;
var statearr_27728_27780 = state_27679__$1;
(statearr_27728_27780[(2)] = inst_27669);

(statearr_27728_27780[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27680 === (30))){
var inst_27639 = (state_27679[(9)]);
var inst_27631 = (state_27679[(13)]);
var inst_27630 = (state_27679[(11)]);
var inst_27656 = cljs.core.empty_QMARK_.call(null,inst_27630);
var inst_27657 = inst_27631.call(null,inst_27639);
var inst_27658 = cljs.core.not.call(null,inst_27657);
var inst_27659 = ((inst_27656) && (inst_27658));
var state_27679__$1 = state_27679;
var statearr_27729_27781 = state_27679__$1;
(statearr_27729_27781[(2)] = inst_27659);

(statearr_27729_27781[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27680 === (10))){
var inst_27581 = (state_27679[(8)]);
var inst_27602 = (state_27679[(2)]);
var inst_27603 = cljs.core.get.call(null,inst_27602,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_27604 = cljs.core.get.call(null,inst_27602,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_27605 = cljs.core.get.call(null,inst_27602,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var inst_27606 = inst_27581;
var state_27679__$1 = (function (){var statearr_27730 = state_27679;
(statearr_27730[(16)] = inst_27603);

(statearr_27730[(17)] = inst_27605);

(statearr_27730[(18)] = inst_27604);

(statearr_27730[(7)] = inst_27606);

return statearr_27730;
})();
var statearr_27731_27782 = state_27679__$1;
(statearr_27731_27782[(2)] = null);

(statearr_27731_27782[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27680 === (18))){
var inst_27621 = (state_27679[(2)]);
var state_27679__$1 = state_27679;
var statearr_27732_27783 = state_27679__$1;
(statearr_27732_27783[(2)] = inst_27621);

(statearr_27732_27783[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27680 === (37))){
var state_27679__$1 = state_27679;
var statearr_27733_27784 = state_27679__$1;
(statearr_27733_27784[(2)] = null);

(statearr_27733_27784[(1)] = (38));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27680 === (8))){
var inst_27581 = (state_27679[(8)]);
var inst_27599 = cljs.core.apply.call(null,cljs.core.hash_map,inst_27581);
var state_27679__$1 = state_27679;
var statearr_27734_27785 = state_27679__$1;
(statearr_27734_27785[(2)] = inst_27599);

(statearr_27734_27785[(1)] = (10));


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
var cljs$core$async$mix_$_state_machine__26586__auto__ = null;
var cljs$core$async$mix_$_state_machine__26586__auto____0 = (function (){
var statearr_27735 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_27735[(0)] = cljs$core$async$mix_$_state_machine__26586__auto__);

(statearr_27735[(1)] = (1));

return statearr_27735;
});
var cljs$core$async$mix_$_state_machine__26586__auto____1 = (function (state_27679){
while(true){
var ret_value__26587__auto__ = (function (){try{while(true){
var result__26588__auto__ = switch__26585__auto__.call(null,state_27679);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26588__auto__;
}
break;
}
}catch (e27736){if((e27736 instanceof Object)){
var ex__26589__auto__ = e27736;
var statearr_27737_27786 = state_27679;
(statearr_27737_27786[(5)] = ex__26589__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27679);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e27736;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26587__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27787 = state_27679;
state_27679 = G__27787;
continue;
} else {
return ret_value__26587__auto__;
}
break;
}
});
cljs$core$async$mix_$_state_machine__26586__auto__ = function(state_27679){
switch(arguments.length){
case 0:
return cljs$core$async$mix_$_state_machine__26586__auto____0.call(this);
case 1:
return cljs$core$async$mix_$_state_machine__26586__auto____1.call(this,state_27679);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mix_$_state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mix_$_state_machine__26586__auto____0;
cljs$core$async$mix_$_state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mix_$_state_machine__26586__auto____1;
return cljs$core$async$mix_$_state_machine__26586__auto__;
})()
})();
var state__26682__auto__ = (function (){var statearr_27738 = f__26681__auto__.call(null);
(statearr_27738[(6)] = c__26680__auto___27739);

return statearr_27738;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26682__auto__);
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
var G__27789 = arguments.length;
switch (G__27789) {
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
var G__27793 = arguments.length;
switch (G__27793) {
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
return cljs.core.get.call(null,cljs.core.swap_BANG_.call(null,mults,(function (p1__27791_SHARP_){
if(cljs.core.truth_(p1__27791_SHARP_.call(null,topic))){
return p1__27791_SHARP_;
} else {
return cljs.core.assoc.call(null,p1__27791_SHARP_,topic,cljs.core.async.mult.call(null,cljs.core.async.chan.call(null,buf_fn.call(null,topic))));
}
})),topic);
}
});
var p = (function (){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async27794 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Pub}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async27794 = (function (ch,topic_fn,buf_fn,mults,ensure_mult,meta27795){
this.ch = ch;
this.topic_fn = topic_fn;
this.buf_fn = buf_fn;
this.mults = mults;
this.ensure_mult = ensure_mult;
this.meta27795 = meta27795;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async27794.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_27796,meta27795__$1){
var self__ = this;
var _27796__$1 = this;
return (new cljs.core.async.t_cljs$core$async27794(self__.ch,self__.topic_fn,self__.buf_fn,self__.mults,self__.ensure_mult,meta27795__$1));
}));

(cljs.core.async.t_cljs$core$async27794.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_27796){
var self__ = this;
var _27796__$1 = this;
return self__.meta27795;
}));

(cljs.core.async.t_cljs$core$async27794.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async27794.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
}));

(cljs.core.async.t_cljs$core$async27794.prototype.cljs$core$async$Pub$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async27794.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = (function (p,topic,ch__$1,close_QMARK_){
var self__ = this;
var p__$1 = this;
var m = self__.ensure_mult.call(null,topic);
return cljs.core.async.tap.call(null,m,ch__$1,close_QMARK_);
}));

(cljs.core.async.t_cljs$core$async27794.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = (function (p,topic,ch__$1){
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

(cljs.core.async.t_cljs$core$async27794.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.reset_BANG_.call(null,self__.mults,cljs.core.PersistentArrayMap.EMPTY);
}));

(cljs.core.async.t_cljs$core$async27794.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = (function (_,topic){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.call(null,self__.mults,cljs.core.dissoc,topic);
}));

(cljs.core.async.t_cljs$core$async27794.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"topic-fn","topic-fn",-862449736,null),new cljs.core.Symbol(null,"buf-fn","buf-fn",-1200281591,null),new cljs.core.Symbol(null,"mults","mults",-461114485,null),new cljs.core.Symbol(null,"ensure-mult","ensure-mult",1796584816,null),new cljs.core.Symbol(null,"meta27795","meta27795",-1632178026,null)], null);
}));

(cljs.core.async.t_cljs$core$async27794.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async27794.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async27794");

(cljs.core.async.t_cljs$core$async27794.cljs$lang$ctorPrWriter = (function (this__4428__auto__,writer__4429__auto__,opt__4430__auto__){
return cljs.core._write.call(null,writer__4429__auto__,"cljs.core.async/t_cljs$core$async27794");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async27794.
 */
cljs.core.async.__GT_t_cljs$core$async27794 = (function cljs$core$async$__GT_t_cljs$core$async27794(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta27795){
return (new cljs.core.async.t_cljs$core$async27794(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta27795));
});

}

return (new cljs.core.async.t_cljs$core$async27794(ch,topic_fn,buf_fn,mults,ensure_mult,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__26680__auto___27914 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26681__auto__ = (function (){var switch__26585__auto__ = (function (state_27868){
var state_val_27869 = (state_27868[(1)]);
if((state_val_27869 === (7))){
var inst_27864 = (state_27868[(2)]);
var state_27868__$1 = state_27868;
var statearr_27870_27915 = state_27868__$1;
(statearr_27870_27915[(2)] = inst_27864);

(statearr_27870_27915[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27869 === (20))){
var state_27868__$1 = state_27868;
var statearr_27871_27916 = state_27868__$1;
(statearr_27871_27916[(2)] = null);

(statearr_27871_27916[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27869 === (1))){
var state_27868__$1 = state_27868;
var statearr_27872_27917 = state_27868__$1;
(statearr_27872_27917[(2)] = null);

(statearr_27872_27917[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27869 === (24))){
var inst_27847 = (state_27868[(7)]);
var inst_27856 = cljs.core.swap_BANG_.call(null,mults,cljs.core.dissoc,inst_27847);
var state_27868__$1 = state_27868;
var statearr_27873_27918 = state_27868__$1;
(statearr_27873_27918[(2)] = inst_27856);

(statearr_27873_27918[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27869 === (4))){
var inst_27799 = (state_27868[(8)]);
var inst_27799__$1 = (state_27868[(2)]);
var inst_27800 = (inst_27799__$1 == null);
var state_27868__$1 = (function (){var statearr_27874 = state_27868;
(statearr_27874[(8)] = inst_27799__$1);

return statearr_27874;
})();
if(cljs.core.truth_(inst_27800)){
var statearr_27875_27919 = state_27868__$1;
(statearr_27875_27919[(1)] = (5));

} else {
var statearr_27876_27920 = state_27868__$1;
(statearr_27876_27920[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27869 === (15))){
var inst_27841 = (state_27868[(2)]);
var state_27868__$1 = state_27868;
var statearr_27877_27921 = state_27868__$1;
(statearr_27877_27921[(2)] = inst_27841);

(statearr_27877_27921[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27869 === (21))){
var inst_27861 = (state_27868[(2)]);
var state_27868__$1 = (function (){var statearr_27878 = state_27868;
(statearr_27878[(9)] = inst_27861);

return statearr_27878;
})();
var statearr_27879_27922 = state_27868__$1;
(statearr_27879_27922[(2)] = null);

(statearr_27879_27922[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27869 === (13))){
var inst_27823 = (state_27868[(10)]);
var inst_27825 = cljs.core.chunked_seq_QMARK_.call(null,inst_27823);
var state_27868__$1 = state_27868;
if(inst_27825){
var statearr_27880_27923 = state_27868__$1;
(statearr_27880_27923[(1)] = (16));

} else {
var statearr_27881_27924 = state_27868__$1;
(statearr_27881_27924[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27869 === (22))){
var inst_27853 = (state_27868[(2)]);
var state_27868__$1 = state_27868;
if(cljs.core.truth_(inst_27853)){
var statearr_27882_27925 = state_27868__$1;
(statearr_27882_27925[(1)] = (23));

} else {
var statearr_27883_27926 = state_27868__$1;
(statearr_27883_27926[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27869 === (6))){
var inst_27849 = (state_27868[(11)]);
var inst_27847 = (state_27868[(7)]);
var inst_27799 = (state_27868[(8)]);
var inst_27847__$1 = topic_fn.call(null,inst_27799);
var inst_27848 = cljs.core.deref.call(null,mults);
var inst_27849__$1 = cljs.core.get.call(null,inst_27848,inst_27847__$1);
var state_27868__$1 = (function (){var statearr_27884 = state_27868;
(statearr_27884[(11)] = inst_27849__$1);

(statearr_27884[(7)] = inst_27847__$1);

return statearr_27884;
})();
if(cljs.core.truth_(inst_27849__$1)){
var statearr_27885_27927 = state_27868__$1;
(statearr_27885_27927[(1)] = (19));

} else {
var statearr_27886_27928 = state_27868__$1;
(statearr_27886_27928[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27869 === (25))){
var inst_27858 = (state_27868[(2)]);
var state_27868__$1 = state_27868;
var statearr_27887_27929 = state_27868__$1;
(statearr_27887_27929[(2)] = inst_27858);

(statearr_27887_27929[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27869 === (17))){
var inst_27823 = (state_27868[(10)]);
var inst_27832 = cljs.core.first.call(null,inst_27823);
var inst_27833 = cljs.core.async.muxch_STAR_.call(null,inst_27832);
var inst_27834 = cljs.core.async.close_BANG_.call(null,inst_27833);
var inst_27835 = cljs.core.next.call(null,inst_27823);
var inst_27809 = inst_27835;
var inst_27810 = null;
var inst_27811 = (0);
var inst_27812 = (0);
var state_27868__$1 = (function (){var statearr_27888 = state_27868;
(statearr_27888[(12)] = inst_27811);

(statearr_27888[(13)] = inst_27834);

(statearr_27888[(14)] = inst_27810);

(statearr_27888[(15)] = inst_27809);

(statearr_27888[(16)] = inst_27812);

return statearr_27888;
})();
var statearr_27889_27930 = state_27868__$1;
(statearr_27889_27930[(2)] = null);

(statearr_27889_27930[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27869 === (3))){
var inst_27866 = (state_27868[(2)]);
var state_27868__$1 = state_27868;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_27868__$1,inst_27866);
} else {
if((state_val_27869 === (12))){
var inst_27843 = (state_27868[(2)]);
var state_27868__$1 = state_27868;
var statearr_27890_27931 = state_27868__$1;
(statearr_27890_27931[(2)] = inst_27843);

(statearr_27890_27931[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27869 === (2))){
var state_27868__$1 = state_27868;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27868__$1,(4),ch);
} else {
if((state_val_27869 === (23))){
var state_27868__$1 = state_27868;
var statearr_27891_27932 = state_27868__$1;
(statearr_27891_27932[(2)] = null);

(statearr_27891_27932[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27869 === (19))){
var inst_27849 = (state_27868[(11)]);
var inst_27799 = (state_27868[(8)]);
var inst_27851 = cljs.core.async.muxch_STAR_.call(null,inst_27849);
var state_27868__$1 = state_27868;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_27868__$1,(22),inst_27851,inst_27799);
} else {
if((state_val_27869 === (11))){
var inst_27823 = (state_27868[(10)]);
var inst_27809 = (state_27868[(15)]);
var inst_27823__$1 = cljs.core.seq.call(null,inst_27809);
var state_27868__$1 = (function (){var statearr_27892 = state_27868;
(statearr_27892[(10)] = inst_27823__$1);

return statearr_27892;
})();
if(inst_27823__$1){
var statearr_27893_27933 = state_27868__$1;
(statearr_27893_27933[(1)] = (13));

} else {
var statearr_27894_27934 = state_27868__$1;
(statearr_27894_27934[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27869 === (9))){
var inst_27845 = (state_27868[(2)]);
var state_27868__$1 = state_27868;
var statearr_27895_27935 = state_27868__$1;
(statearr_27895_27935[(2)] = inst_27845);

(statearr_27895_27935[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27869 === (5))){
var inst_27806 = cljs.core.deref.call(null,mults);
var inst_27807 = cljs.core.vals.call(null,inst_27806);
var inst_27808 = cljs.core.seq.call(null,inst_27807);
var inst_27809 = inst_27808;
var inst_27810 = null;
var inst_27811 = (0);
var inst_27812 = (0);
var state_27868__$1 = (function (){var statearr_27896 = state_27868;
(statearr_27896[(12)] = inst_27811);

(statearr_27896[(14)] = inst_27810);

(statearr_27896[(15)] = inst_27809);

(statearr_27896[(16)] = inst_27812);

return statearr_27896;
})();
var statearr_27897_27936 = state_27868__$1;
(statearr_27897_27936[(2)] = null);

(statearr_27897_27936[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27869 === (14))){
var state_27868__$1 = state_27868;
var statearr_27901_27937 = state_27868__$1;
(statearr_27901_27937[(2)] = null);

(statearr_27901_27937[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27869 === (16))){
var inst_27823 = (state_27868[(10)]);
var inst_27827 = cljs.core.chunk_first.call(null,inst_27823);
var inst_27828 = cljs.core.chunk_rest.call(null,inst_27823);
var inst_27829 = cljs.core.count.call(null,inst_27827);
var inst_27809 = inst_27828;
var inst_27810 = inst_27827;
var inst_27811 = inst_27829;
var inst_27812 = (0);
var state_27868__$1 = (function (){var statearr_27902 = state_27868;
(statearr_27902[(12)] = inst_27811);

(statearr_27902[(14)] = inst_27810);

(statearr_27902[(15)] = inst_27809);

(statearr_27902[(16)] = inst_27812);

return statearr_27902;
})();
var statearr_27903_27938 = state_27868__$1;
(statearr_27903_27938[(2)] = null);

(statearr_27903_27938[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27869 === (10))){
var inst_27811 = (state_27868[(12)]);
var inst_27810 = (state_27868[(14)]);
var inst_27809 = (state_27868[(15)]);
var inst_27812 = (state_27868[(16)]);
var inst_27817 = cljs.core._nth.call(null,inst_27810,inst_27812);
var inst_27818 = cljs.core.async.muxch_STAR_.call(null,inst_27817);
var inst_27819 = cljs.core.async.close_BANG_.call(null,inst_27818);
var inst_27820 = (inst_27812 + (1));
var tmp27898 = inst_27811;
var tmp27899 = inst_27810;
var tmp27900 = inst_27809;
var inst_27809__$1 = tmp27900;
var inst_27810__$1 = tmp27899;
var inst_27811__$1 = tmp27898;
var inst_27812__$1 = inst_27820;
var state_27868__$1 = (function (){var statearr_27904 = state_27868;
(statearr_27904[(12)] = inst_27811__$1);

(statearr_27904[(14)] = inst_27810__$1);

(statearr_27904[(17)] = inst_27819);

(statearr_27904[(15)] = inst_27809__$1);

(statearr_27904[(16)] = inst_27812__$1);

return statearr_27904;
})();
var statearr_27905_27939 = state_27868__$1;
(statearr_27905_27939[(2)] = null);

(statearr_27905_27939[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27869 === (18))){
var inst_27838 = (state_27868[(2)]);
var state_27868__$1 = state_27868;
var statearr_27906_27940 = state_27868__$1;
(statearr_27906_27940[(2)] = inst_27838);

(statearr_27906_27940[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27869 === (8))){
var inst_27811 = (state_27868[(12)]);
var inst_27812 = (state_27868[(16)]);
var inst_27814 = (inst_27812 < inst_27811);
var inst_27815 = inst_27814;
var state_27868__$1 = state_27868;
if(cljs.core.truth_(inst_27815)){
var statearr_27907_27941 = state_27868__$1;
(statearr_27907_27941[(1)] = (10));

} else {
var statearr_27908_27942 = state_27868__$1;
(statearr_27908_27942[(1)] = (11));

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
var cljs$core$async$state_machine__26586__auto__ = null;
var cljs$core$async$state_machine__26586__auto____0 = (function (){
var statearr_27909 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_27909[(0)] = cljs$core$async$state_machine__26586__auto__);

(statearr_27909[(1)] = (1));

return statearr_27909;
});
var cljs$core$async$state_machine__26586__auto____1 = (function (state_27868){
while(true){
var ret_value__26587__auto__ = (function (){try{while(true){
var result__26588__auto__ = switch__26585__auto__.call(null,state_27868);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26588__auto__;
}
break;
}
}catch (e27910){if((e27910 instanceof Object)){
var ex__26589__auto__ = e27910;
var statearr_27911_27943 = state_27868;
(statearr_27911_27943[(5)] = ex__26589__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27868);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e27910;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26587__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27944 = state_27868;
state_27868 = G__27944;
continue;
} else {
return ret_value__26587__auto__;
}
break;
}
});
cljs$core$async$state_machine__26586__auto__ = function(state_27868){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__26586__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__26586__auto____1.call(this,state_27868);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__26586__auto____0;
cljs$core$async$state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__26586__auto____1;
return cljs$core$async$state_machine__26586__auto__;
})()
})();
var state__26682__auto__ = (function (){var statearr_27912 = f__26681__auto__.call(null);
(statearr_27912[(6)] = c__26680__auto___27914);

return statearr_27912;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26682__auto__);
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
var G__27946 = arguments.length;
switch (G__27946) {
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
var G__27949 = arguments.length;
switch (G__27949) {
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
var G__27952 = arguments.length;
switch (G__27952) {
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
var c__26680__auto___28019 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26681__auto__ = (function (){var switch__26585__auto__ = (function (state_27991){
var state_val_27992 = (state_27991[(1)]);
if((state_val_27992 === (7))){
var state_27991__$1 = state_27991;
var statearr_27993_28020 = state_27991__$1;
(statearr_27993_28020[(2)] = null);

(statearr_27993_28020[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27992 === (1))){
var state_27991__$1 = state_27991;
var statearr_27994_28021 = state_27991__$1;
(statearr_27994_28021[(2)] = null);

(statearr_27994_28021[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27992 === (4))){
var inst_27955 = (state_27991[(7)]);
var inst_27957 = (inst_27955 < cnt);
var state_27991__$1 = state_27991;
if(cljs.core.truth_(inst_27957)){
var statearr_27995_28022 = state_27991__$1;
(statearr_27995_28022[(1)] = (6));

} else {
var statearr_27996_28023 = state_27991__$1;
(statearr_27996_28023[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27992 === (15))){
var inst_27987 = (state_27991[(2)]);
var state_27991__$1 = state_27991;
var statearr_27997_28024 = state_27991__$1;
(statearr_27997_28024[(2)] = inst_27987);

(statearr_27997_28024[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27992 === (13))){
var inst_27980 = cljs.core.async.close_BANG_.call(null,out);
var state_27991__$1 = state_27991;
var statearr_27998_28025 = state_27991__$1;
(statearr_27998_28025[(2)] = inst_27980);

(statearr_27998_28025[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27992 === (6))){
var state_27991__$1 = state_27991;
var statearr_27999_28026 = state_27991__$1;
(statearr_27999_28026[(2)] = null);

(statearr_27999_28026[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27992 === (3))){
var inst_27989 = (state_27991[(2)]);
var state_27991__$1 = state_27991;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_27991__$1,inst_27989);
} else {
if((state_val_27992 === (12))){
var inst_27977 = (state_27991[(8)]);
var inst_27977__$1 = (state_27991[(2)]);
var inst_27978 = cljs.core.some.call(null,cljs.core.nil_QMARK_,inst_27977__$1);
var state_27991__$1 = (function (){var statearr_28000 = state_27991;
(statearr_28000[(8)] = inst_27977__$1);

return statearr_28000;
})();
if(cljs.core.truth_(inst_27978)){
var statearr_28001_28027 = state_27991__$1;
(statearr_28001_28027[(1)] = (13));

} else {
var statearr_28002_28028 = state_27991__$1;
(statearr_28002_28028[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27992 === (2))){
var inst_27954 = cljs.core.reset_BANG_.call(null,dctr,cnt);
var inst_27955 = (0);
var state_27991__$1 = (function (){var statearr_28003 = state_27991;
(statearr_28003[(7)] = inst_27955);

(statearr_28003[(9)] = inst_27954);

return statearr_28003;
})();
var statearr_28004_28029 = state_27991__$1;
(statearr_28004_28029[(2)] = null);

(statearr_28004_28029[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27992 === (11))){
var inst_27955 = (state_27991[(7)]);
var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_27991,(10),Object,null,(9));
var inst_27964 = chs__$1.call(null,inst_27955);
var inst_27965 = done.call(null,inst_27955);
var inst_27966 = cljs.core.async.take_BANG_.call(null,inst_27964,inst_27965);
var state_27991__$1 = state_27991;
var statearr_28005_28030 = state_27991__$1;
(statearr_28005_28030[(2)] = inst_27966);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27991__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27992 === (9))){
var inst_27955 = (state_27991[(7)]);
var inst_27968 = (state_27991[(2)]);
var inst_27969 = (inst_27955 + (1));
var inst_27955__$1 = inst_27969;
var state_27991__$1 = (function (){var statearr_28006 = state_27991;
(statearr_28006[(7)] = inst_27955__$1);

(statearr_28006[(10)] = inst_27968);

return statearr_28006;
})();
var statearr_28007_28031 = state_27991__$1;
(statearr_28007_28031[(2)] = null);

(statearr_28007_28031[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27992 === (5))){
var inst_27975 = (state_27991[(2)]);
var state_27991__$1 = (function (){var statearr_28008 = state_27991;
(statearr_28008[(11)] = inst_27975);

return statearr_28008;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27991__$1,(12),dchan);
} else {
if((state_val_27992 === (14))){
var inst_27977 = (state_27991[(8)]);
var inst_27982 = cljs.core.apply.call(null,f,inst_27977);
var state_27991__$1 = state_27991;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_27991__$1,(16),out,inst_27982);
} else {
if((state_val_27992 === (16))){
var inst_27984 = (state_27991[(2)]);
var state_27991__$1 = (function (){var statearr_28009 = state_27991;
(statearr_28009[(12)] = inst_27984);

return statearr_28009;
})();
var statearr_28010_28032 = state_27991__$1;
(statearr_28010_28032[(2)] = null);

(statearr_28010_28032[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27992 === (10))){
var inst_27959 = (state_27991[(2)]);
var inst_27960 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);
var state_27991__$1 = (function (){var statearr_28011 = state_27991;
(statearr_28011[(13)] = inst_27959);

return statearr_28011;
})();
var statearr_28012_28033 = state_27991__$1;
(statearr_28012_28033[(2)] = inst_27960);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27991__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27992 === (8))){
var inst_27973 = (state_27991[(2)]);
var state_27991__$1 = state_27991;
var statearr_28013_28034 = state_27991__$1;
(statearr_28013_28034[(2)] = inst_27973);

(statearr_28013_28034[(1)] = (5));


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
var cljs$core$async$state_machine__26586__auto__ = null;
var cljs$core$async$state_machine__26586__auto____0 = (function (){
var statearr_28014 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_28014[(0)] = cljs$core$async$state_machine__26586__auto__);

(statearr_28014[(1)] = (1));

return statearr_28014;
});
var cljs$core$async$state_machine__26586__auto____1 = (function (state_27991){
while(true){
var ret_value__26587__auto__ = (function (){try{while(true){
var result__26588__auto__ = switch__26585__auto__.call(null,state_27991);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26588__auto__;
}
break;
}
}catch (e28015){if((e28015 instanceof Object)){
var ex__26589__auto__ = e28015;
var statearr_28016_28035 = state_27991;
(statearr_28016_28035[(5)] = ex__26589__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27991);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e28015;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26587__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__28036 = state_27991;
state_27991 = G__28036;
continue;
} else {
return ret_value__26587__auto__;
}
break;
}
});
cljs$core$async$state_machine__26586__auto__ = function(state_27991){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__26586__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__26586__auto____1.call(this,state_27991);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__26586__auto____0;
cljs$core$async$state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__26586__auto____1;
return cljs$core$async$state_machine__26586__auto__;
})()
})();
var state__26682__auto__ = (function (){var statearr_28017 = f__26681__auto__.call(null);
(statearr_28017[(6)] = c__26680__auto___28019);

return statearr_28017;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26682__auto__);
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
var G__28039 = arguments.length;
switch (G__28039) {
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
var c__26680__auto___28093 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26681__auto__ = (function (){var switch__26585__auto__ = (function (state_28071){
var state_val_28072 = (state_28071[(1)]);
if((state_val_28072 === (7))){
var inst_28051 = (state_28071[(7)]);
var inst_28050 = (state_28071[(8)]);
var inst_28050__$1 = (state_28071[(2)]);
var inst_28051__$1 = cljs.core.nth.call(null,inst_28050__$1,(0),null);
var inst_28052 = cljs.core.nth.call(null,inst_28050__$1,(1),null);
var inst_28053 = (inst_28051__$1 == null);
var state_28071__$1 = (function (){var statearr_28073 = state_28071;
(statearr_28073[(9)] = inst_28052);

(statearr_28073[(7)] = inst_28051__$1);

(statearr_28073[(8)] = inst_28050__$1);

return statearr_28073;
})();
if(cljs.core.truth_(inst_28053)){
var statearr_28074_28094 = state_28071__$1;
(statearr_28074_28094[(1)] = (8));

} else {
var statearr_28075_28095 = state_28071__$1;
(statearr_28075_28095[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28072 === (1))){
var inst_28040 = cljs.core.vec.call(null,chs);
var inst_28041 = inst_28040;
var state_28071__$1 = (function (){var statearr_28076 = state_28071;
(statearr_28076[(10)] = inst_28041);

return statearr_28076;
})();
var statearr_28077_28096 = state_28071__$1;
(statearr_28077_28096[(2)] = null);

(statearr_28077_28096[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28072 === (4))){
var inst_28041 = (state_28071[(10)]);
var state_28071__$1 = state_28071;
return cljs.core.async.ioc_alts_BANG_.call(null,state_28071__$1,(7),inst_28041);
} else {
if((state_val_28072 === (6))){
var inst_28067 = (state_28071[(2)]);
var state_28071__$1 = state_28071;
var statearr_28078_28097 = state_28071__$1;
(statearr_28078_28097[(2)] = inst_28067);

(statearr_28078_28097[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28072 === (3))){
var inst_28069 = (state_28071[(2)]);
var state_28071__$1 = state_28071;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_28071__$1,inst_28069);
} else {
if((state_val_28072 === (2))){
var inst_28041 = (state_28071[(10)]);
var inst_28043 = cljs.core.count.call(null,inst_28041);
var inst_28044 = (inst_28043 > (0));
var state_28071__$1 = state_28071;
if(cljs.core.truth_(inst_28044)){
var statearr_28080_28098 = state_28071__$1;
(statearr_28080_28098[(1)] = (4));

} else {
var statearr_28081_28099 = state_28071__$1;
(statearr_28081_28099[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28072 === (11))){
var inst_28041 = (state_28071[(10)]);
var inst_28060 = (state_28071[(2)]);
var tmp28079 = inst_28041;
var inst_28041__$1 = tmp28079;
var state_28071__$1 = (function (){var statearr_28082 = state_28071;
(statearr_28082[(11)] = inst_28060);

(statearr_28082[(10)] = inst_28041__$1);

return statearr_28082;
})();
var statearr_28083_28100 = state_28071__$1;
(statearr_28083_28100[(2)] = null);

(statearr_28083_28100[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28072 === (9))){
var inst_28051 = (state_28071[(7)]);
var state_28071__$1 = state_28071;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_28071__$1,(11),out,inst_28051);
} else {
if((state_val_28072 === (5))){
var inst_28065 = cljs.core.async.close_BANG_.call(null,out);
var state_28071__$1 = state_28071;
var statearr_28084_28101 = state_28071__$1;
(statearr_28084_28101[(2)] = inst_28065);

(statearr_28084_28101[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28072 === (10))){
var inst_28063 = (state_28071[(2)]);
var state_28071__$1 = state_28071;
var statearr_28085_28102 = state_28071__$1;
(statearr_28085_28102[(2)] = inst_28063);

(statearr_28085_28102[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28072 === (8))){
var inst_28052 = (state_28071[(9)]);
var inst_28041 = (state_28071[(10)]);
var inst_28051 = (state_28071[(7)]);
var inst_28050 = (state_28071[(8)]);
var inst_28055 = (function (){var cs = inst_28041;
var vec__28046 = inst_28050;
var v = inst_28051;
var c = inst_28052;
return (function (p1__28037_SHARP_){
return cljs.core.not_EQ_.call(null,c,p1__28037_SHARP_);
});
})();
var inst_28056 = cljs.core.filterv.call(null,inst_28055,inst_28041);
var inst_28041__$1 = inst_28056;
var state_28071__$1 = (function (){var statearr_28086 = state_28071;
(statearr_28086[(10)] = inst_28041__$1);

return statearr_28086;
})();
var statearr_28087_28103 = state_28071__$1;
(statearr_28087_28103[(2)] = null);

(statearr_28087_28103[(1)] = (2));


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
var cljs$core$async$state_machine__26586__auto__ = null;
var cljs$core$async$state_machine__26586__auto____0 = (function (){
var statearr_28088 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_28088[(0)] = cljs$core$async$state_machine__26586__auto__);

(statearr_28088[(1)] = (1));

return statearr_28088;
});
var cljs$core$async$state_machine__26586__auto____1 = (function (state_28071){
while(true){
var ret_value__26587__auto__ = (function (){try{while(true){
var result__26588__auto__ = switch__26585__auto__.call(null,state_28071);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26588__auto__;
}
break;
}
}catch (e28089){if((e28089 instanceof Object)){
var ex__26589__auto__ = e28089;
var statearr_28090_28104 = state_28071;
(statearr_28090_28104[(5)] = ex__26589__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_28071);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e28089;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26587__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__28105 = state_28071;
state_28071 = G__28105;
continue;
} else {
return ret_value__26587__auto__;
}
break;
}
});
cljs$core$async$state_machine__26586__auto__ = function(state_28071){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__26586__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__26586__auto____1.call(this,state_28071);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__26586__auto____0;
cljs$core$async$state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__26586__auto____1;
return cljs$core$async$state_machine__26586__auto__;
})()
})();
var state__26682__auto__ = (function (){var statearr_28091 = f__26681__auto__.call(null);
(statearr_28091[(6)] = c__26680__auto___28093);

return statearr_28091;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26682__auto__);
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
var G__28107 = arguments.length;
switch (G__28107) {
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
var c__26680__auto___28152 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26681__auto__ = (function (){var switch__26585__auto__ = (function (state_28131){
var state_val_28132 = (state_28131[(1)]);
if((state_val_28132 === (7))){
var inst_28113 = (state_28131[(7)]);
var inst_28113__$1 = (state_28131[(2)]);
var inst_28114 = (inst_28113__$1 == null);
var inst_28115 = cljs.core.not.call(null,inst_28114);
var state_28131__$1 = (function (){var statearr_28133 = state_28131;
(statearr_28133[(7)] = inst_28113__$1);

return statearr_28133;
})();
if(inst_28115){
var statearr_28134_28153 = state_28131__$1;
(statearr_28134_28153[(1)] = (8));

} else {
var statearr_28135_28154 = state_28131__$1;
(statearr_28135_28154[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28132 === (1))){
var inst_28108 = (0);
var state_28131__$1 = (function (){var statearr_28136 = state_28131;
(statearr_28136[(8)] = inst_28108);

return statearr_28136;
})();
var statearr_28137_28155 = state_28131__$1;
(statearr_28137_28155[(2)] = null);

(statearr_28137_28155[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28132 === (4))){
var state_28131__$1 = state_28131;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_28131__$1,(7),ch);
} else {
if((state_val_28132 === (6))){
var inst_28126 = (state_28131[(2)]);
var state_28131__$1 = state_28131;
var statearr_28138_28156 = state_28131__$1;
(statearr_28138_28156[(2)] = inst_28126);

(statearr_28138_28156[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28132 === (3))){
var inst_28128 = (state_28131[(2)]);
var inst_28129 = cljs.core.async.close_BANG_.call(null,out);
var state_28131__$1 = (function (){var statearr_28139 = state_28131;
(statearr_28139[(9)] = inst_28128);

return statearr_28139;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_28131__$1,inst_28129);
} else {
if((state_val_28132 === (2))){
var inst_28108 = (state_28131[(8)]);
var inst_28110 = (inst_28108 < n);
var state_28131__$1 = state_28131;
if(cljs.core.truth_(inst_28110)){
var statearr_28140_28157 = state_28131__$1;
(statearr_28140_28157[(1)] = (4));

} else {
var statearr_28141_28158 = state_28131__$1;
(statearr_28141_28158[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28132 === (11))){
var inst_28108 = (state_28131[(8)]);
var inst_28118 = (state_28131[(2)]);
var inst_28119 = (inst_28108 + (1));
var inst_28108__$1 = inst_28119;
var state_28131__$1 = (function (){var statearr_28142 = state_28131;
(statearr_28142[(10)] = inst_28118);

(statearr_28142[(8)] = inst_28108__$1);

return statearr_28142;
})();
var statearr_28143_28159 = state_28131__$1;
(statearr_28143_28159[(2)] = null);

(statearr_28143_28159[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28132 === (9))){
var state_28131__$1 = state_28131;
var statearr_28144_28160 = state_28131__$1;
(statearr_28144_28160[(2)] = null);

(statearr_28144_28160[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28132 === (5))){
var state_28131__$1 = state_28131;
var statearr_28145_28161 = state_28131__$1;
(statearr_28145_28161[(2)] = null);

(statearr_28145_28161[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28132 === (10))){
var inst_28123 = (state_28131[(2)]);
var state_28131__$1 = state_28131;
var statearr_28146_28162 = state_28131__$1;
(statearr_28146_28162[(2)] = inst_28123);

(statearr_28146_28162[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28132 === (8))){
var inst_28113 = (state_28131[(7)]);
var state_28131__$1 = state_28131;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_28131__$1,(11),out,inst_28113);
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
var cljs$core$async$state_machine__26586__auto__ = null;
var cljs$core$async$state_machine__26586__auto____0 = (function (){
var statearr_28147 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_28147[(0)] = cljs$core$async$state_machine__26586__auto__);

(statearr_28147[(1)] = (1));

return statearr_28147;
});
var cljs$core$async$state_machine__26586__auto____1 = (function (state_28131){
while(true){
var ret_value__26587__auto__ = (function (){try{while(true){
var result__26588__auto__ = switch__26585__auto__.call(null,state_28131);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26588__auto__;
}
break;
}
}catch (e28148){if((e28148 instanceof Object)){
var ex__26589__auto__ = e28148;
var statearr_28149_28163 = state_28131;
(statearr_28149_28163[(5)] = ex__26589__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_28131);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e28148;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26587__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__28164 = state_28131;
state_28131 = G__28164;
continue;
} else {
return ret_value__26587__auto__;
}
break;
}
});
cljs$core$async$state_machine__26586__auto__ = function(state_28131){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__26586__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__26586__auto____1.call(this,state_28131);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__26586__auto____0;
cljs$core$async$state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__26586__auto____1;
return cljs$core$async$state_machine__26586__auto__;
})()
})();
var state__26682__auto__ = (function (){var statearr_28150 = f__26681__auto__.call(null);
(statearr_28150[(6)] = c__26680__auto___28152);

return statearr_28150;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26682__auto__);
}));


return out;
}));

(cljs.core.async.take.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_LT_ = (function cljs$core$async$map_LT_(f,ch){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async28166 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async28166 = (function (f,ch,meta28167){
this.f = f;
this.ch = ch;
this.meta28167 = meta28167;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async28166.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_28168,meta28167__$1){
var self__ = this;
var _28168__$1 = this;
return (new cljs.core.async.t_cljs$core$async28166(self__.f,self__.ch,meta28167__$1));
}));

(cljs.core.async.t_cljs$core$async28166.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_28168){
var self__ = this;
var _28168__$1 = this;
return self__.meta28167;
}));

(cljs.core.async.t_cljs$core$async28166.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async28166.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
}));

(cljs.core.async.t_cljs$core$async28166.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
}));

(cljs.core.async.t_cljs$core$async28166.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async28166.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,(function (){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async28169 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async28169 = (function (f,ch,meta28167,_,fn1,meta28170){
this.f = f;
this.ch = ch;
this.meta28167 = meta28167;
this._ = _;
this.fn1 = fn1;
this.meta28170 = meta28170;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async28169.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_28171,meta28170__$1){
var self__ = this;
var _28171__$1 = this;
return (new cljs.core.async.t_cljs$core$async28169(self__.f,self__.ch,self__.meta28167,self__._,self__.fn1,meta28170__$1));
}));

(cljs.core.async.t_cljs$core$async28169.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_28171){
var self__ = this;
var _28171__$1 = this;
return self__.meta28170;
}));

(cljs.core.async.t_cljs$core$async28169.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async28169.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.fn1);
}));

(cljs.core.async.t_cljs$core$async28169.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async28169.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
var f1 = cljs.core.async.impl.protocols.commit.call(null,self__.fn1);
return (function (p1__28165_SHARP_){
return f1.call(null,(((p1__28165_SHARP_ == null))?null:self__.f.call(null,p1__28165_SHARP_)));
});
}));

(cljs.core.async.t_cljs$core$async28169.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta28167","meta28167",1844092718,null),cljs.core.with_meta(new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol("cljs.core.async","t_cljs$core$async28166","cljs.core.async/t_cljs$core$async28166",-1839856846,null)], null)),new cljs.core.Symbol(null,"fn1","fn1",895834444,null),new cljs.core.Symbol(null,"meta28170","meta28170",1383635354,null)], null);
}));

(cljs.core.async.t_cljs$core$async28169.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async28169.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async28169");

(cljs.core.async.t_cljs$core$async28169.cljs$lang$ctorPrWriter = (function (this__4428__auto__,writer__4429__auto__,opt__4430__auto__){
return cljs.core._write.call(null,writer__4429__auto__,"cljs.core.async/t_cljs$core$async28169");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async28169.
 */
cljs.core.async.__GT_t_cljs$core$async28169 = (function cljs$core$async$map_LT__$___GT_t_cljs$core$async28169(f__$1,ch__$1,meta28167__$1,___$2,fn1__$1,meta28170){
return (new cljs.core.async.t_cljs$core$async28169(f__$1,ch__$1,meta28167__$1,___$2,fn1__$1,meta28170));
});

}

return (new cljs.core.async.t_cljs$core$async28169(self__.f,self__.ch,self__.meta28167,___$1,fn1,cljs.core.PersistentArrayMap.EMPTY));
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

(cljs.core.async.t_cljs$core$async28166.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async28166.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
}));

(cljs.core.async.t_cljs$core$async28166.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta28167","meta28167",1844092718,null)], null);
}));

(cljs.core.async.t_cljs$core$async28166.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async28166.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async28166");

(cljs.core.async.t_cljs$core$async28166.cljs$lang$ctorPrWriter = (function (this__4428__auto__,writer__4429__auto__,opt__4430__auto__){
return cljs.core._write.call(null,writer__4429__auto__,"cljs.core.async/t_cljs$core$async28166");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async28166.
 */
cljs.core.async.__GT_t_cljs$core$async28166 = (function cljs$core$async$map_LT__$___GT_t_cljs$core$async28166(f__$1,ch__$1,meta28167){
return (new cljs.core.async.t_cljs$core$async28166(f__$1,ch__$1,meta28167));
});

}

return (new cljs.core.async.t_cljs$core$async28166(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_GT_ = (function cljs$core$async$map_GT_(f,ch){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async28172 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async28172 = (function (f,ch,meta28173){
this.f = f;
this.ch = ch;
this.meta28173 = meta28173;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async28172.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_28174,meta28173__$1){
var self__ = this;
var _28174__$1 = this;
return (new cljs.core.async.t_cljs$core$async28172(self__.f,self__.ch,meta28173__$1));
}));

(cljs.core.async.t_cljs$core$async28172.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_28174){
var self__ = this;
var _28174__$1 = this;
return self__.meta28173;
}));

(cljs.core.async.t_cljs$core$async28172.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async28172.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
}));

(cljs.core.async.t_cljs$core$async28172.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async28172.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
}));

(cljs.core.async.t_cljs$core$async28172.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async28172.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,self__.f.call(null,val),fn1);
}));

(cljs.core.async.t_cljs$core$async28172.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta28173","meta28173",-211626837,null)], null);
}));

(cljs.core.async.t_cljs$core$async28172.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async28172.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async28172");

(cljs.core.async.t_cljs$core$async28172.cljs$lang$ctorPrWriter = (function (this__4428__auto__,writer__4429__auto__,opt__4430__auto__){
return cljs.core._write.call(null,writer__4429__auto__,"cljs.core.async/t_cljs$core$async28172");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async28172.
 */
cljs.core.async.__GT_t_cljs$core$async28172 = (function cljs$core$async$map_GT__$___GT_t_cljs$core$async28172(f__$1,ch__$1,meta28173){
return (new cljs.core.async.t_cljs$core$async28172(f__$1,ch__$1,meta28173));
});

}

return (new cljs.core.async.t_cljs$core$async28172(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_GT_ = (function cljs$core$async$filter_GT_(p,ch){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async28175 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async28175 = (function (p,ch,meta28176){
this.p = p;
this.ch = ch;
this.meta28176 = meta28176;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async28175.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_28177,meta28176__$1){
var self__ = this;
var _28177__$1 = this;
return (new cljs.core.async.t_cljs$core$async28175(self__.p,self__.ch,meta28176__$1));
}));

(cljs.core.async.t_cljs$core$async28175.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_28177){
var self__ = this;
var _28177__$1 = this;
return self__.meta28176;
}));

(cljs.core.async.t_cljs$core$async28175.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async28175.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
}));

(cljs.core.async.t_cljs$core$async28175.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
}));

(cljs.core.async.t_cljs$core$async28175.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async28175.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
}));

(cljs.core.async.t_cljs$core$async28175.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async28175.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.p.call(null,val))){
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
} else {
return cljs.core.async.impl.channels.box.call(null,cljs.core.not.call(null,cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch)));
}
}));

(cljs.core.async.t_cljs$core$async28175.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta28176","meta28176",-1327855106,null)], null);
}));

(cljs.core.async.t_cljs$core$async28175.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async28175.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async28175");

(cljs.core.async.t_cljs$core$async28175.cljs$lang$ctorPrWriter = (function (this__4428__auto__,writer__4429__auto__,opt__4430__auto__){
return cljs.core._write.call(null,writer__4429__auto__,"cljs.core.async/t_cljs$core$async28175");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async28175.
 */
cljs.core.async.__GT_t_cljs$core$async28175 = (function cljs$core$async$filter_GT__$___GT_t_cljs$core$async28175(p__$1,ch__$1,meta28176){
return (new cljs.core.async.t_cljs$core$async28175(p__$1,ch__$1,meta28176));
});

}

return (new cljs.core.async.t_cljs$core$async28175(p,ch,cljs.core.PersistentArrayMap.EMPTY));
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
var G__28179 = arguments.length;
switch (G__28179) {
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
var c__26680__auto___28219 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26681__auto__ = (function (){var switch__26585__auto__ = (function (state_28200){
var state_val_28201 = (state_28200[(1)]);
if((state_val_28201 === (7))){
var inst_28196 = (state_28200[(2)]);
var state_28200__$1 = state_28200;
var statearr_28202_28220 = state_28200__$1;
(statearr_28202_28220[(2)] = inst_28196);

(statearr_28202_28220[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28201 === (1))){
var state_28200__$1 = state_28200;
var statearr_28203_28221 = state_28200__$1;
(statearr_28203_28221[(2)] = null);

(statearr_28203_28221[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28201 === (4))){
var inst_28182 = (state_28200[(7)]);
var inst_28182__$1 = (state_28200[(2)]);
var inst_28183 = (inst_28182__$1 == null);
var state_28200__$1 = (function (){var statearr_28204 = state_28200;
(statearr_28204[(7)] = inst_28182__$1);

return statearr_28204;
})();
if(cljs.core.truth_(inst_28183)){
var statearr_28205_28222 = state_28200__$1;
(statearr_28205_28222[(1)] = (5));

} else {
var statearr_28206_28223 = state_28200__$1;
(statearr_28206_28223[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28201 === (6))){
var inst_28182 = (state_28200[(7)]);
var inst_28187 = p.call(null,inst_28182);
var state_28200__$1 = state_28200;
if(cljs.core.truth_(inst_28187)){
var statearr_28207_28224 = state_28200__$1;
(statearr_28207_28224[(1)] = (8));

} else {
var statearr_28208_28225 = state_28200__$1;
(statearr_28208_28225[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28201 === (3))){
var inst_28198 = (state_28200[(2)]);
var state_28200__$1 = state_28200;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_28200__$1,inst_28198);
} else {
if((state_val_28201 === (2))){
var state_28200__$1 = state_28200;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_28200__$1,(4),ch);
} else {
if((state_val_28201 === (11))){
var inst_28190 = (state_28200[(2)]);
var state_28200__$1 = state_28200;
var statearr_28209_28226 = state_28200__$1;
(statearr_28209_28226[(2)] = inst_28190);

(statearr_28209_28226[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28201 === (9))){
var state_28200__$1 = state_28200;
var statearr_28210_28227 = state_28200__$1;
(statearr_28210_28227[(2)] = null);

(statearr_28210_28227[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28201 === (5))){
var inst_28185 = cljs.core.async.close_BANG_.call(null,out);
var state_28200__$1 = state_28200;
var statearr_28211_28228 = state_28200__$1;
(statearr_28211_28228[(2)] = inst_28185);

(statearr_28211_28228[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28201 === (10))){
var inst_28193 = (state_28200[(2)]);
var state_28200__$1 = (function (){var statearr_28212 = state_28200;
(statearr_28212[(8)] = inst_28193);

return statearr_28212;
})();
var statearr_28213_28229 = state_28200__$1;
(statearr_28213_28229[(2)] = null);

(statearr_28213_28229[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28201 === (8))){
var inst_28182 = (state_28200[(7)]);
var state_28200__$1 = state_28200;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_28200__$1,(11),out,inst_28182);
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
var cljs$core$async$state_machine__26586__auto__ = null;
var cljs$core$async$state_machine__26586__auto____0 = (function (){
var statearr_28214 = [null,null,null,null,null,null,null,null,null];
(statearr_28214[(0)] = cljs$core$async$state_machine__26586__auto__);

(statearr_28214[(1)] = (1));

return statearr_28214;
});
var cljs$core$async$state_machine__26586__auto____1 = (function (state_28200){
while(true){
var ret_value__26587__auto__ = (function (){try{while(true){
var result__26588__auto__ = switch__26585__auto__.call(null,state_28200);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26588__auto__;
}
break;
}
}catch (e28215){if((e28215 instanceof Object)){
var ex__26589__auto__ = e28215;
var statearr_28216_28230 = state_28200;
(statearr_28216_28230[(5)] = ex__26589__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_28200);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e28215;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26587__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__28231 = state_28200;
state_28200 = G__28231;
continue;
} else {
return ret_value__26587__auto__;
}
break;
}
});
cljs$core$async$state_machine__26586__auto__ = function(state_28200){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__26586__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__26586__auto____1.call(this,state_28200);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__26586__auto____0;
cljs$core$async$state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__26586__auto____1;
return cljs$core$async$state_machine__26586__auto__;
})()
})();
var state__26682__auto__ = (function (){var statearr_28217 = f__26681__auto__.call(null);
(statearr_28217[(6)] = c__26680__auto___28219);

return statearr_28217;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26682__auto__);
}));


return out;
}));

(cljs.core.async.filter_LT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_LT_ = (function cljs$core$async$remove_LT_(var_args){
var G__28233 = arguments.length;
switch (G__28233) {
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
var c__26680__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26681__auto__ = (function (){var switch__26585__auto__ = (function (state_28296){
var state_val_28297 = (state_28296[(1)]);
if((state_val_28297 === (7))){
var inst_28292 = (state_28296[(2)]);
var state_28296__$1 = state_28296;
var statearr_28298_28336 = state_28296__$1;
(statearr_28298_28336[(2)] = inst_28292);

(statearr_28298_28336[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28297 === (20))){
var inst_28262 = (state_28296[(7)]);
var inst_28273 = (state_28296[(2)]);
var inst_28274 = cljs.core.next.call(null,inst_28262);
var inst_28248 = inst_28274;
var inst_28249 = null;
var inst_28250 = (0);
var inst_28251 = (0);
var state_28296__$1 = (function (){var statearr_28299 = state_28296;
(statearr_28299[(8)] = inst_28250);

(statearr_28299[(9)] = inst_28273);

(statearr_28299[(10)] = inst_28249);

(statearr_28299[(11)] = inst_28248);

(statearr_28299[(12)] = inst_28251);

return statearr_28299;
})();
var statearr_28300_28337 = state_28296__$1;
(statearr_28300_28337[(2)] = null);

(statearr_28300_28337[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28297 === (1))){
var state_28296__$1 = state_28296;
var statearr_28301_28338 = state_28296__$1;
(statearr_28301_28338[(2)] = null);

(statearr_28301_28338[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28297 === (4))){
var inst_28237 = (state_28296[(13)]);
var inst_28237__$1 = (state_28296[(2)]);
var inst_28238 = (inst_28237__$1 == null);
var state_28296__$1 = (function (){var statearr_28302 = state_28296;
(statearr_28302[(13)] = inst_28237__$1);

return statearr_28302;
})();
if(cljs.core.truth_(inst_28238)){
var statearr_28303_28339 = state_28296__$1;
(statearr_28303_28339[(1)] = (5));

} else {
var statearr_28304_28340 = state_28296__$1;
(statearr_28304_28340[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28297 === (15))){
var state_28296__$1 = state_28296;
var statearr_28308_28341 = state_28296__$1;
(statearr_28308_28341[(2)] = null);

(statearr_28308_28341[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28297 === (21))){
var state_28296__$1 = state_28296;
var statearr_28309_28342 = state_28296__$1;
(statearr_28309_28342[(2)] = null);

(statearr_28309_28342[(1)] = (23));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28297 === (13))){
var inst_28250 = (state_28296[(8)]);
var inst_28249 = (state_28296[(10)]);
var inst_28248 = (state_28296[(11)]);
var inst_28251 = (state_28296[(12)]);
var inst_28258 = (state_28296[(2)]);
var inst_28259 = (inst_28251 + (1));
var tmp28305 = inst_28250;
var tmp28306 = inst_28249;
var tmp28307 = inst_28248;
var inst_28248__$1 = tmp28307;
var inst_28249__$1 = tmp28306;
var inst_28250__$1 = tmp28305;
var inst_28251__$1 = inst_28259;
var state_28296__$1 = (function (){var statearr_28310 = state_28296;
(statearr_28310[(14)] = inst_28258);

(statearr_28310[(8)] = inst_28250__$1);

(statearr_28310[(10)] = inst_28249__$1);

(statearr_28310[(11)] = inst_28248__$1);

(statearr_28310[(12)] = inst_28251__$1);

return statearr_28310;
})();
var statearr_28311_28343 = state_28296__$1;
(statearr_28311_28343[(2)] = null);

(statearr_28311_28343[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28297 === (22))){
var state_28296__$1 = state_28296;
var statearr_28312_28344 = state_28296__$1;
(statearr_28312_28344[(2)] = null);

(statearr_28312_28344[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28297 === (6))){
var inst_28237 = (state_28296[(13)]);
var inst_28246 = f.call(null,inst_28237);
var inst_28247 = cljs.core.seq.call(null,inst_28246);
var inst_28248 = inst_28247;
var inst_28249 = null;
var inst_28250 = (0);
var inst_28251 = (0);
var state_28296__$1 = (function (){var statearr_28313 = state_28296;
(statearr_28313[(8)] = inst_28250);

(statearr_28313[(10)] = inst_28249);

(statearr_28313[(11)] = inst_28248);

(statearr_28313[(12)] = inst_28251);

return statearr_28313;
})();
var statearr_28314_28345 = state_28296__$1;
(statearr_28314_28345[(2)] = null);

(statearr_28314_28345[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28297 === (17))){
var inst_28262 = (state_28296[(7)]);
var inst_28266 = cljs.core.chunk_first.call(null,inst_28262);
var inst_28267 = cljs.core.chunk_rest.call(null,inst_28262);
var inst_28268 = cljs.core.count.call(null,inst_28266);
var inst_28248 = inst_28267;
var inst_28249 = inst_28266;
var inst_28250 = inst_28268;
var inst_28251 = (0);
var state_28296__$1 = (function (){var statearr_28315 = state_28296;
(statearr_28315[(8)] = inst_28250);

(statearr_28315[(10)] = inst_28249);

(statearr_28315[(11)] = inst_28248);

(statearr_28315[(12)] = inst_28251);

return statearr_28315;
})();
var statearr_28316_28346 = state_28296__$1;
(statearr_28316_28346[(2)] = null);

(statearr_28316_28346[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28297 === (3))){
var inst_28294 = (state_28296[(2)]);
var state_28296__$1 = state_28296;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_28296__$1,inst_28294);
} else {
if((state_val_28297 === (12))){
var inst_28282 = (state_28296[(2)]);
var state_28296__$1 = state_28296;
var statearr_28317_28347 = state_28296__$1;
(statearr_28317_28347[(2)] = inst_28282);

(statearr_28317_28347[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28297 === (2))){
var state_28296__$1 = state_28296;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_28296__$1,(4),in$);
} else {
if((state_val_28297 === (23))){
var inst_28290 = (state_28296[(2)]);
var state_28296__$1 = state_28296;
var statearr_28318_28348 = state_28296__$1;
(statearr_28318_28348[(2)] = inst_28290);

(statearr_28318_28348[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28297 === (19))){
var inst_28277 = (state_28296[(2)]);
var state_28296__$1 = state_28296;
var statearr_28319_28349 = state_28296__$1;
(statearr_28319_28349[(2)] = inst_28277);

(statearr_28319_28349[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28297 === (11))){
var inst_28248 = (state_28296[(11)]);
var inst_28262 = (state_28296[(7)]);
var inst_28262__$1 = cljs.core.seq.call(null,inst_28248);
var state_28296__$1 = (function (){var statearr_28320 = state_28296;
(statearr_28320[(7)] = inst_28262__$1);

return statearr_28320;
})();
if(inst_28262__$1){
var statearr_28321_28350 = state_28296__$1;
(statearr_28321_28350[(1)] = (14));

} else {
var statearr_28322_28351 = state_28296__$1;
(statearr_28322_28351[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28297 === (9))){
var inst_28284 = (state_28296[(2)]);
var inst_28285 = cljs.core.async.impl.protocols.closed_QMARK_.call(null,out);
var state_28296__$1 = (function (){var statearr_28323 = state_28296;
(statearr_28323[(15)] = inst_28284);

return statearr_28323;
})();
if(cljs.core.truth_(inst_28285)){
var statearr_28324_28352 = state_28296__$1;
(statearr_28324_28352[(1)] = (21));

} else {
var statearr_28325_28353 = state_28296__$1;
(statearr_28325_28353[(1)] = (22));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28297 === (5))){
var inst_28240 = cljs.core.async.close_BANG_.call(null,out);
var state_28296__$1 = state_28296;
var statearr_28326_28354 = state_28296__$1;
(statearr_28326_28354[(2)] = inst_28240);

(statearr_28326_28354[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28297 === (14))){
var inst_28262 = (state_28296[(7)]);
var inst_28264 = cljs.core.chunked_seq_QMARK_.call(null,inst_28262);
var state_28296__$1 = state_28296;
if(inst_28264){
var statearr_28327_28355 = state_28296__$1;
(statearr_28327_28355[(1)] = (17));

} else {
var statearr_28328_28356 = state_28296__$1;
(statearr_28328_28356[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28297 === (16))){
var inst_28280 = (state_28296[(2)]);
var state_28296__$1 = state_28296;
var statearr_28329_28357 = state_28296__$1;
(statearr_28329_28357[(2)] = inst_28280);

(statearr_28329_28357[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28297 === (10))){
var inst_28249 = (state_28296[(10)]);
var inst_28251 = (state_28296[(12)]);
var inst_28256 = cljs.core._nth.call(null,inst_28249,inst_28251);
var state_28296__$1 = state_28296;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_28296__$1,(13),out,inst_28256);
} else {
if((state_val_28297 === (18))){
var inst_28262 = (state_28296[(7)]);
var inst_28271 = cljs.core.first.call(null,inst_28262);
var state_28296__$1 = state_28296;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_28296__$1,(20),out,inst_28271);
} else {
if((state_val_28297 === (8))){
var inst_28250 = (state_28296[(8)]);
var inst_28251 = (state_28296[(12)]);
var inst_28253 = (inst_28251 < inst_28250);
var inst_28254 = inst_28253;
var state_28296__$1 = state_28296;
if(cljs.core.truth_(inst_28254)){
var statearr_28330_28358 = state_28296__$1;
(statearr_28330_28358[(1)] = (10));

} else {
var statearr_28331_28359 = state_28296__$1;
(statearr_28331_28359[(1)] = (11));

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
var cljs$core$async$mapcat_STAR__$_state_machine__26586__auto__ = null;
var cljs$core$async$mapcat_STAR__$_state_machine__26586__auto____0 = (function (){
var statearr_28332 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_28332[(0)] = cljs$core$async$mapcat_STAR__$_state_machine__26586__auto__);

(statearr_28332[(1)] = (1));

return statearr_28332;
});
var cljs$core$async$mapcat_STAR__$_state_machine__26586__auto____1 = (function (state_28296){
while(true){
var ret_value__26587__auto__ = (function (){try{while(true){
var result__26588__auto__ = switch__26585__auto__.call(null,state_28296);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26588__auto__;
}
break;
}
}catch (e28333){if((e28333 instanceof Object)){
var ex__26589__auto__ = e28333;
var statearr_28334_28360 = state_28296;
(statearr_28334_28360[(5)] = ex__26589__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_28296);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e28333;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26587__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__28361 = state_28296;
state_28296 = G__28361;
continue;
} else {
return ret_value__26587__auto__;
}
break;
}
});
cljs$core$async$mapcat_STAR__$_state_machine__26586__auto__ = function(state_28296){
switch(arguments.length){
case 0:
return cljs$core$async$mapcat_STAR__$_state_machine__26586__auto____0.call(this);
case 1:
return cljs$core$async$mapcat_STAR__$_state_machine__26586__auto____1.call(this,state_28296);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mapcat_STAR__$_state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mapcat_STAR__$_state_machine__26586__auto____0;
cljs$core$async$mapcat_STAR__$_state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mapcat_STAR__$_state_machine__26586__auto____1;
return cljs$core$async$mapcat_STAR__$_state_machine__26586__auto__;
})()
})();
var state__26682__auto__ = (function (){var statearr_28335 = f__26681__auto__.call(null);
(statearr_28335[(6)] = c__26680__auto__);

return statearr_28335;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26682__auto__);
}));

return c__26680__auto__;
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_LT_ = (function cljs$core$async$mapcat_LT_(var_args){
var G__28363 = arguments.length;
switch (G__28363) {
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
var G__28366 = arguments.length;
switch (G__28366) {
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
var G__28369 = arguments.length;
switch (G__28369) {
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
var c__26680__auto___28416 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26681__auto__ = (function (){var switch__26585__auto__ = (function (state_28393){
var state_val_28394 = (state_28393[(1)]);
if((state_val_28394 === (7))){
var inst_28388 = (state_28393[(2)]);
var state_28393__$1 = state_28393;
var statearr_28395_28417 = state_28393__$1;
(statearr_28395_28417[(2)] = inst_28388);

(statearr_28395_28417[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28394 === (1))){
var inst_28370 = null;
var state_28393__$1 = (function (){var statearr_28396 = state_28393;
(statearr_28396[(7)] = inst_28370);

return statearr_28396;
})();
var statearr_28397_28418 = state_28393__$1;
(statearr_28397_28418[(2)] = null);

(statearr_28397_28418[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28394 === (4))){
var inst_28373 = (state_28393[(8)]);
var inst_28373__$1 = (state_28393[(2)]);
var inst_28374 = (inst_28373__$1 == null);
var inst_28375 = cljs.core.not.call(null,inst_28374);
var state_28393__$1 = (function (){var statearr_28398 = state_28393;
(statearr_28398[(8)] = inst_28373__$1);

return statearr_28398;
})();
if(inst_28375){
var statearr_28399_28419 = state_28393__$1;
(statearr_28399_28419[(1)] = (5));

} else {
var statearr_28400_28420 = state_28393__$1;
(statearr_28400_28420[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28394 === (6))){
var state_28393__$1 = state_28393;
var statearr_28401_28421 = state_28393__$1;
(statearr_28401_28421[(2)] = null);

(statearr_28401_28421[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28394 === (3))){
var inst_28390 = (state_28393[(2)]);
var inst_28391 = cljs.core.async.close_BANG_.call(null,out);
var state_28393__$1 = (function (){var statearr_28402 = state_28393;
(statearr_28402[(9)] = inst_28390);

return statearr_28402;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_28393__$1,inst_28391);
} else {
if((state_val_28394 === (2))){
var state_28393__$1 = state_28393;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_28393__$1,(4),ch);
} else {
if((state_val_28394 === (11))){
var inst_28373 = (state_28393[(8)]);
var inst_28382 = (state_28393[(2)]);
var inst_28370 = inst_28373;
var state_28393__$1 = (function (){var statearr_28403 = state_28393;
(statearr_28403[(10)] = inst_28382);

(statearr_28403[(7)] = inst_28370);

return statearr_28403;
})();
var statearr_28404_28422 = state_28393__$1;
(statearr_28404_28422[(2)] = null);

(statearr_28404_28422[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28394 === (9))){
var inst_28373 = (state_28393[(8)]);
var state_28393__$1 = state_28393;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_28393__$1,(11),out,inst_28373);
} else {
if((state_val_28394 === (5))){
var inst_28373 = (state_28393[(8)]);
var inst_28370 = (state_28393[(7)]);
var inst_28377 = cljs.core._EQ_.call(null,inst_28373,inst_28370);
var state_28393__$1 = state_28393;
if(inst_28377){
var statearr_28406_28423 = state_28393__$1;
(statearr_28406_28423[(1)] = (8));

} else {
var statearr_28407_28424 = state_28393__$1;
(statearr_28407_28424[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28394 === (10))){
var inst_28385 = (state_28393[(2)]);
var state_28393__$1 = state_28393;
var statearr_28408_28425 = state_28393__$1;
(statearr_28408_28425[(2)] = inst_28385);

(statearr_28408_28425[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28394 === (8))){
var inst_28370 = (state_28393[(7)]);
var tmp28405 = inst_28370;
var inst_28370__$1 = tmp28405;
var state_28393__$1 = (function (){var statearr_28409 = state_28393;
(statearr_28409[(7)] = inst_28370__$1);

return statearr_28409;
})();
var statearr_28410_28426 = state_28393__$1;
(statearr_28410_28426[(2)] = null);

(statearr_28410_28426[(1)] = (2));


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
var cljs$core$async$state_machine__26586__auto__ = null;
var cljs$core$async$state_machine__26586__auto____0 = (function (){
var statearr_28411 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_28411[(0)] = cljs$core$async$state_machine__26586__auto__);

(statearr_28411[(1)] = (1));

return statearr_28411;
});
var cljs$core$async$state_machine__26586__auto____1 = (function (state_28393){
while(true){
var ret_value__26587__auto__ = (function (){try{while(true){
var result__26588__auto__ = switch__26585__auto__.call(null,state_28393);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26588__auto__;
}
break;
}
}catch (e28412){if((e28412 instanceof Object)){
var ex__26589__auto__ = e28412;
var statearr_28413_28427 = state_28393;
(statearr_28413_28427[(5)] = ex__26589__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_28393);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e28412;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26587__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__28428 = state_28393;
state_28393 = G__28428;
continue;
} else {
return ret_value__26587__auto__;
}
break;
}
});
cljs$core$async$state_machine__26586__auto__ = function(state_28393){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__26586__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__26586__auto____1.call(this,state_28393);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__26586__auto____0;
cljs$core$async$state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__26586__auto____1;
return cljs$core$async$state_machine__26586__auto__;
})()
})();
var state__26682__auto__ = (function (){var statearr_28414 = f__26681__auto__.call(null);
(statearr_28414[(6)] = c__26680__auto___28416);

return statearr_28414;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26682__auto__);
}));


return out;
}));

(cljs.core.async.unique.cljs$lang$maxFixedArity = 2);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition = (function cljs$core$async$partition(var_args){
var G__28430 = arguments.length;
switch (G__28430) {
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
var c__26680__auto___28496 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26681__auto__ = (function (){var switch__26585__auto__ = (function (state_28468){
var state_val_28469 = (state_28468[(1)]);
if((state_val_28469 === (7))){
var inst_28464 = (state_28468[(2)]);
var state_28468__$1 = state_28468;
var statearr_28470_28497 = state_28468__$1;
(statearr_28470_28497[(2)] = inst_28464);

(statearr_28470_28497[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28469 === (1))){
var inst_28431 = (new Array(n));
var inst_28432 = inst_28431;
var inst_28433 = (0);
var state_28468__$1 = (function (){var statearr_28471 = state_28468;
(statearr_28471[(7)] = inst_28433);

(statearr_28471[(8)] = inst_28432);

return statearr_28471;
})();
var statearr_28472_28498 = state_28468__$1;
(statearr_28472_28498[(2)] = null);

(statearr_28472_28498[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28469 === (4))){
var inst_28436 = (state_28468[(9)]);
var inst_28436__$1 = (state_28468[(2)]);
var inst_28437 = (inst_28436__$1 == null);
var inst_28438 = cljs.core.not.call(null,inst_28437);
var state_28468__$1 = (function (){var statearr_28473 = state_28468;
(statearr_28473[(9)] = inst_28436__$1);

return statearr_28473;
})();
if(inst_28438){
var statearr_28474_28499 = state_28468__$1;
(statearr_28474_28499[(1)] = (5));

} else {
var statearr_28475_28500 = state_28468__$1;
(statearr_28475_28500[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28469 === (15))){
var inst_28458 = (state_28468[(2)]);
var state_28468__$1 = state_28468;
var statearr_28476_28501 = state_28468__$1;
(statearr_28476_28501[(2)] = inst_28458);

(statearr_28476_28501[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28469 === (13))){
var state_28468__$1 = state_28468;
var statearr_28477_28502 = state_28468__$1;
(statearr_28477_28502[(2)] = null);

(statearr_28477_28502[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28469 === (6))){
var inst_28433 = (state_28468[(7)]);
var inst_28454 = (inst_28433 > (0));
var state_28468__$1 = state_28468;
if(cljs.core.truth_(inst_28454)){
var statearr_28478_28503 = state_28468__$1;
(statearr_28478_28503[(1)] = (12));

} else {
var statearr_28479_28504 = state_28468__$1;
(statearr_28479_28504[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28469 === (3))){
var inst_28466 = (state_28468[(2)]);
var state_28468__$1 = state_28468;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_28468__$1,inst_28466);
} else {
if((state_val_28469 === (12))){
var inst_28432 = (state_28468[(8)]);
var inst_28456 = cljs.core.vec.call(null,inst_28432);
var state_28468__$1 = state_28468;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_28468__$1,(15),out,inst_28456);
} else {
if((state_val_28469 === (2))){
var state_28468__$1 = state_28468;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_28468__$1,(4),ch);
} else {
if((state_val_28469 === (11))){
var inst_28448 = (state_28468[(2)]);
var inst_28449 = (new Array(n));
var inst_28432 = inst_28449;
var inst_28433 = (0);
var state_28468__$1 = (function (){var statearr_28480 = state_28468;
(statearr_28480[(7)] = inst_28433);

(statearr_28480[(8)] = inst_28432);

(statearr_28480[(10)] = inst_28448);

return statearr_28480;
})();
var statearr_28481_28505 = state_28468__$1;
(statearr_28481_28505[(2)] = null);

(statearr_28481_28505[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28469 === (9))){
var inst_28432 = (state_28468[(8)]);
var inst_28446 = cljs.core.vec.call(null,inst_28432);
var state_28468__$1 = state_28468;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_28468__$1,(11),out,inst_28446);
} else {
if((state_val_28469 === (5))){
var inst_28433 = (state_28468[(7)]);
var inst_28432 = (state_28468[(8)]);
var inst_28436 = (state_28468[(9)]);
var inst_28441 = (state_28468[(11)]);
var inst_28440 = (inst_28432[inst_28433] = inst_28436);
var inst_28441__$1 = (inst_28433 + (1));
var inst_28442 = (inst_28441__$1 < n);
var state_28468__$1 = (function (){var statearr_28482 = state_28468;
(statearr_28482[(12)] = inst_28440);

(statearr_28482[(11)] = inst_28441__$1);

return statearr_28482;
})();
if(cljs.core.truth_(inst_28442)){
var statearr_28483_28506 = state_28468__$1;
(statearr_28483_28506[(1)] = (8));

} else {
var statearr_28484_28507 = state_28468__$1;
(statearr_28484_28507[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28469 === (14))){
var inst_28461 = (state_28468[(2)]);
var inst_28462 = cljs.core.async.close_BANG_.call(null,out);
var state_28468__$1 = (function (){var statearr_28486 = state_28468;
(statearr_28486[(13)] = inst_28461);

return statearr_28486;
})();
var statearr_28487_28508 = state_28468__$1;
(statearr_28487_28508[(2)] = inst_28462);

(statearr_28487_28508[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28469 === (10))){
var inst_28452 = (state_28468[(2)]);
var state_28468__$1 = state_28468;
var statearr_28488_28509 = state_28468__$1;
(statearr_28488_28509[(2)] = inst_28452);

(statearr_28488_28509[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28469 === (8))){
var inst_28432 = (state_28468[(8)]);
var inst_28441 = (state_28468[(11)]);
var tmp28485 = inst_28432;
var inst_28432__$1 = tmp28485;
var inst_28433 = inst_28441;
var state_28468__$1 = (function (){var statearr_28489 = state_28468;
(statearr_28489[(7)] = inst_28433);

(statearr_28489[(8)] = inst_28432__$1);

return statearr_28489;
})();
var statearr_28490_28510 = state_28468__$1;
(statearr_28490_28510[(2)] = null);

(statearr_28490_28510[(1)] = (2));


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
var cljs$core$async$state_machine__26586__auto__ = null;
var cljs$core$async$state_machine__26586__auto____0 = (function (){
var statearr_28491 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_28491[(0)] = cljs$core$async$state_machine__26586__auto__);

(statearr_28491[(1)] = (1));

return statearr_28491;
});
var cljs$core$async$state_machine__26586__auto____1 = (function (state_28468){
while(true){
var ret_value__26587__auto__ = (function (){try{while(true){
var result__26588__auto__ = switch__26585__auto__.call(null,state_28468);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26588__auto__;
}
break;
}
}catch (e28492){if((e28492 instanceof Object)){
var ex__26589__auto__ = e28492;
var statearr_28493_28511 = state_28468;
(statearr_28493_28511[(5)] = ex__26589__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_28468);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e28492;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26587__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__28512 = state_28468;
state_28468 = G__28512;
continue;
} else {
return ret_value__26587__auto__;
}
break;
}
});
cljs$core$async$state_machine__26586__auto__ = function(state_28468){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__26586__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__26586__auto____1.call(this,state_28468);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__26586__auto____0;
cljs$core$async$state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__26586__auto____1;
return cljs$core$async$state_machine__26586__auto__;
})()
})();
var state__26682__auto__ = (function (){var statearr_28494 = f__26681__auto__.call(null);
(statearr_28494[(6)] = c__26680__auto___28496);

return statearr_28494;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26682__auto__);
}));


return out;
}));

(cljs.core.async.partition.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition_by = (function cljs$core$async$partition_by(var_args){
var G__28514 = arguments.length;
switch (G__28514) {
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
var c__26680__auto___28584 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26681__auto__ = (function (){var switch__26585__auto__ = (function (state_28556){
var state_val_28557 = (state_28556[(1)]);
if((state_val_28557 === (7))){
var inst_28552 = (state_28556[(2)]);
var state_28556__$1 = state_28556;
var statearr_28558_28585 = state_28556__$1;
(statearr_28558_28585[(2)] = inst_28552);

(statearr_28558_28585[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28557 === (1))){
var inst_28515 = [];
var inst_28516 = inst_28515;
var inst_28517 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123);
var state_28556__$1 = (function (){var statearr_28559 = state_28556;
(statearr_28559[(7)] = inst_28517);

(statearr_28559[(8)] = inst_28516);

return statearr_28559;
})();
var statearr_28560_28586 = state_28556__$1;
(statearr_28560_28586[(2)] = null);

(statearr_28560_28586[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28557 === (4))){
var inst_28520 = (state_28556[(9)]);
var inst_28520__$1 = (state_28556[(2)]);
var inst_28521 = (inst_28520__$1 == null);
var inst_28522 = cljs.core.not.call(null,inst_28521);
var state_28556__$1 = (function (){var statearr_28561 = state_28556;
(statearr_28561[(9)] = inst_28520__$1);

return statearr_28561;
})();
if(inst_28522){
var statearr_28562_28587 = state_28556__$1;
(statearr_28562_28587[(1)] = (5));

} else {
var statearr_28563_28588 = state_28556__$1;
(statearr_28563_28588[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28557 === (15))){
var inst_28546 = (state_28556[(2)]);
var state_28556__$1 = state_28556;
var statearr_28564_28589 = state_28556__$1;
(statearr_28564_28589[(2)] = inst_28546);

(statearr_28564_28589[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28557 === (13))){
var state_28556__$1 = state_28556;
var statearr_28565_28590 = state_28556__$1;
(statearr_28565_28590[(2)] = null);

(statearr_28565_28590[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28557 === (6))){
var inst_28516 = (state_28556[(8)]);
var inst_28541 = inst_28516.length;
var inst_28542 = (inst_28541 > (0));
var state_28556__$1 = state_28556;
if(cljs.core.truth_(inst_28542)){
var statearr_28566_28591 = state_28556__$1;
(statearr_28566_28591[(1)] = (12));

} else {
var statearr_28567_28592 = state_28556__$1;
(statearr_28567_28592[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28557 === (3))){
var inst_28554 = (state_28556[(2)]);
var state_28556__$1 = state_28556;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_28556__$1,inst_28554);
} else {
if((state_val_28557 === (12))){
var inst_28516 = (state_28556[(8)]);
var inst_28544 = cljs.core.vec.call(null,inst_28516);
var state_28556__$1 = state_28556;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_28556__$1,(15),out,inst_28544);
} else {
if((state_val_28557 === (2))){
var state_28556__$1 = state_28556;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_28556__$1,(4),ch);
} else {
if((state_val_28557 === (11))){
var inst_28520 = (state_28556[(9)]);
var inst_28524 = (state_28556[(10)]);
var inst_28534 = (state_28556[(2)]);
var inst_28535 = [];
var inst_28536 = inst_28535.push(inst_28520);
var inst_28516 = inst_28535;
var inst_28517 = inst_28524;
var state_28556__$1 = (function (){var statearr_28568 = state_28556;
(statearr_28568[(11)] = inst_28534);

(statearr_28568[(7)] = inst_28517);

(statearr_28568[(8)] = inst_28516);

(statearr_28568[(12)] = inst_28536);

return statearr_28568;
})();
var statearr_28569_28593 = state_28556__$1;
(statearr_28569_28593[(2)] = null);

(statearr_28569_28593[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28557 === (9))){
var inst_28516 = (state_28556[(8)]);
var inst_28532 = cljs.core.vec.call(null,inst_28516);
var state_28556__$1 = state_28556;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_28556__$1,(11),out,inst_28532);
} else {
if((state_val_28557 === (5))){
var inst_28520 = (state_28556[(9)]);
var inst_28524 = (state_28556[(10)]);
var inst_28517 = (state_28556[(7)]);
var inst_28524__$1 = f.call(null,inst_28520);
var inst_28525 = cljs.core._EQ_.call(null,inst_28524__$1,inst_28517);
var inst_28526 = cljs.core.keyword_identical_QMARK_.call(null,inst_28517,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123));
var inst_28527 = ((inst_28525) || (inst_28526));
var state_28556__$1 = (function (){var statearr_28570 = state_28556;
(statearr_28570[(10)] = inst_28524__$1);

return statearr_28570;
})();
if(cljs.core.truth_(inst_28527)){
var statearr_28571_28594 = state_28556__$1;
(statearr_28571_28594[(1)] = (8));

} else {
var statearr_28572_28595 = state_28556__$1;
(statearr_28572_28595[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28557 === (14))){
var inst_28549 = (state_28556[(2)]);
var inst_28550 = cljs.core.async.close_BANG_.call(null,out);
var state_28556__$1 = (function (){var statearr_28574 = state_28556;
(statearr_28574[(13)] = inst_28549);

return statearr_28574;
})();
var statearr_28575_28596 = state_28556__$1;
(statearr_28575_28596[(2)] = inst_28550);

(statearr_28575_28596[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28557 === (10))){
var inst_28539 = (state_28556[(2)]);
var state_28556__$1 = state_28556;
var statearr_28576_28597 = state_28556__$1;
(statearr_28576_28597[(2)] = inst_28539);

(statearr_28576_28597[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28557 === (8))){
var inst_28520 = (state_28556[(9)]);
var inst_28524 = (state_28556[(10)]);
var inst_28516 = (state_28556[(8)]);
var inst_28529 = inst_28516.push(inst_28520);
var tmp28573 = inst_28516;
var inst_28516__$1 = tmp28573;
var inst_28517 = inst_28524;
var state_28556__$1 = (function (){var statearr_28577 = state_28556;
(statearr_28577[(14)] = inst_28529);

(statearr_28577[(7)] = inst_28517);

(statearr_28577[(8)] = inst_28516__$1);

return statearr_28577;
})();
var statearr_28578_28598 = state_28556__$1;
(statearr_28578_28598[(2)] = null);

(statearr_28578_28598[(1)] = (2));


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
var cljs$core$async$state_machine__26586__auto__ = null;
var cljs$core$async$state_machine__26586__auto____0 = (function (){
var statearr_28579 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_28579[(0)] = cljs$core$async$state_machine__26586__auto__);

(statearr_28579[(1)] = (1));

return statearr_28579;
});
var cljs$core$async$state_machine__26586__auto____1 = (function (state_28556){
while(true){
var ret_value__26587__auto__ = (function (){try{while(true){
var result__26588__auto__ = switch__26585__auto__.call(null,state_28556);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26588__auto__;
}
break;
}
}catch (e28580){if((e28580 instanceof Object)){
var ex__26589__auto__ = e28580;
var statearr_28581_28599 = state_28556;
(statearr_28581_28599[(5)] = ex__26589__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_28556);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e28580;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26587__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__28600 = state_28556;
state_28556 = G__28600;
continue;
} else {
return ret_value__26587__auto__;
}
break;
}
});
cljs$core$async$state_machine__26586__auto__ = function(state_28556){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__26586__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__26586__auto____1.call(this,state_28556);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__26586__auto____0;
cljs$core$async$state_machine__26586__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__26586__auto____1;
return cljs$core$async$state_machine__26586__auto__;
})()
})();
var state__26682__auto__ = (function (){var statearr_28582 = f__26681__auto__.call(null);
(statearr_28582[(6)] = c__26680__auto___28584);

return statearr_28582;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26682__auto__);
}));


return out;
}));

(cljs.core.async.partition_by.cljs$lang$maxFixedArity = 3);


//# sourceMappingURL=async.js.map?rel=1587041651298
