// Compiled by ClojureScript 1.10.597 {}
goog.provide('tri_survey2.core');
goog.require('cljs.core');
goog.require('reagent.core');
goog.require('free_form.core');
goog.require('reagent.dom');
goog.require('free_form.bootstrap_3');
goog.require('cljs_http.client');
goog.require('cljs.core.async');
goog.require('cemerick.url');
tri_survey2.core.on_js_reload = (function tri_survey2$core$on_js_reload(){
return null;
});
cljs.core.enable_console_print_BANG_.call(null);
tri_survey2.core.data = reagent.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"service","service",-1963054559),cljs.core.vals.call(null,cemerick.url.url.call(null,window.location.href).query),new cljs.core.Keyword(null,"submitted","submitted",-131658962),false,new cljs.core.Keyword(null,"tri-element-width","tri-element-width",-1578020988),(function (){var x__4276__auto__ = (250);
var y__4277__auto__ = ((window.innerWidth / (3)) | (0));
return ((x__4276__auto__ < y__4277__auto__) ? x__4276__auto__ : y__4277__auto__);
})()], null));
tri_survey2.core.texts = cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"analyze1","analyze1",-1303462976),new cljs.core.Keyword(null,"service","service",-1963054559),new cljs.core.Keyword(null,"validation-error","validation-error",1040492454),new cljs.core.Keyword(null,"micronarrative1","micronarrative1",-395018425),new cljs.core.Keyword(null,"free","free",801364328),new cljs.core.Keyword(null,"micronarrative2","micronarrative2",-1599970328),new cljs.core.Keyword(null,"application-placeholder","application-placeholder",-1992627158),new cljs.core.Keyword(null,"micro-placeholder","micro-placeholder",2140938954),new cljs.core.Keyword(null,"thank-you","thank-you",-1096552758),new cljs.core.Keyword(null,"favorite-service-question","favorite-service-question",-1467206740),new cljs.core.Keyword(null,"gender-options","gender-options",-126992436),new cljs.core.Keyword(null,"send-label","send-label",-381931090),new cljs.core.Keyword(null,"free-placeholder","free-placeholder",1871701550),new cljs.core.Keyword(null,"analyze2","analyze2",-1164429521),new cljs.core.Keyword(null,"triad-top","triad-top",1340330226),new cljs.core.Keyword(null,"triad-right","triad-right",-266791662),new cljs.core.Keyword(null,"birthyear-label","birthyear-label",2096184148),new cljs.core.Keyword(null,"main-header","main-header",1880318390),new cljs.core.Keyword(null,"application-label","application-label",233871031),new cljs.core.Keyword(null,"triad-left","triad-left",-1216552807),new cljs.core.Keyword(null,"gender-label","gender-label",1531834426),new cljs.core.Keyword(null,"contact","contact",609093372),new cljs.core.Keyword(null,"contact-placeholder","contact-placeholder",81524541)],["2. Lue, mieti ja analysoi kuvaustasi yll\u00E4, ja aseta sen valossa kolmion sis\u00E4lle piste suhteessa kolmion kulmissa mainittuihin piirteisiin* Lue, mieti ja analysoi kuvaustasi yll\u00E4. Jos mielest\u00E4si kaksi piirrett\u00E4 on yht\u00E4 hyvi\u00E4/huonoija aseta piste niiden keskele. Painota alla olevia m\u00E4\u00E4reit\u00E4 kirjoittamasi kuvauksen mukaisesti ja suhteessa toisiinsa.","Tarkasteltava palvelu:","Vastaa ja t\u00E4yt\u00E4 kaikkiin t\u00E4hdell\u00E4 merkityttyihin kohtiin","1. Kuvittele, ett\u00E4 keskustelet kollegasi kanssa infoanimaatiosta. H\u00E4n ei ole aikaisemmin kokeillut sellaista. Mieti hetken ja kuvaa h\u00E4nelle lyhyesti ja totuudenmukaisesti sek\u00E4 palvelun HYVI\u00C4 ett\u00E4 HUONOJA puolia.*","3. Vapaa palaute","4. Kerro nyt yst\u00E4v\u00E4llesi suosikkipalvelustasi. H\u00E4n ei ole koskaan kokeillut sit\u00E4. Kuvaa h\u00E4nelle lyhyesti sek\u00E4 palvelun HYVI\u00C4 ett\u00E4 HUONOJA puolia*","Sovelluksen nimi","Kuvaa t\u00E4h\u00E4n","Kiitoksia, ett\u00E4 osallistuit kyselyyn!","Mik\u00E4 verkkopalvelu tai mobiilisovellus on suosikkisi (mainitse yksi)*",new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"choose","choose",1680203305),"Valitse t\u00E4st\u00E4",new cljs.core.Keyword(null,"not-available","not-available",2093282933),"En halua sanoa",new cljs.core.Keyword(null,"female","female",1810186049),"Nainen",new cljs.core.Keyword(null,"male","male",-560253338),"Mies",new cljs.core.Keyword(null,"other","other",995793544),"Muu"], null),"L\u00E4het\u00E4","Kirjoita vapaa palaute t\u00E4h\u00E4n","6. Analysoi kuvaustasi yll\u00E4, ja aseta sen valossa kolmion sis\u00E4lle piste suhteessa kolmion kulmissa mainittuihin piirteisiin*","Wow! Innovatiivinen ja innostava","Paljon parannettavaa","8. Syntym\u00E4vuosi*","Yle ja el\u00E4m\u00E4 infoanimaatio","3. Sovellus","Toimiva ja vaivaton","9. Sukupuoli*","4. Nimi, rooli ja tiimi","Nimi, rooli, tiimi"]);
/**
 * Updating width in order to enable responsivity of the triangle
 */
