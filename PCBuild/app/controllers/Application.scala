package controllers

import models._
import play.api.mvc.{Action, Controller}
import views.html._

object Application extends Controller{
  def root = Action {
    Ok(index.render)
  }
}
