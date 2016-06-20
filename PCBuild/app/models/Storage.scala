package models

import play.api.db.slick.Config.driver.simple._

case class Storage(
                    id: Int,
                    imageUrl: String,
                    manufacturer: String,
                    model: String,
                    gigabytes: Int,
                    rotationSpeed: Int,
                    popularity: Int,
                    price: Float
                  )

class StorageTable(tag: Tag) extends Table[Storage](tag, "STORAGE") {

  def id = column[Int]("ID", O.PrimaryKey, O.AutoInc)
  def manufacturer = column[String]("MANUFACTURER", O.NotNull)
  def model = column[String]("MODEL", O.NotNull)
  def gigabytes = column[Int]("GIGABYTES", O.NotNull)
  def rotationSpeed = column[Int]("ROTATION_SPEED", O.NotNull)
  def imageUrl = column[String]("IMAGE_URL", O.NotNull)
  def price = column[Float]("PRICE", O.NotNull)

  def popularity = column[Int]("POPULARITY", O.NotNull)

  def * = (id, imageUrl, manufacturer, model, gigabytes, rotationSpeed, popularity, price) <> (Storage.tupled, Storage.unapply)
}