tri_survey2.core.window_resize_handler = (function tri_survey2$core$window_resize_handler(event){
var w = (function (){var x__4276__auto__ = (250);
var y__4277__auto__ = ((window.innerWidth / (3)) | (0));
return ((x__4276__auto__ < y__4277__auto__) ? x__4276__auto__ : y__4277__auto__);
})();
return cljs.core.swap_BANG_.call(null,tri_survey2.core.data,cljs.core.assoc,new cljs.core.Keyword(null,"tri-element-width","tri-element-width",-1578020988),w);
});
tri_survey2.core.make_remote_call = (function tri_survey2$core$make_remote_call(endpoint){
var c__26681__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,(function (){
var f__26682__auto__ = (function (){var switch__26586__auto__ = (function (state_29764){
var state_val_29765 = (state_29764[(1)]);
if((state_val_29765 === (1))){
var inst_29755 = [new cljs.core.Keyword(null,"with-credentials?","with-credentials?",-1773202222)];
var inst_29756 = [false];
var inst_29757 = cljs.core.PersistentHashMap.fromArrays(inst_29755,inst_29756);
var inst_29758 = cljs_http.client.get.call(null,endpoint,inst_29757);
var state_29764__$1 = state_29764;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_29764__$1,(2),inst_29758);
} else {
if((state_val_29765 === (2))){
var inst_29760 = (state_29764[(2)]);
var inst_29761 = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(inst_29760);
var inst_29762 = console.log(inst_29761);
var state_29764__$1 = state_29764;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_29764__$1,inst_29762);
} else {
return null;
}
}
});
return (function() {
var tri_survey2$core$make_remote_call_$_state_machine__26587__auto__ = null;
var tri_survey2$core$make_remote_call_$_state_machine__26587__auto____0 = (function (){
var statearr_29766 = [null,null,null,null,null,null,null];
(statearr_29766[(0)] = tri_survey2$core$make_remote_call_$_state_machine__26587__auto__);

(statearr_29766[(1)] = (1));

return statearr_29766;
});
var tri_survey2$core$make_remote_call_$_state_machine__26587__auto____1 = (function (state_29764){
while(true){
var ret_value__26588__auto__ = (function (){try{while(true){
var result__26589__auto__ = switch__26586__auto__.call(null,state_29764);
if(cljs.core.keyword_identical_QMARK_.call(null,result__26589__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__26589__auto__;
}
break;
}
}catch (e29767){if((e29767 instanceof Object)){
var ex__26590__auto__ = e29767;
var statearr_29768_29770 = state_29764;
(statearr_29768_29770[(5)] = ex__26590__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_29764);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e29767;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__26588__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__29771 = state_29764;
state_29764 = G__29771;
continue;
} else {
return ret_value__26588__auto__;
}
break;
}
});
tri_survey2$core$make_remote_call_$_state_machine__26587__auto__ = function(state_29764){
switch(arguments.length){
case 0:
return tri_survey2$core$make_remote_call_$_state_machine__26587__auto____0.call(this);
case 1:
return tri_survey2$core$make_remote_call_$_state_machine__26587__auto____1.call(this,state_29764);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
tri_survey2$core$make_remote_call_$_state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$0 = tri_survey2$core$make_remote_call_$_state_machine__26587__auto____0;
tri_survey2$core$make_remote_call_$_state_machine__26587__auto__.cljs$core$IFn$_invoke$arity$1 = tri_survey2$core$make_remote_call_$_state_machine__26587__auto____1;
return tri_survey2$core$make_remote_call_$_state_machine__26587__auto__;
})()
})();
var state__26683__auto__ = (function (){var statearr_29769 = f__26682__auto__.call(null);
(statearr_29769[(6)] = c__26681__auto__);

return statearr_29769;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__26683__auto__);
}));

return c__26681__auto__;
});
/**
 * Helper function for validation function.
 *   False if a field is empty
 */
tri_survey2.core.submitted_QMARK_ = (function tri_survey2$core$submitted_QMARK_(k,x){
return (!((k.call(null,x) == null)));
});
/**
 * Simple validation to allow posting an entry,
 *   goes through all required fields
 */
tri_survey2.core.validate_submission = (function tri_survey2$core$validate_submission(){
var submission = cljs.core.deref.call(null,tri_survey2.core.data);
var and__4174__auto__ = cljs.core.reduce.call(null,(function (p1__29772_SHARP_,p2__29773_SHARP_){
var and__4174__auto__ = p1__29772_SHARP_;
if(cljs.core.truth_(and__4174__auto__)){
return p2__29773_SHARP_;
} else {
return and__4174__auto__;
}
}),cljs.core.map.call(null,(function (p1__29774_SHARP_){
return tri_survey2.core.submitted_QMARK_.call(null,p1__29774_SHARP_,submission);
}),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"micronarrative1","micronarrative1",-395018425),new cljs.core.Keyword(null,"triad-values1","triad-values1",-967686863)], null)));
if(cljs.core.truth_(and__4174__auto__)){
return (((!(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"birthyear","birthyear",356764915).cljs$core$IFn$_invoke$arity$1(submission),cljs.core.second.call(null,new cljs.core.Keyword(null,"gender-options","gender-options",-126992436).cljs$core$IFn$_invoke$arity$1(tri_survey2.core.texts)))))) && ((!(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"gender","gender",-733930727).cljs$core$IFn$_invoke$arity$1(submission),cljs.core.second.call(null,new cljs.core.Keyword(null,"gender-options","gender-options",-126992436).cljs$core$IFn$_invoke$arity$1(tri_survey2.core.texts)))))));
} else {
return and__4174__auto__;
}
});
tri_survey2.core.format_entry = (function tri_survey2$core$format_entry(entry){
var vec__29775 = new cljs.core.Keyword(null,"triad-values1","triad-values1",-967686863).cljs$core$IFn$_invoke$arity$1(entry);
var t1v1 = cljs.core.nth.call(null,vec__29775,(0),null);
var t1v2 = cljs.core.nth.call(null,vec__29775,(1),null);
var t1v3 = cljs.core.nth.call(null,vec__29775,(2),null);
var vec__29778 = new cljs.core.Keyword(null,"triad-values2","triad-values2",-1528117107).cljs$core$IFn$_invoke$arity$1(entry);
var t2v1 = cljs.core.nth.call(null,vec__29778,(0),null);
var t2v2 = cljs.core.nth.call(null,vec__29778,(1),null);
var t2v3 = cljs.core.nth.call(null,vec__29778,(2),null);
return cljs.core.assoc.call(null,entry,new cljs.core.Keyword(null,"triad1value1","triad1value1",1562273067),t1v1,new cljs.core.Keyword(null,"triad1value2","triad1value2",2056265149),t1v2,new cljs.core.Keyword(null,"triad1value3","triad1value3",1519522730),t1v3,new cljs.core.Keyword(null,"triad2value1","triad2value1",993973309),t2v1,new cljs.core.Keyword(null,"triad2value2","triad2value2",1215076385),t2v2,new cljs.core.Keyword(null,"triad2value3","triad2value3",189925475),t2v3);
});
/**
 * Data collected 'serverless', submits to Google Docs
 */
