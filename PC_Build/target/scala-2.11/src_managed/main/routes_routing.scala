// @SOURCE:C:/PlayTest/play-slick-quickstart/conf/routes
// @HASH:f002e5edd9e98e1aa8c1b7ff273a2e0f316d546a
// @DATE:Wed May 18 11:44:00 CEST 2016


import play.core._
import play.core.Router._
import play.core.Router.HandlerInvokerFactory._
import play.core.j._

import play.api.mvc._
import _root_.controllers.Assets.Asset

import Router.queryString

object Routes extends Router.Routes {

import ReverseRouteContext.empty

private var _prefix = "/"

def setPrefix(prefix: String) {
  _prefix = prefix
  List[(String,Routes)]().foreach {
    case (p, router) => router.setPrefix(prefix + (if(prefix.endsWith("/")) "" else "/") + p)
  }
}

def prefix = _prefix

lazy val defaultPrefix = { if(Routes.prefix.endsWith("/")) "" else "/" }


// @LINE:6
private[this] lazy val controllers_Application_index0_route = Route("GET", PathPattern(List(StaticPart(Routes.prefix))))
private[this] lazy val controllers_Application_index0_invoker = createInvoker(
controllers.Application.index,
HandlerDef(this.getClass.getClassLoader, "", "controllers.Application", "index", Nil,"GET", """ Home page""", Routes.prefix + """"""))
        

// @LINE:9
private[this] lazy val controllers_Application_insert1_route = Route("POST", PathPattern(List(StaticPart(Routes.prefix),StaticPart(Routes.defaultPrefix),StaticPart("insert"))))
private[this] lazy val controllers_Application_insert1_invoker = createInvoker(
controllers.Application.insert,
HandlerDef(this.getClass.getClassLoader, "", "controllers.Application", "insert", Nil,"POST", """ Home page""", Routes.prefix + """insert"""))
        

// @LINE:11
private[this] lazy val controllers_Application_jsonFindAll2_route = Route("GET", PathPattern(List(StaticPart(Routes.prefix),StaticPart(Routes.defaultPrefix),StaticPart("json/all"))))
private[this] lazy val controllers_Application_jsonFindAll2_invoker = createInvoker(
controllers.Application.jsonFindAll,
HandlerDef(this.getClass.getClassLoader, "", "controllers.Application", "jsonFindAll", Nil,"GET", """""", Routes.prefix + """json/all"""))
        

// @LINE:14
private[this] lazy val controllers_Application_jsonInsert3_route = Route("POST", PathPattern(List(StaticPart(Routes.prefix),StaticPart(Routes.defaultPrefix),StaticPart("json/insert"))))
private[this] lazy val controllers_Application_jsonInsert3_invoker = createInvoker(
controllers.Application.jsonInsert,
HandlerDef(this.getClass.getClassLoader, "", "controllers.Application", "jsonInsert", Nil,"POST", """ Home page""", Routes.prefix + """json/insert"""))
        

// @LINE:17
private[this] lazy val controllers_Assets_at4_route = Route("GET", PathPattern(List(StaticPart(Routes.prefix),StaticPart(Routes.defaultPrefix),StaticPart("assets/"),DynamicPart("file", """.+""",false))))
private[this] lazy val controllers_Assets_at4_invoker = createInvoker(
controllers.Assets.at(fakeValue[String], fakeValue[String]),
HandlerDef(this.getClass.getClassLoader, "", "controllers.Assets", "at", Seq(classOf[String], classOf[String]),"GET", """ Map static resources from the /public folder to the /assets URL path""", Routes.prefix + """assets/$file<.+>"""))
        
def documentation = List(("""GET""", prefix,"""controllers.Application.index"""),("""POST""", prefix + (if(prefix.endsWith("/")) "" else "/") + """insert""","""controllers.Application.insert"""),("""GET""", prefix + (if(prefix.endsWith("/")) "" else "/") + """json/all""","""controllers.Application.jsonFindAll"""),("""POST""", prefix + (if(prefix.endsWith("/")) "" else "/") + """json/insert""","""controllers.Application.jsonInsert"""),("""GET""", prefix + (if(prefix.endsWith("/")) "" else "/") + """assets/$file<.+>""","""controllers.Assets.at(path:String = "/public", file:String)""")).foldLeft(List.empty[(String,String,String)]) { (s,e) => e.asInstanceOf[Any] match {
  case r @ (_,_,_) => s :+ r.asInstanceOf[(String,String,String)]
  case l => s ++ l.asInstanceOf[List[(String,String,String)]]
}}
      

def routes:PartialFunction[RequestHeader,Handler] = {

// @LINE:6
case controllers_Application_index0_route(params) => {
   call { 
        controllers_Application_index0_invoker.call(controllers.Application.index)
   }
}
        

// @LINE:9
case controllers_Application_insert1_route(params) => {
   call { 
        controllers_Application_insert1_invoker.call(controllers.Application.insert)
   }
}
        

// @LINE:11
case controllers_Application_jsonFindAll2_route(params) => {
   call { 
        controllers_Application_jsonFindAll2_invoker.call(controllers.Application.jsonFindAll)
   }
}
        

// @LINE:14
case controllers_Application_jsonInsert3_route(params) => {
   call { 
        controllers_Application_jsonInsert3_invoker.call(controllers.Application.jsonInsert)
   }
}
        

// @LINE:17
case controllers_Assets_at4_route(params) => {
   call(Param[String]("path", Right("/public")), params.fromPath[String]("file", None)) { (path, file) =>
        controllers_Assets_at4_invoker.call(controllers.Assets.at(path, file))
   }
}
        
}

}
     