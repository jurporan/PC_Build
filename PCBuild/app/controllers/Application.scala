package controllers

import models._
import play.api.db.slick._
import play.api.db.slick.Config.driver.simple._
import play.api.data._
import play.api.data.Forms._
import play.api.mvc._
import play.api.Play.current
import play.api.mvc.BodyParsers._
import play.api.libs.json.Json
import play.api.libs.json.Json._
import views.html.index

object Application extends Controller {

  val motherboards = TableQuery[MotherboardTable]
  val processors = TableQuery[ProcessorTable]

  implicit val motherboardFormat = Json.format[Motherboard]

  def root = DBAction { implicit rs =>
    Ok(index(motherboards.list, processors.list))
  }

  def getMotherboards(socket: String) = DBAction { implicit rs =>
    val json = Json.toJson(motherboards.filter(_.socket === socket).list);
    Ok(json)
  }
}