tri_survey2.core.submit = (function tri_survey2$core$submit(entry){
if(cljs.core.truth_(tri_survey2.core.validate_submission.call(null))){
tri_survey2.core.make_remote_call.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.assoc.call(null,cemerick.url.url.call(null,"https://script.google.com/macros/s/AKfycbwWx934JElNYwoyLuFoMKVGC85WXnQjPcZ12bdw2Sx_5_6fJ2P3/exec"),new cljs.core.Keyword(null,"query","query",-1288509510),tri_survey2.core.format_entry.call(null,entry))));

return cljs.core.swap_BANG_.call(null,tri_survey2.core.data,cljs.core.assoc,new cljs.core.Keyword(null,"submitted","submitted",-131658962),true);
} else {
return cljs.core.swap_BANG_.call(null,tri_survey2.core.data,cljs.core.assoc,new cljs.core.Keyword(null,"validation-error","validation-error",1040492454),true);

}
});
/**
 * Helper function to figure out geometrics of the triangle.
 *   Calculates the triangle height based on the side length
 */
tri_survey2.core.tri_height = (function tri_survey2$core$tri_height(size){
return Math.sqrt(((size * size) - ((size / (2)) * (size / (2)))));
});
/**
 * Needed to build the triangle svg. Generates path coordinates
 *   based on triangle size (side lenght)
 */
