
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
object test extends BaseScalaTemplate[play.twirl.api.HtmlFormat.Appendable,Format[play.twirl.api.HtmlFormat.Appendable]](play.twirl.api.HtmlFormat) with play.twirl.api.Template0[play.twirl.api.HtmlFormat.Appendable] {

  /**/
  def apply/*1.2*/():play.twirl.api.HtmlFormat.Appendable = {
      _display_ {

Seq[Any](format.raw/*1.4*/("""

"""),_display_(/*3.2*/main("tersr")/*3.15*/ {_display_(Seq[Any](format.raw/*3.17*/("""
    """),format.raw/*4.5*/("""<h1>Salut</h1>
""")))}))}
  }

  def render(): play.twirl.api.HtmlFormat.Appendable = apply()

  def f:(() => play.twirl.api.HtmlFormat.Appendable) = () => apply()

  def ref: this.type = this

}
              /*
                  -- GENERATED --
                  DATE: Tue May 24 17:24:22 CEST 2016
                  SOURCE: C:/Users/jermo/Documents/PC_Build/PC_Build/app/views/test.scala.html
                  HASH: 0f7cd99d4bf3e91e5fc7bc704473dca3b5715d78
                  MATRIX: 497->1|586->3|616->8|637->21|676->23|708->29
                  LINES: 19->1|22->1|24->3|24->3|24->3|25->4
                  -- GENERATED --
              */
          