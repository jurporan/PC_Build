
package views.html

import play.twirl.api._
import play.twirl.api.TemplateMagic._

import play.api.templates.PlayMagic._
import models._
import controllers._
import play.api.i18n._
import play.api.mvc._
import play.api.data._
import views.html._

/**/
object index extends BaseScalaTemplate[play.twirl.api.HtmlFormat.Appendable,Format[play.twirl.api.HtmlFormat.Appendable]](play.twirl.api.HtmlFormat) with play.twirl.api.Template1[List[Cat],play.twirl.api.HtmlFormat.Appendable] {

  /**/
  def apply/*1.2*/(cats: List[Cat]):play.twirl.api.HtmlFormat.Appendable = {
      _display_ {

Seq[Any](format.raw/*1.19*/("""

"""),_display_(/*3.2*/main("Cat database")/*3.22*/ {_display_(Seq[Any](format.raw/*3.24*/("""
  """),format.raw/*4.3*/("""<h2>Insert a kitty cat here:</h2>

  <form action="/insert" method="POST">
    <input name="name" type="text" placeholder="name your feline friend"/>
    <input name="color" type="text" placeholder="enter the color of this kitty cat"/>
    <input type="submit"/>
  </form>

  <h2>Previously inserted cats:</h2>
  <table>
    <tr><th>Name</th><th>Color</th></tr>
    """),_display_(/*15.6*/for(c <- cats) yield /*15.20*/{_display_(Seq[Any](format.raw/*15.21*/(""" 
    """),format.raw/*16.5*/("""<tr><td>"""),_display_(/*16.14*/c/*16.15*/.name),format.raw/*16.20*/("""</td><td>"""),_display_(/*16.30*/c/*16.31*/.color),format.raw/*16.37*/("""</td></tr>
    """)))}),format.raw/*17.6*/("""
  """),format.raw/*18.3*/("""</table>


    
""")))}),format.raw/*22.2*/("""
"""))}
  }

  def render(cats:List[Cat]): play.twirl.api.HtmlFormat.Appendable = apply(cats)

  def f:((List[Cat]) => play.twirl.api.HtmlFormat.Appendable) = (cats) => apply(cats)

  def ref: this.type = this

}
              /*
                  -- GENERATED --
                  DATE: Wed May 18 11:44:00 CEST 2016
                  SOURCE: C:/PlayTest/play-slick-quickstart/app/views/index.scala.html
                  HASH: 19479475f333f375b35d342eb49493610a47263e
                  MATRIX: 508->1|613->18|641->21|669->41|708->43|737->46|1130->413|1160->427|1199->428|1232->434|1268->443|1278->444|1304->449|1341->459|1351->460|1378->466|1424->482|1454->485|1501->502
                  LINES: 19->1|22->1|24->3|24->3|24->3|25->4|36->15|36->15|36->15|37->16|37->16|37->16|37->16|37->16|37->16|37->16|38->17|39->18|43->22
                  -- GENERATED --
              */
          