tri_survey2.core.tri_path_values = (function tri_survey2$core$tri_path_values(size){
var tx = (size / (2));
var ty = (0);
var lx = (size * (0));
var ly = tri_survey2.core.tri_height.call(null,size);
var rx = (size * (1));
var ry = tri_survey2.core.tri_height.call(null,size);
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [tx,ty,lx,ly,rx,ry,null], null);
});
/**
 * To quantify the triad measurement with respect to
 *   the corners. Calculates size for element containing triangle
 */
tri_survey2.core.tri_element_size = (function tri_survey2$core$tri_element_size(size){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"width","width",-384071477),(Math.round(size) * (1)),new cljs.core.Keyword(null,"height","height",1025178622),Math.ceil((size * .95))], null);
});
/**
 * Generate path string for svg
 */
tri_survey2.core.tri_path_string = (function tri_survey2$core$tri_path_string(coll){
var svg_path = new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, ["M"," "," L"," "," L"," "," Z"], null);
return cljs.core.apply.call(null,cljs.core.str,cljs.core.interleave.call(null,svg_path,coll));
});
/**
 * Helper function to calculate distances. Calculates
 *   line slope and incercept from two points
 *   line: y = mx + b
 */
tri_survey2.core.get_slope_intercept = (function tri_survey2$core$get_slope_intercept(p__29781){
var vec__29782 = p__29781;
var x1 = cljs.core.nth.call(null,vec__29782,(0),null);
var y1 = cljs.core.nth.call(null,vec__29782,(1),null);
var x2 = cljs.core.nth.call(null,vec__29782,(2),null);
var y2 = cljs.core.nth.call(null,vec__29782,(3),null);
var m = ((y2 - y1) / (x2 - x1));
var b = (y1 - (m * x1));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [m,b], null);
});
/**
 * Moves the point inside triad when user clicks outside
 */
tri_survey2.core.move_inside = (function tri_survey2$core$move_inside(p__29785,p__29786){
var vec__29787 = p__29785;
var x = cljs.core.nth.call(null,vec__29787,(0),null);
var y = cljs.core.nth.call(null,vec__29787,(1),null);
var vec__29790 = p__29786;
var tx = cljs.core.nth.call(null,vec__29790,(0),null);
var ty = cljs.core.nth.call(null,vec__29790,(1),null);
var lx = cljs.core.nth.call(null,vec__29790,(2),null);
var ly = cljs.core.nth.call(null,vec__29790,(3),null);
var rx = cljs.core.nth.call(null,vec__29790,(4),null);
var ry = cljs.core.nth.call(null,vec__29790,(5),null);
var vec__29793 = tri_survey2.core.get_slope_intercept.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [tx,ty,lx,ly], null));
var m1 = cljs.core.nth.call(null,vec__29793,(0),null);
var b1 = cljs.core.nth.call(null,vec__29793,(1),null);
var vec__29796 = tri_survey2.core.get_slope_intercept.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [tx,ty,rx,ry], null));
var m2 = cljs.core.nth.call(null,vec__29796,(0),null);
var b2 = cljs.core.nth.call(null,vec__29796,(1),null);
var boundry_x1 = ((y - b1) / m1);
var boundry_x2 = ((y - b2) / m2);
var new_x = (((x < boundry_x1))?boundry_x1:(((x > boundry_x2))?boundry_x2:x
));
var new_y = (((y < ty))?ty:(((y > ry))?ry:y
));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new_x | (0)),(new_y | (0))], null);
});
/**
 * Cause i can...
 */
