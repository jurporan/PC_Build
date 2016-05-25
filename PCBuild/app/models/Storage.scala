package models

import play.api.db.slick.Config.driver.simple._

case class Storage(
                    id: Int,
                    manufacturer: String,
                    model: String,
                    gigabytes: Int,
                    rotationSpeed: Int,
                    imageUrl: String,
                    price: Float,
                    popularity: Int
                  )

class StorageTable(tag: Tag) extends Table[Storage](tag, "STORAGE") {

  def id = column[Int]("ID", O.PrimaryKey, O.AutoInc)
  def manufacturer = column[String]("MANUFACTURER", O.NotNull)
  def model = column[String]("MODEL", O.NotNull)
  def gigabytes = column[Int]("GIGABYTES", O.NotNull)
  def rotationSpeed = column[Int]("ROTATION_SPEED", O.NotNull)
  def imageUrl = column[String]("IMG_URL", O.NotNull)
  def price = column[Float]("PRICE", O.NotNull)

  def popularity = column[Int]("POPULARITY", O.NotNull)

  def * = (id, manufacturer, model, gigabytes, rotationSpeed, imageUrl, price, popularity) <> (Storage.tupled, Storage.unapply)
}
