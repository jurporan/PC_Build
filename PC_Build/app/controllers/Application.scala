package controllers

import models._
import play.api.mvc.Controller
import views.html._

object Application extends Controller {

  def index = Ok(test())
}