tri_survey2.core.abs = (function tri_survey2$core$abs(n){
var x__4273__auto__ = n;
var y__4274__auto__ = (- n);
return ((x__4273__auto__ > y__4274__auto__) ? x__4273__auto__ : y__4274__auto__);
});
/**
 * Calculate point distance from the triad side
 *   pos  X Y
 *   line y = mx + b
 * 
 *   mx + -1y + b = 0
 *   Ax +  By + C = 0
 *   
 *     |AX + BY + C|
 *   d = ---------------
 *    sqrt(A^2 + B^2)
 */
tri_survey2.core.distance = (function tri_survey2$core$distance(p__29799,m,b,size){
var vec__29800 = p__29799;
var x = cljs.core.nth.call(null,vec__29800,(0),null);
var y = cljs.core.nth.call(null,vec__29800,(1),null);
return (((100) * ((tri_survey2.core.abs.call(null,(((m * x) + ((-1) * y)) + b)) / Math.sqrt(((m * m) + (1)))) / size)) | (0));
});
/**
 * To quantify the three dimensions / corner
 *   values within the triad.
 */
tri_survey2.core.get_distances = (function tri_survey2$core$get_distances(pos,p__29803){
var vec__29804 = p__29803;
var tx = cljs.core.nth.call(null,vec__29804,(0),null);
var ty = cljs.core.nth.call(null,vec__29804,(1),null);
var lx = cljs.core.nth.call(null,vec__29804,(2),null);
var ly = cljs.core.nth.call(null,vec__29804,(3),null);
var rx = cljs.core.nth.call(null,vec__29804,(4),null);
var ry = cljs.core.nth.call(null,vec__29804,(5),null);
var vec__29807 = pos;
var x = cljs.core.nth.call(null,vec__29807,(0),null);
var y = cljs.core.nth.call(null,vec__29807,(1),null);
var vec__29810 = tri_survey2.core.get_slope_intercept.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [tx,ty,lx,ly], null));
var m1 = cljs.core.nth.call(null,vec__29810,(0),null);
var b1 = cljs.core.nth.call(null,vec__29810,(1),null);
var vec__29813 = tri_survey2.core.get_slope_intercept.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [tx,ty,rx,ry], null));
var m2 = cljs.core.nth.call(null,vec__29813,(0),null);
var b2 = cljs.core.nth.call(null,vec__29813,(1),null);
var m3 = (0);
var b3 = ly;
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(tri_survey2.core.distance.call(null,pos,m1,b1,ly) / (1)),(tri_survey2.core.distance.call(null,pos,m2,b2,ly) / (1)),(tri_survey2.core.distance.call(null,pos,m3,b3,ly) / (1))], null);
});
/**
 * Mouse position in element to calculate triad point entry
 */
tri_survey2.core.position = (function tri_survey2$core$position(e){
var rect = e.target.getBoundingClientRect();
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(e.clientX - rect.left),(e.clientY - rect.top)], null);
});
/**
 * Helper function to update triad values
 */
tri_survey2.core.update_point = (function tri_survey2$core$update_point(data,e,size,pos,triad_values,triad){
return cljs.core.assoc.call(null,data,pos,tri_survey2.core.move_inside.call(null,tri_survey2.core.position.call(null,e),tri_survey2.core.tri_path_values.call(null,size)),triad_values,tri_survey2.core.get_distances.call(null,tri_survey2.core.move_inside.call(null,tri_survey2.core.position.call(null,e),tri_survey2.core.tri_path_values.call(null,size)),tri_survey2.core.tri_path_values.call(null,size)),triad,true);
});
tri_survey2.core.build_triangle = (function tri_survey2$core$build_triangle(p__29816,visible,size,attrs){
var vec__29817 = p__29816;
var x = cljs.core.nth.call(null,vec__29817,(0),null);
var y = cljs.core.nth.call(null,vec__29817,(1),null);
var vec__29820 = tri_survey2.core.tri_path_values.call(null,size);
var tx = cljs.core.nth.call(null,vec__29820,(0),null);
var _ = cljs.core.nth.call(null,vec__29820,(1),null);
var ly = cljs.core.nth.call(null,vec__29820,(2),null);
var ___$1 = cljs.core.nth.call(null,vec__29820,(3),null);
var ___$2 = cljs.core.nth.call(null,vec__29820,(4),null);
var ___$3 = cljs.core.nth.call(null,vec__29820,(5),null);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.triangle","div.triangle",1701038841),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"triad-top","triad-top",1340330226).cljs$core$IFn$_invoke$arity$1(tri_survey2.core.texts)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"svg.svg-style","svg.svg-style",-166282104),cljs.core.merge_with.call(null,cljs.core.merge,attrs,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"width","width",-384071477),new cljs.core.Keyword(null,"width","width",-384071477).cljs$core$IFn$_invoke$arity$1(tri_survey2.core.tri_element_size.call(null,size)),new cljs.core.Keyword(null,"height","height",1025178622),new cljs.core.Keyword(null,"height","height",1025178622).cljs$core$IFn$_invoke$arity$1(tri_survey2.core.tri_element_size.call(null,size))], null)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"path","path",-188191168),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"d","d",1972142424),tri_survey2.core.tri_path_string.call(null,tri_survey2.core.tri_path_values.call(null,size))], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"opacity","opacity",397153780),((visible === true)?(100):(0))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"circle","circle",1903212362),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"id","id",-1388402092),"point1",new cljs.core.Keyword(null,"cx","cx",1272694324),x,new cljs.core.Keyword(null,"cy","cy",755331060),y,new cljs.core.Keyword(null,"r","r",-471384190),(3)], null)], null)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"clear","clear",1877104959),"both"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"top","top",-1856271961),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(ly),"px"].join(''),new cljs.core.Keyword(null,"left","left",-399115937),[cljs.core.str.cljs$core$IFn$_invoke$arity$1((- tx)),"px"].join('')], null)], null),new cljs.core.Keyword(null,"triad-left","triad-left",-1216552807).cljs$core$IFn$_invoke$arity$1(tri_survey2.core.texts)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"top","top",-1856271961),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(ly),"px"].join(''),new cljs.core.Keyword(null,"left","left",-399115937),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(tx),"px"].join('')], null)], null),new cljs.core.Keyword(null,"triad-right","triad-right",-266791662).cljs$core$IFn$_invoke$arity$1(tri_survey2.core.texts)], null)], null)], null);
});
tri_survey2.core.micronarrative_element = (function tri_survey2$core$micronarrative_element(k){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("free-form","field","free-form/field",-703377161),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"textarea","textarea",-650375824),new cljs.core.Keyword(null,"key","key",-1516042587),k,new cljs.core.Keyword(null,"label","label",1718410804),k.call(null,tri_survey2.core.texts),new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),new cljs.core.Keyword(null,"micro-placeholder","micro-placeholder",2140938954).cljs$core$IFn$_invoke$arity$1(tri_survey2.core.texts)], null)], null);
});
tri_survey2.core.triad_element = (function tri_survey2$core$triad_element(app_state,size,analyze,pos,triad_values,triad){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1718410804),analyze.call(null,tri_survey2.core.texts)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [tri_survey2.core.build_triangle,pos.call(null,app_state),triad.call(null,app_state),size,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (e){
return cljs.core.swap_BANG_.call(null,tri_survey2.core.data,tri_survey2.core.update_point,e,size,pos,triad_values,triad);
})], null)], null)], null)], null);
});
tri_survey2.core.favorite_app_element = (function tri_survey2$core$favorite_app_element(){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),new cljs.core.Keyword(null,"favorite-service-question","favorite-service-question",-1467206740).cljs$core$IFn$_invoke$arity$1(tri_survey2.core.texts)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("free-form","field","free-form/field",-703377161),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"text","text",-1790561697),new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"fave-app","fave-app",1128859679),new cljs.core.Keyword(null,"label","label",1718410804),new cljs.core.Keyword(null,"application-label","application-label",233871031).cljs$core$IFn$_invoke$arity$1(tri_survey2.core.texts),new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),new cljs.core.Keyword(null,"application-placeholder","application-placeholder",-1992627158).cljs$core$IFn$_invoke$arity$1(tri_survey2.core.texts)], null)], null)], null);
});
tri_survey2.core.other_feedback_element = (function tri_survey2$core$other_feedback_element(){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("free-form","field","free-form/field",-703377161),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"textarea","textarea",-650375824),new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"other-feedback","other-feedback",-1829599934),new cljs.core.Keyword(null,"label","label",1718410804),new cljs.core.Keyword(null,"free","free",801364328).cljs$core$IFn$_invoke$arity$1(tri_survey2.core.texts),new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),new cljs.core.Keyword(null,"free-placeholder","free-placeholder",1871701550).cljs$core$IFn$_invoke$arity$1(tri_survey2.core.texts)], null)], null);
});
tri_survey2.core.contact_element = (function tri_survey2$core$contact_element(){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("free-form","field","free-form/field",-703377161),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"text","text",-1790561697),new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"contact","contact",609093372),new cljs.core.Keyword(null,"label","label",1718410804),new cljs.core.Keyword(null,"contact","contact",609093372).cljs$core$IFn$_invoke$arity$1(tri_survey2.core.texts),new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),new cljs.core.Keyword(null,"contact-placeholder","contact-placeholder",81524541).cljs$core$IFn$_invoke$arity$1(tri_survey2.core.texts)], null)], null);
});
tri_survey2.core.render_years_list = (function tri_survey2$core$render_years_list(){
return cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Keyword(null,"choose","choose",1680203305),(new cljs.core.List(null,cljs.core.second.call(null,new cljs.core.Keyword(null,"gender-options","gender-options",-126992436).cljs$core$IFn$_invoke$arity$1(tri_survey2.core.texts)),null,(1),null)),(2),null)),cljs.core.interleave.call(null,cljs.core.map.call(null,(function (p1__29823_SHARP_){
return cljs.core.keyword.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__29823_SHARP_));
}),cljs.core.range.call(null,(2015),(1900),(-1))),cljs.core.map.call(null,cljs.core.str,cljs.core.range.call(null,(2015),(1900),(-1)))));
});
tri_survey2.core.birth_year_element = (function tri_survey2$core$birth_year_element(){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("free-form","field","free-form/field",-703377161),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"select","select",1147833503),new cljs.core.Keyword(null,"label","label",1718410804),new cljs.core.Keyword(null,"birthyear-label","birthyear-label",2096184148).cljs$core$IFn$_invoke$arity$1(tri_survey2.core.texts),new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"birthyear","birthyear",356764915),new cljs.core.Keyword(null,"options","options",99638489),tri_survey2.core.render_years_list.call(null)], null)], null);
});
tri_survey2.core.gender_element = (function tri_survey2$core$gender_element(){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("free-form","field","free-form/field",-703377161),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"select","select",1147833503),new cljs.core.Keyword(null,"label","label",1718410804),new cljs.core.Keyword(null,"gender-label","gender-label",1531834426).cljs$core$IFn$_invoke$arity$1(tri_survey2.core.texts),new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"gender","gender",-733930727),new cljs.core.Keyword(null,"options","options",99638489),new cljs.core.Keyword(null,"gender-options","gender-options",-126992436).cljs$core$IFn$_invoke$arity$1(tri_survey2.core.texts)], null)], null);
});
tri_survey2.core.validation_error_element = (function tri_survey2$core$validation_error_element(app_state){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"color","color",1011675173),"red"], null)], null),(cljs.core.truth_(new cljs.core.Keyword(null,"validation-error","validation-error",1040492454).cljs$core$IFn$_invoke$arity$1(app_state))?new cljs.core.Keyword(null,"validation-error","validation-error",1040492454).cljs$core$IFn$_invoke$arity$1(tri_survey2.core.texts):""
)], null);
});
tri_survey2.core.submit_button = (function tri_survey2$core$submit_button(app_state){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.btn.btn-primary","button.btn.btn-primary",510358192),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"fill","fill",883462889),"black"], null),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (e){
return tri_survey2.core.submit.call(null,app_state);
})], null),new cljs.core.Keyword(null,"send-label","send-label",-381931090).cljs$core$IFn$_invoke$arity$1(tri_survey2.core.texts)], null);
});
tri_survey2.core.thank_you_element = (function tri_survey2$core$thank_you_element(app_state){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"display","display",242065432),(cljs.core.truth_(new cljs.core.Keyword(null,"submitted","submitted",-131658962).cljs$core$IFn$_invoke$arity$1(app_state))?"block":"none"
)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),new cljs.core.Keyword(null,"thank-you","thank-you",-1096552758).cljs$core$IFn$_invoke$arity$1(tri_survey2.core.texts)], null)], null);
});
/**
 * Helper function to hide survey
 */
tri_survey2.core.quest_QMARK_ = (function tri_survey2$core$quest_QMARK_(app_state){
if(cljs.core.truth_(new cljs.core.Keyword(null,"submitted","submitted",-131658962).cljs$core$IFn$_invoke$arity$1(app_state))){
return "none";
} else {
return "block";

}
});
/**
 * Hide survey when submitted
 */
tri_survey2.core.show_questionnaire_QMARK_ = (function tri_survey2$core$show_questionnaire_QMARK_(app_state){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"display","display",242065432),tri_survey2.core.quest_QMARK_.call(null,app_state)], null)], null);
});
/**
 * Show template service name if no service defined as
 *   get element
 */
tri_survey2.core.show_service = (function tri_survey2$core$show_service(app_state){
var s = new cljs.core.Keyword(null,"service","service",-1963054559).cljs$core$IFn$_invoke$arity$1(app_state);
if((!((s == null)))){
return s;
} else {
return "Test Service";

}
});
tri_survey2.core.page = (function tri_survey2$core$page(){
var app_state = cljs.core.deref.call(null,tri_survey2.core.data);
var size = new cljs.core.Keyword(null,"tri-element-width","tri-element-width",-1578020988).cljs$core$IFn$_invoke$arity$1(app_state);
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.container","div.container",72419955),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h1.main-header","h1.main-header",363328302),new cljs.core.Keyword(null,"main-header","main-header",1880318390).cljs$core$IFn$_invoke$arity$1(tri_survey2.core.texts)], null),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.plain-form","div.plain-form",-960869612),tri_survey2.core.show_questionnaire_QMARK_.call(null,app_state),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"hr","hr",1377740067)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h4","h4",2004862993),new cljs.core.Keyword(null,"service","service",-1963054559).cljs$core$IFn$_invoke$arity$1(tri_survey2.core.texts)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),tri_survey2.core.show_service.call(null,app_state)], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"br","br",934104792)], null),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [free_form.core.form,app_state,new cljs.core.Keyword(null,"-errors","-errors",1378571364).cljs$core$IFn$_invoke$arity$1(app_state),(function (keys,value){
return cljs.core.swap_BANG_.call(null,tri_survey2.core.data,(function (p1__29824_SHARP_){
return cljs.core.assoc_in.call(null,p1__29824_SHARP_,keys,value);
}));
}),new cljs.core.Keyword(null,"bootstrap-3","bootstrap-3",535840793),new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"form","form",-1624062471),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"noValidate","noValidate",1502261891),true], null),tri_survey2.core.micronarrative_element.call(null,new cljs.core.Keyword(null,"micronarrative1","micronarrative1",-395018425)),cljs.core.map.call(null,cljs.core.identity,tri_survey2.core.triad_element.call(null,app_state,size,new cljs.core.Keyword(null,"analyze1","analyze1",-1303462976),new cljs.core.Keyword(null,"position1","position1",9593367),new cljs.core.Keyword(null,"triad-values1","triad-values1",-967686863),new cljs.core.Keyword(null,"triad1","triad1",525779005))),tri_survey2.core.other_feedback_element.call(null),tri_survey2.core.contact_element.call(null),tri_survey2.core.validation_error_element.call(null,app_state),tri_survey2.core.submit_button.call(null,app_state)], null)], null)], null),tri_survey2.core.thank_you_element.call(null,app_state),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"hr","hr",1377740067)], null),null,window.addEventListener("resize",tri_survey2.core.window_resize_handler)], null);
});
tri_survey2.core.home_page = (function tri_survey2$core$home_page(){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),"Welcome to Reagent"], null)], null);
});
tri_survey2.core.mount_root = (function tri_survey2$core$mount_root(){
return reagent.dom.render.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [tri_survey2.core.page], null),document.getElementById("app"));
});
tri_survey2.core.init_BANG_ = (function tri_survey2$core$init_BANG_(){
return tri_survey2.core.mount_root.call(null);
});

//# sourceMappingURL=core.js.map?rel=1587042624343
